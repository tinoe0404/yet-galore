import React from 'react';
import { notFound } from 'next/navigation';
import { getEnquiryById } from '@/features/enquiries/queries';
import { EnquiryDetailClient } from './EnquiryDetailClient';

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const enquiry = await getEnquiryById(id);

  if (!enquiry) notFound();

  return <EnquiryDetailClient enquiry={enquiry} />;
}
