
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ISODocuments = () => {
  const { t, language } = useLanguage();
  
  const isoDocuments = [
    {
      id: 1,
      name: language === 'zh' ? 'ISO 9001 品質手冊' : 'ISO 9001 Quality Manual',
      path: '/projects/iso/quality-manual',
      isExternal: false
    },
    {
      id: 2,
      name: language === 'zh' ? 'ISO 9001 文件' : 'ISO 9001 Documentation',
      path: 'http://mywisesemi.qa.wisesemi.com',
      isExternal: true
    },
    {
      id: 3,
      name: language === 'zh' ? '稽核程序' : 'Audit Procedures',
      path: '/projects/iso/audit-procedures',
      isExternal: false
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-wisesemi" />
          {t('home.iso')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {isoDocuments.map((doc) => (
            <li key={doc.id}>
              {doc.isExternal ? (
                <a
                  href={doc.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                >
                  <FileText className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                  <span className="text-gray-700 group-hover:text-wisesemi-dark">
                    {doc.name}
                  </span>
                </a>
              ) : (
                <Link
                  to={doc.path}
                  className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                >
                  <FileText className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                  <span className="text-gray-700 group-hover:text-wisesemi-dark">
                    {doc.name}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ISODocuments;
