
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { FileText, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const documentCategories = [
  { 
    name: 'Departments',
    documents: [
      { id: 'ceo-office', name: 'CEO Office' },
      { id: 'rd1', name: 'RD1' },
      { id: 'rd2', name: 'RD2' },
      { id: 'sales', name: 'Sales' },
      { id: 'finance', name: 'Finance' },
      { id: 'hr', name: 'HR' },
    ]
  },
  {
    name: 'Projects',
    documents: [
      { id: 'project-x', name: 'Project_X' },
      { id: 'project-u', name: 'Project_U' },
      { id: 'project-t', name: 'Project_T' },
    ]
  },
  {
    name: 'ISO Documents',
    documents: [
      { id: 'quality-manual', name: 'ISO 9001 Quality Manual' },
      { id: 'process-docs', name: 'Process Documentation' },
      { id: 'audit-procedures', name: 'Audit Procedures' },
    ]
  },
  {
    name: 'Shared Documents',
    documents: [
      { id: 'financial-report', name: 'Q1 Financial Report' },
      { id: 'brand-guidelines', name: 'Brand Guidelines 2025' },
      { id: 'employee-handbook', name: 'Employee Handbook' },
      { id: 'product-roadmap', name: 'Product Roadmap' },
      { id: 'marketing-assets', name: 'Marketing Assets' },
      { id: 'project-template', name: 'Project Proposal Template' },
      { id: 'it-faq', name: 'IT FAQ' },
      { id: 'new-employee-guide', name: 'New Employee Guide' },
    ]
  },
  {
    name: 'Daily Tools',
    documents: [
      { id: 'lunch-box', name: 'Lunch Box Selection' },
      { id: 'leave-management', name: 'Personal Leave Management' },
    ]
  }
];

const dummyMarkdown = `# Document Title

## Introduction
This is a sample markdown document for demonstration purposes.

## Main Content
- Point 1
- Point 2
- Point 3

## Conclusion
Thank you for reading!
`;

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(documentCategories[0].name);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [documentContent, setDocumentContent] = useState(dummyMarkdown);
  const { toast } = useToast();

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedDocument('');
  };

  const handleDocumentChange = (value: string) => {
    setSelectedDocument(value);
    // In a real app, this would fetch the document content from the backend
    setDocumentContent(dummyMarkdown);
  };

  const handleSave = () => {
    // In a real app, this would save the document content to the backend
    toast({
      title: "Document saved",
      description: `${selectedDocument} has been successfully updated`,
    });
  };

  const filteredDocuments = documentCategories.find(
    (category) => category.name === selectedCategory
  )?.documents || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-wisesemi-dark">Document Administration</h1>
          <p className="text-gray-600">Manage markdown documents across the intranet</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <NavigationMenu orientation="vertical" className="max-w-none w-full">
                  <NavigationMenuList className="flex flex-col space-y-2 w-full">
                    {documentCategories.map((category) => (
                      <NavigationMenuItem key={category.name} className="w-full">
                        <NavigationMenuTrigger 
                          className={`w-full justify-start ${selectedCategory === category.name ? 'bg-wisesemi text-white' : ''}`}
                          onClick={() => handleCategoryChange(category.name)}
                        >
                          {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-full">
                          <ul className="grid w-[200px] gap-1 p-2">
                            {category.documents.map((doc) => (
                              <li key={doc.id}>
                                <NavigationMenuLink asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => {
                                      setSelectedCategory(category.name);
                                      handleDocumentChange(doc.id);
                                    }}
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    {doc.name}
                                  </Button>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Edit Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
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
                      <label className="block text-sm font-medium mb-1">Document</label>
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
                    <label className="block text-sm font-medium mb-1">Markdown Content</label>
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
                      onClick={handleSave} 
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
          </div>
        </div>
      </main>
      
      <footer className="bg-wisesemi-dark text-white p-4 text-center text-sm">
        <p>© 2025 WiseSemi Intranet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
