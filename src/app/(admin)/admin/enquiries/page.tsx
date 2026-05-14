import React from 'react';
import { getEnquiries } from '@/features/enquiries/queries';
import { EnquiriesClientView } from './EnquiriesClientView';

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const validFilters = ['ALL', 'UNREAD', 'READ', 'RESPONDED', 'ARCHIVED'] as const;
  const activeFilter = validFilters.includes(filter as any) ? (filter as any) : 'ALL';

  const enquiries = await getEnquiries(activeFilter);

  return <EnquiriesClientView enquiries={enquiries} activeFilter={activeFilter} />;
}
