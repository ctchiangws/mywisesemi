
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileSpreadsheet, FileImage, FilePlus, HelpCircle, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { documentsApi } from '@/services/api';
import { Document } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const getIcon = (type: string) => {
  switch (type) {
    case 'spreadsheet':
      return <FileSpreadsheet className="h-4 w-4 mr-2 text-green-500" />;
    case 'image':
      return <FileImage className="h-4 w-4 mr-2 text-blue-500" />;
    case 'faq':
      return <HelpCircle className="h-4 w-4 mr-2 text-purple-500" />;
    case 'guide':
      return <UserPlus className="h-4 w-4 mr-2 text-teal-500" />;
    default:
      return <FileText className="h-4 w-4 mr-2 text-wisesemi" />;
  }
};

const SharedDocuments = () => {
  const { t } = useLanguage();
  
  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: documentsApi.getAll
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark">
          {t('home.shared_documents')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <button className="w-full flex items-center justify-center p-2 bg-wisesemi text-white rounded-md hover:bg-wisesemi-dark transition-colors">
            <FilePlus className="h-4 w-4 mr-2" />
            <span>Upload New Document</span>
          </button>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-wisesemi-dark mb-2">Shared Documents</h3>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {documents.map((document: Document) => (
                <li key={document.id}>
                  <Link
                    to={document.path}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
                  >
                    {getIcon(document.type)}
                    <span className="text-gray-700 group-hover:text-wisesemi-dark">
                      {document.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedDocuments;
