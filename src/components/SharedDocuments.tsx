
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileSpreadsheet, FileImage, HelpCircle, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { documentsApi } from '@/services/api';
import { Document } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import NewBadge from '@/components/ui/new-badge';
import { useNewContent, useNewContentCount } from '@/hooks/useNewContent';
import { Button } from '@/components/ui/button';
import { lastSeenService } from '@/services/lastSeenService';
import { useConfiguration } from '@/contexts/ConfigurationContext';

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

const isExternalLink = (path: string) => {
  return path.startsWith('http://') || path.startsWith('https://');
};

const DocumentItem = ({ document }: { document: Document }) => {
  const { isNew, markAsSeen } = useNewContent(`document-${document.id}`, 'documents');
  
  const handleClick = () => {
    markAsSeen();
  };

  return (
    <li key={document.id}>
      {isExternalLink(document.path) ? (
        <a
          href={document.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
          onClick={handleClick}
        >
          {getIcon(document.type)}
          <span className="text-gray-700 group-hover:text-wisesemi-dark flex-grow">
            {document.name}
          </span>
          <NewBadge show={isNew} size="sm" />
        </a>
      ) : (
        <Link
          to={document.path}
          className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
          onClick={handleClick}
        >
          {getIcon(document.type)}
          <span className="text-gray-700 group-hover:text-wisesemi-dark flex-grow">
            {document.name}
          </span>
          <NewBadge show={isNew} size="sm" />
        </Link>
      )}
    </li>
  );
};

const SharedDocuments = () => {
  const { t } = useLanguage();
  const { config } = useConfiguration();
  
  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: documentsApi.getAll
  });

  const documentIds = documents.map((d: Document) => `document-${d.id}`);
  const newCount = useNewContentCount(documentIds, 'documents');

  const markAllAsSeen = () => {
    documents.forEach((document: Document) => {
      lastSeenService.markAsSeen(`document-${document.id}`, 'documents');
    });
    window.location.reload();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
            {t('home.shared_documents')}
            {config.showCounters && newCount > 0 && (
              <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                {newCount} new
              </span>
            )}
          </CardTitle>
          {newCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsSeen}>
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {documents.map((document: Document) => (
              <DocumentItem key={document.id} document={document} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default SharedDocuments;
