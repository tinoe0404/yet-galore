import { auth } from '@/features/auth/config';
import { AdminClientLayout } from './AdminClientLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Sidebar } from '@/components/admin/Sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  return (
    <AdminClientLayout 
      sidebar={<Sidebar session={session} />} 
      header={<AdminHeader session={session} />}
    >
      {children}
    </AdminClientLayout>
  );
}
