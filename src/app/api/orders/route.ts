import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderEmails } from '@/lib/email';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ── Validate payload ──────────────────────────────
    if (!body?.contact || !body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { contact, items, totalPrice } = body;
    const { name, email, phone, address, notes } = contact;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // ── Generate friendly order ID ────────────────────
    const externalId = `YG-${nanoid(8).toUpperCase()}`;

    // ── Persist order + items in a transaction ────────
    const order = await prisma.order.create({
      data: {
        externalId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        notes: notes?.trim() || null,
        totalCents: totalPrice || 0,
        items: {
          create: items.map((it: { productId: string; name: string; price: number; qty: number }) => ({
            productId: it.productId || null,
            name: it.name,
            price: (it.price / 100), // convert cents back to decimal for DB
            qty: it.qty,
          })),
        },
      },
      include: { items: true },
    });

    // ── Send confirmation emails ──────────────────────
    try {
      await sendOrderEmails({
        orderId: externalId,
        name: order.name,
        email: order.email,
        phone: order.phone || undefined,
        address: order.address || undefined,
        notes: order.notes || undefined,
        items: items.map((it: { name: string; price: number; qty: number }) => ({
          name: it.name,
          price: it.price,
          qty: it.qty,
        })),
        totalCents: order.totalCents,
      });

      // Mark email as sent
      await prisma.order.update({
        where: { id: order.id },
        data: { emailSent: true },
      });
    } catch (emailErr) {
      // Don't fail the order if email fails — log and continue
      console.error('Failed to send order emails:', emailErr);
    }

    return NextResponse.json({ orderId: externalId }, { status: 201 });
  } catch (e) {
    console.error('Order endpoint error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
