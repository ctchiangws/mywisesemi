
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-wisesemi-dark text-white p-4 text-center text-sm">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}

export default AdminLayout;
