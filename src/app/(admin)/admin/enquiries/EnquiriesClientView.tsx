'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { markEnquiriesRead } from '@/features/enquiries/actions';
import { cn } from '@/lib/utils';

const FILTER_TABS = ['ALL', 'UNREAD', 'READ', 'RESPONDED', 'ARCHIVED'] as const;

const STATUS_STYLES: Record<string, string> = {
  UNREAD: 'bg-red-100 text-red-800',
  READ: 'bg-blue-100 text-blue-800',
  RESPONDED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-gray-100 text-gray-600',
};

export function EnquiriesClientView({ enquiries, activeFilter }: { enquiries: any[]; activeFilter: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === enquiries.length) {
      setSelected([]);
    } else {
      setSelected(enquiries.map(e => e.id));
    }
  };

  const handleBulkRead = () => {
    startTransition(async () => {
      await markEnquiriesRead(selected);
      setSelected([]);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-1 bg-white border border-border overflow-hidden">
          {FILTER_TABS.map(tab => (
            <Link
              key={tab}
              href={`/admin/enquiries${tab === 'ALL' ? '' : `?filter=${tab}`}`}
              className={cn(
                "px-5 py-2.5 font-sans text-xs uppercase tracking-widest transition-colors",
                activeFilter === tab
                  ? "bg-black text-white"
                  : "text-muted hover:bg-cream"
              )}
            >
              {tab}
            </Link>
          ))}
        </div>

        {selected.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkRead}
            disabled={isPending}
            className="text-xs"
          >
            {isPending ? 'Updating...' : `Mark ${selected.length} as Read`}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-cream text-muted text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-normal w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === enquiries.length && enquiries.length > 0}
                    onChange={toggleAll}
                    className="accent-black"
                  />
                </th>
                <th className="px-6 py-4 font-normal">Name</th>
                <th className="px-6 py-4 font-normal">Email</th>
                <th className="px-6 py-4 font-normal">Type</th>
                <th className="px-6 py-4 font-normal">Product</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enquiries.map(enq => (
                <tr
                  key={enq.id}
                  className={cn(
                    "hover:bg-cream/50 transition-colors cursor-pointer",
                    enq.status === 'UNREAD' && "font-medium bg-red-50/30"
                  )}
                >
                  <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.includes(enq.id)}
                      onChange={() => toggleSelect(enq.id)}
                      className="accent-black"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/enquiries/${enq.id}`} className="hover:underline">
                      {enq.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-muted">{enq.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase tracking-wider bg-cream px-2 py-1">
                      {enq.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted text-xs">
                    {enq.productName || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1", STATUS_STYLES[enq.status] || 'bg-gray-100')}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted text-xs whitespace-nowrap">
                    {new Date(enq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-muted">
                    No enquiries found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
