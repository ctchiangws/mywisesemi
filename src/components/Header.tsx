
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-wisesemi-dark to-wisesemi w-full py-4 px-6 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/1e3c6d26-e204-4ded-b1b2-e4d24e6e00f0.png" 
            alt="WiseSemi Logo" 
            className="h-10 mr-3" 
          />
          <h1 className="text-white text-2xl font-bold">{t('intranet')}</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <Link 
            to="/admin" 
            className="text-white hover:text-wisesemi-light transition-colors"
            title={t('admin')}
          >
            <Settings className="h-6 w-6" />
          </Link>
          <div className="relative">
            <Bell className="h-6 w-6 text-white cursor-pointer hover:text-wisesemi-light transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <span className="text-white hidden md:inline">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
