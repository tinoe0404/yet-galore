import React from 'react';
import { Navbar } from '@/components/public/navigation/Navbar';
import { FooterWrapper } from '@/components/public/footer/FooterWrapper';
import { AnimatedLayout } from '@/components/public/common/AnimatedLayout';
import { WhatsAppWidget } from '@/components/public/common/WhatsAppWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col min-h-screen">
        <AnimatedLayout>
          {children}
        </AnimatedLayout>
      </main>
      <WhatsAppWidget />
      <FooterWrapper />
    </>
  );
}
