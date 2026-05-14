'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { EnquiryModal } from './EnquiryModal';

export function ClientEnquiryTrigger({ product }: { product: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" className="w-full py-6 text-sm" onClick={() => setIsOpen(true)}>
        Enquire About This Piece
      </Button>
      <EnquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={product} />
    </>
  );
}
