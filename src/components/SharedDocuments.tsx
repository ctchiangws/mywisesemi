
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileSpreadsheet, FileImage, FilePlus, Utensils, FileBox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const documents = [
  { id: 1, name: 'Q1 Financial Report', type: 'spreadsheet', path: '/documents/financial-report' },
  { id: 2, name: 'Brand Guidelines 2025', type: 'document', path: '/documents/brand-guidelines' },
  { id: 3, name: 'Employee Handbook', type: 'document', path: '/documents/employee-handbook' },
  { id: 4, name: 'Product Roadmap', type: 'document', path: '/documents/product-roadmap' },
  { id: 5, name: 'Marketing Assets', type: 'image', path: '/documents/marketing-assets' },
  { id: 6, name: 'Project Proposal Template', type: 'document', path: '/documents/project-template' },
];

const dailyTools = [
  { id: 1, name: 'Lunch Box Selection', type: 'lunch', path: '/tools/lunch-box' },
  { id: 2, name: 'Personal Leave Management', type: 'leave', path: '/tools/leave-management' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'spreadsheet':
      return <FileSpreadsheet className="h-4 w-4 mr-2 text-green-500" />;
    case 'image':
      return <FileImage className="h-4 w-4 mr-2 text-blue-500" />;
    case 'lunch':
      return <Utensils className="h-4 w-4 mr-2 text-orange-500" />;
    case 'leave':
      return <FileBox className="h-4 w-4 mr-2 text-wisesemi" />;
    default:
      return <FileText className="h-4 w-4 mr-2 text-wisesemi" />;
  }
};

const SharedDocuments = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark">Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <button className="w-full flex items-center justify-center p-2 bg-wisesemi text-white rounded-md hover:bg-wisesemi-dark transition-colors">
            <FilePlus className="h-4 w-4 mr-2" />
            <span>Upload New Document</span>
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-wisesemi-dark mb-2">Daily Tools</h3>
          <ul className="space-y-2 mb-4">
            {dailyTools.map((tool) => (
              <li key={tool.id}>
                <Link
                  to={tool.path}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
                >
                  {getIcon(tool.type)}
                  <span className="text-gray-700 group-hover:text-wisesemi-dark">
                    {tool.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-wisesemi-dark mb-2">Shared Documents</h3>
          <ul className="space-y-2">
            {documents.map((document) => (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedDocuments;
