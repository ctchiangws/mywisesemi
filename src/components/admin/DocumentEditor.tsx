
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentEditorProps {
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

const DocumentEditor = ({
  selectedCategory,
  selectedDocument,
  documentContent,
  documentCategories,
  handleCategoryChange,
  handleDocumentChange,
  setDocumentContent
}: DocumentEditorProps) => {
  const { toast } = useToast();
  
  const filteredDocuments = documentCategories.find(
    (category) => category.name === selectedCategory
  )?.documents || [];

  const handleSaveDocument = () => {
    toast({
      title: "Document saved",
      description: `${selectedDocument} has been successfully updated`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Edit Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {documentCategories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Document</Label>
              <Select 
                value={selectedDocument} 
                onValueChange={handleDocumentChange}
                disabled={!selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDocuments.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Markdown Content</Label>
            <Textarea 
              className="min-h-[400px] font-mono"
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              disabled={!selectedDocument}
              placeholder="Enter markdown content here..."
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSaveDocument} 
              disabled={!selectedDocument}
              className="bg-wisesemi hover:bg-wisesemi-dark"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentEditor;
