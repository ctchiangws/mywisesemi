import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { contentService, ContentMetadata } from '@/services/contentService';
import { Trash2 } from 'lucide-react';

const ContentManagementTab = () => {
  const { config, setBadge, clearAllBadges } = useConfiguration();
  const [allContent, setAllContent] = useState<ContentMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const content = await contentService.getAllContent();
        setAllContent(content);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  // Group content by type
  const contentByType = allContent.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof allContent>);

  const sortedTypes = Object.keys(contentByType).sort();

  const getTypeDisplayName = (type: string) => {
    const typeNames: Record<string, string> = {
      department: '部門 Departments',
      document: '文件 Documents',
      announcement: '公告 Announcements',
      event: '活動 Events',
      life: '生活 Life in Wisesemi',
    };
    return typeNames[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const isMarkedNew = (contentId: string) => {
    return config.manualBadges[contentId] === true;
  };

  const newBadgeCount = Object.keys(config.manualBadges).filter(key => config.manualBadges[key]).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">Loading content...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Clear All */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>NEW 標籤管理</CardTitle>
              <CardDescription>
                手動設定哪些項目顯示 NEW 標籤。Toggle switches to mark items as NEW.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                {newBadgeCount} items marked NEW
              </Badge>
              {newBadgeCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAllBadges}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Items by Type */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {sortedTypes.map((type) => {
              const typeNewCount = contentByType[type].filter(item => isMarkedNew(item.id)).length;
              
              return (
                <div key={type} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">
                      {getTypeDisplayName(type)}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {contentByType[type].length} items
                    </Badge>
                    {typeNewCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {typeNewCount} NEW
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    {contentByType[type].map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                          isMarkedNew(item.id) 
                            ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' 
                            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
                              {item.name}
                            </p>
                            {isMarkedNew(item.id) && (
                              <Badge variant="destructive" className="text-xs">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            ID: {item.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Switch
                            checked={isMarkedNew(item.id)}
                            onCheckedChange={(checked) => setBadge(item.id, checked)}
                          />
                          <Label className="text-xs text-muted-foreground w-12">
                            {isMarkedNew(item.id) ? 'NEW' : 'Off'}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {type !== sortedTypes[sortedTypes.length - 1] && (
                    <Separator className="mt-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">統計 Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sortedTypes.map((type) => {
              const typeNewCount = contentByType[type].filter(item => isMarkedNew(item.id)).length;
              
              return (
                <div key={type} className="p-3 border rounded-lg text-center">
                  <p className="font-medium text-lg">{contentByType[type].length}</p>
                  <p className="text-xs text-gray-600">{getTypeDisplayName(type)}</p>
                  {typeNewCount > 0 && (
                    <Badge variant="destructive" className="text-xs mt-1">
                      {typeNewCount} NEW
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
