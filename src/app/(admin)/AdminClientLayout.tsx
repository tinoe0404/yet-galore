'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function AdminClientLayout({ 
  children, 
  sidebar, 
  header 
}: { 
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) return <>{children}</>;

  return (
    <div className="flex h-screen bg-[#F8F6F4] overflow-hidden">
      {sidebar}
      <div className="flex-1 flex flex-col min-w-0">
        {header}
        <main className="flex-1 overflow-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
