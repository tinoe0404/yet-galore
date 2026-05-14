import React from 'react';
import { prisma } from '@/lib/prisma';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  // Fetch active categories to pass to the client navbar
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    select: { name: true, slug: true }
  });

  return <NavbarClient categories={categories} />;
}
