
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
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
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            handleCategoryChange(category.name);
                            handleDocumentChange(doc.id);
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {doc.name}
                        </Button>
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
  );
}

export default DocumentNavigation;
