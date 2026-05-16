import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'no-reply@yetgalore.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yetgalore.com';

interface OrderEmailData {
  orderId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  items: Array<{
    name: string;
    price: number; // cents
    qty: number;
  }>;
  totalCents: number;
}

function formatCents(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function buildItemsTable(items: OrderEmailData['items']) {
  return items
    .map(
      (it) =>
        `<tr>
          <td style="padding:10px 16px;border-bottom:1px solid #E0D9D3;font-family:Helvetica,sans-serif;font-size:14px;color:#1E1A17">${it.name}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #E0D9D3;font-family:Helvetica,sans-serif;font-size:14px;color:#1E1A17;text-align:center">${it.qty}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #E0D9D3;font-family:Helvetica,sans-serif;font-size:14px;color:#1E1A17;text-align:right">${formatCents(it.price * it.qty)}</td>
        </tr>`
    )
    .join('');
}

function orderEmailHtml(data: OrderEmailData) {
  return `
  <div style="background-color:#FAFAFA;padding:40px 0;font-family:Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E0D9D3">
      <div style="padding:32px;text-align:center;border-bottom:1px solid #E0D9D3">
        <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:400;margin:0;color:#0A0A0A">Yet Galore</h1>
      </div>
      <div style="padding:32px">
        <p style="font-family:Georgia,serif;font-size:22px;font-weight:400;margin:0 0 8px;color:#0A0A0A">Order Confirmation</p>
        <p style="font-size:13px;color:#8C837A;margin:0 0 24px;letter-spacing:0.05em">${data.orderId}</p>

        <p style="font-size:14px;line-height:1.6;color:#1E1A17;margin:0 0 24px">
          Hi ${data.name}, thank you for your order. We've received your request and will be in touch shortly with payment details and delivery arrangements.
        </p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <thead>
            <tr style="border-bottom:2px solid #0A0A0A">
              <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C837A">Item</th>
              <th style="padding:10px 16px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C837A">Qty</th>
              <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C837A">Total</th>
            </tr>
          </thead>
          <tbody>
            ${buildItemsTable(data.items)}
          </tbody>
        </table>

        <div style="text-align:right;padding:16px;background:#F5F0EA">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C837A">Order Total</span>
          <p style="font-family:Georgia,serif;font-size:24px;margin:4px 0 0;color:#0A0A0A">${formatCents(data.totalCents)}</p>
        </div>

        ${data.address ? `
        <div style="margin-top:24px">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C837A;margin:0 0 6px">Shipping Address</p>
          <p style="font-size:14px;color:#1E1A17;margin:0;white-space:pre-line">${data.address}</p>
        </div>
        ` : ''}

        ${data.notes ? `
        <div style="margin-top:24px">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C837A;margin:0 0 6px">Notes</p>
          <p style="font-size:14px;color:#1E1A17;margin:0">${data.notes}</p>
        </div>
        ` : ''}
      </div>
      <div style="padding:24px 32px;border-top:1px solid #E0D9D3;text-align:center">
        <p style="font-size:12px;color:#8C837A;margin:0">Questions? Reply to this email or reach out via WhatsApp.</p>
      </div>
    </div>
  </div>`;
}

/**
 * Send order confirmation emails to customer and admin.
 */
export async function sendOrderEmails(data: OrderEmailData) {
  const html = orderEmailHtml(data);

  // Send to customer
  const customerResult = await transporter.sendMail({
    from: FROM_EMAIL,
    to: data.email,
    subject: `Order Confirmed — ${data.orderId} | Yet Galore`,
    html,
  });

  // Send to admin
  const adminHtml = orderEmailHtml(data).replace(
    'Hi ' + data.name + ', thank you for your order.',
    `New order from <strong>${data.name}</strong> (${data.email}${data.phone ? ', ' + data.phone : ''}).`
  );

  const adminResult = await transporter.sendMail({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Order — ${data.orderId} from ${data.name}`,
    html: adminHtml,
  });

  return { customerResult, adminResult };
}
