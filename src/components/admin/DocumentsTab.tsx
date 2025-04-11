
import React from 'react';
import DocumentNavigation from './DocumentNavigation';
import DocumentEditor from './DocumentEditor';

interface DocumentsTabProps {
  selectedCategory: string;
  selectedDocument: string;
  documentContent: string;
  documentCategories: Array<{
    name: string;
    documents: Array<{
      id: string;
      name: string;
    }>;
  }>;
  handleCategoryChange: (value: string) => void;
  handleDocumentChange: (value: string) => void;
  setDocumentContent: (value: string) => void;
}

const DocumentsTab = ({
  selectedCategory,
  selectedDocument,
  documentContent,
  documentCategories,
  handleCategoryChange,
  handleDocumentChange,
  setDocumentContent
}: DocumentsTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <DocumentNavigation 
          documentCategories={documentCategories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          handleDocumentChange={handleDocumentChange}
        />
      </div>
      
      <div className="lg:col-span-3">
        <DocumentEditor 
          selectedCategory={selectedCategory}
          selectedDocument={selectedDocument}
          documentContent={documentContent}
          documentCategories={documentCategories}
          handleCategoryChange={handleCategoryChange}
          handleDocumentChange={handleDocumentChange}
          setDocumentContent={setDocumentContent}
        />
      </div>
    </div>
  );
}

export default DocumentsTab;
