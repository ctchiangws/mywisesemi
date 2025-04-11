
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-white hover:text-wisesemi-light transition-colors">
        <Globe className="h-5 w-5" />
        <span className="ml-1 hidden md:inline">{language === 'en' ? 'EN' : '中文'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <div className="flex items-center">
            <span className={`mr-2 ${language === 'en' ? 'font-bold' : ''}`}>English</span>
            {language === 'en' && <span>✓</span>}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('zh')}>
          <div className="flex items-center">
            <span className={`mr-2 ${language === 'zh' ? 'font-bold' : ''}`}>繁體中文</span>
            {language === 'zh' && <span>✓</span>}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
