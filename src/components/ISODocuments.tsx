
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { isoDocumentsApi } from '@/services/api';
import { ISODocument } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const ISODocuments = () => {
  const { t } = useLanguage();
  
  const { data: isoDocuments = [], isLoading } = useQuery({
    queryKey: ['isoDocuments'],
    queryFn: isoDocumentsApi.getAll,
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-wisesemi" />
          {t('home.iso')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse h-16 bg-gray-200 rounded-md"></div>
        ) : (
          <ul className="space-y-1">
            {isoDocuments.map((doc: ISODocument) => (
              <li key={doc.id}>
                <Link
                  to={doc.path}
                  className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                >
                  <FileText className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                  <span className="text-gray-700 group-hover:text-wisesemi-dark">
                    {doc.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default ISODocuments;
