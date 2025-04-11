
import React, { ReactNode } from 'react';
import Header from '@/components/Header';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-wisesemi-dark text-white p-4 text-center text-sm">
        <p>© 2025 WiseSemi Intranet. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminLayout;
