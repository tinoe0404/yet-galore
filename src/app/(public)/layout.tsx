import React from 'react';
import { Navbar } from '@/components/public/navigation/Navbar';
import { Footer } from '@/components/public/footer/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
