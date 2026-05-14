'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { updateEnquiryStatus } from '@/features/enquiries/actions';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

const STATUS_OPTIONS = ['UNREAD', 'READ', 'RESPONDED', 'ARCHIVED'] as const;

export function EnquiryDetailClient({ enquiry }: { enquiry: any }) {
  const router = useRouter();
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.adminNotes || '');
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      await updateEnquiryStatus(enquiry.id, status, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/admin/enquiries"
        className="inline-flex items-center gap-2 text-muted hover:text-black text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Enquiries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Enquiry Details */}
        <div className="lg:col-span-2 bg-white border border-border p-8 space-y-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-3xl">{enquiry.name}</h2>
              <p className="text-muted text-sm mt-1">
                Submitted {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-wider bg-cream px-3 py-1.5">
              {enquiry.type}
            </span>
          </div>

          <div className="w-full h-[1px] bg-border" />

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="font-sans text-xs uppercase tracking-widest text-muted">Email</label>
              <p className="text-sm">{enquiry.email}</p>
            </div>
            {enquiry.phone && (
              <div className="space-y-1">
                <label className="font-sans text-xs uppercase tracking-widest text-muted">Phone</label>
                <p className="text-sm">{enquiry.phone}</p>
              </div>
            )}
          </div>

          {/* Product Reference */}
          {enquiry.productName && (
            <div className="space-y-1">
              <label className="font-sans text-xs uppercase tracking-widest text-muted">Product Reference</label>
              <p className="text-sm font-medium">{enquiry.productName}</p>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-muted">Message</label>
            <div className="bg-cream p-6 text-sm leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={`mailto:${enquiry.email}?subject=Re: Your Enquiry — Yet Galore`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm hover:bg-cream transition-colors"
            >
              <Mail className="w-4 h-4" />
              Reply via Email
            </a>
            {enquiry.phone && (
              <a
                href={`https://wa.me/${enquiry.phone.replace(/\D/g, '')}?text=Hello ${enquiry.name}, regarding your enquiry at Yet Galore...`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm hover:bg-cream transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Right: Status Management */}
        <div className="bg-white border border-border p-8 space-y-8 h-fit">
          <h3 className="font-display text-xl">Manage</h3>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-muted">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-b border-black/20 focus:border-black focus:outline-none py-2.5 text-sm bg-transparent appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-xs uppercase tracking-widest text-muted">Admin Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Internal notes about this enquiry..."
              className="w-full border border-border focus:border-black focus:outline-none p-3 text-sm bg-transparent resize-none"
            />
          </div>

          <Button
            variant="primary"
            className="w-full py-3"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
