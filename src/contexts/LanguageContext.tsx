import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Add your translations here
const translations: Translations = {
  // Header translations
  'intranet': {
    'en': 'MyWiseSemi',
    'zh': 'mywisesemi',
  },
  'admin': {
    'en': 'Admin',
    'zh': '管理',
  },
  // Footer translations
  'footer.copyright': {
    'en': '© 2025 WiseSemi Intranet. All rights reserved.',
    'zh': '© 2025 智騰半導體內部網. 版權所有.',
  },
  // Home page section titles
  'home.departments': {
    'en': 'Departments',
    'zh': '部門列表',
  },
  'home.projects': {
    'en': 'Projects',
    'zh': '專案管理',
  },
  'home.announcements': {
    'en': 'Announcements',
    'zh': '公告',
  },
  'home.events': {
    'en': 'Events',
    'zh': '活動日曆',
  },
  'home.important_dates': {
    'en': 'Important Dates',
    'zh': '重要日期',
  },
  'home.shared_documents': {
    'en': 'Shared Documents',
    'zh': '共享文件',
  },
  'home.iso': {
    'en': 'ISO 9001:2015',
    'zh': 'ISO 9001:2015',
  },
  'home.daily_tools': {
    'en': 'Daily Tools',
    'zh': '日常工具',
  },
  'home.life_in_wisesemi': {
    'en': 'Life in Wisesemi',
    'zh': 'Wisesemi生活',
  },
  // Department translations
  'dept.ceo': {
    'en': 'CEO',
    'zh': '執行長',
  },
  'dept.ceo-office': {
    'en': 'CEO',
    'zh': '執行長',
  },
  'dept.rd1': {
    'en': 'Silicon Element Design',
    'zh': '矽元件設計部',
  },
  'dept.rd2': {
    'en': 'AI System Engineering',
    'zh': '人工智慧系統工程部',
  },
  'dept.sales': {
    'en': 'Sales',
    'zh': '業務部',
  },
  'dept.operations': {
    'en': 'Corporate Operation',
    'zh': '企業營運部',
  },
  'dept.design infrastructure': {
    'en': 'Design Infrastructure',
    'zh': '設計架構部',
  },
  // Add more translations as needed
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh');

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
