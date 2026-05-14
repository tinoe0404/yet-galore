'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { usePathname } from 'next/navigation';

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
