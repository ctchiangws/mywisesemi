
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface DocumentNavigationProps {
  documentCategories: Array<{
    name: string;
    documents: Array<{
      id: string;
      name: string;
    }>;
  }>;
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
  handleDocumentChange: (value: string) => void;
}

const DocumentNavigation = ({
  documentCategories,
  selectedCategory,
  handleCategoryChange,
  handleDocumentChange
}: DocumentNavigationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {documentCategories.map((category) => (
            <AccordionItem key={category.name} value={category.name}>
              <AccordionTrigger 
                className={`py-2 ${selectedCategory === category.name ? 'text-wisesemi font-medium' : ''}`}
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-2 space-y-1">
                  {category.documents.map((doc) => (
                    <Button
                      key={doc.id}
                      variant="ghost"
                      className="w-full justify-start h-auto py-1.5"
                      onClick={() => {
                        handleCategoryChange(category.name);
                        handleDocumentChange(doc.id);
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span className="text-sm">{doc.name}</span>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default DocumentNavigation;
