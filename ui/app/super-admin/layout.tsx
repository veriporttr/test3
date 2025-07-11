'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !user.isSuperAdmin)) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user?.isSuperAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-content main-content-with-sidebar">
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-red-800">Super Admin Modu</span>
          </div>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}