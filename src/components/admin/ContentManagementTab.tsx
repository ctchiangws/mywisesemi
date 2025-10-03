import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { contentService, ContentMetadata } from '@/services/contentService';
import { Trash2, RotateCcw, CheckCircle } from 'lucide-react';

const ContentManagementTab = () => {
  const { config, updateConfig } = useConfiguration();
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

  // Sort content types for consistent display
  const sortedTypes = Object.keys(contentByType).sort();

  const handleManualModeToggle = (enabled: boolean) => {
    updateConfig({ manualMode: enabled });
  };

  const handleBadgeToggle = (contentId: string, enabled: boolean) => {
    updateConfig({
      manualBadges: {
        ...config.manualBadges,
        [contentId]: enabled
      }
    });
  };

  const handleMarkAllAsNew = (contentType: string) => {
    const newBadges = { ...config.manualBadges };
    contentByType[contentType].forEach(item => {
      newBadges[item.id] = true;
    });
    updateConfig({ manualBadges: newBadges });
  };

  const handleClearAllNew = (contentType: string) => {
    const newBadges = { ...config.manualBadges };
    contentByType[contentType].forEach(item => {
      newBadges[item.id] = false;
    });
    updateConfig({ manualBadges: newBadges });
  };

  const handleClearAllManualSettings = () => {
    updateConfig({ manualBadges: {} });
  };

  const getTypeDisplayName = (type: string) => {
    const typeNames: Record<string, string> = {
      department: 'Departments',
      document: 'Documents',
      announcement: 'Announcements',
      event: 'Events',
      life: 'Life in Wisesemi',
      faq: 'FAQ Documents',
      guide: 'Guide Documents'
    };
    return typeNames[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const isManuallyEnabled = (contentId: string) => {
    return config.manualBadges[contentId] === true;
  };

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
      <Card>
        <CardHeader>
          <CardTitle>Content Badge Management</CardTitle>
          <CardDescription>
            Control which content items show "New" badges manually or use automatic date-based detection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="manual-mode"
              checked={config.manualMode}
              onCheckedChange={handleManualModeToggle}
            />
            <Label htmlFor="manual-mode">
              Enable Manual Badge Control
            </Label>
          </div>
          
          {config.manualMode && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                Manual mode is enabled. Badge visibility is controlled by the toggles below instead of automatic date detection.
              </p>
            </div>
          )}

          {!config.manualMode && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                Automatic mode is enabled. Badges appear based on content update dates and user viewing history.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {config.manualMode && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Manual Badge Settings</CardTitle>
                <CardDescription>
                  Toggle "New" badges for individual content items.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllManualSettings}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedTypes.map((type) => (
                <div key={type} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">
                        {getTypeDisplayName(type)}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {contentByType[type].length} items
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAllAsNew(type)}
                        className="text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        All New
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleClearAllNew(type)}
                        className="text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Clear All
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {contentByType[type].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
                              {item.name}
                            </p>
                            {isManuallyEnabled(item.id) && (
                              <Badge variant="destructive" className="text-xs">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            ID: {item.id} • Updated: {item.lastUpdated} • Author: {item.author}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Switch
                            checked={isManuallyEnabled(item.id)}
                            onCheckedChange={(checked) => handleBadgeToggle(item.id, checked)}
                          />
                          <Label className="text-xs text-gray-600">
                            New
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {type !== sortedTypes[sortedTypes.length - 1] && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Content Statistics</CardTitle>
          <CardDescription>
            Overview of all content items in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sortedTypes.map((type) => {
              const manualNewCount = contentByType[type].filter(item => 
                config.manualMode && isManuallyEnabled(item.id)
              ).length;
              
              return (
                <div
                  key={type}
                  className="p-3 border rounded-lg text-center"
                >
                  <p className="font-medium text-lg">
                    {contentByType[type].length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getTypeDisplayName(type)}
                  </p>
                  {config.manualMode && manualNewCount > 0 && (
                    <Badge variant="destructive" className="text-xs mt-1">
                      {manualNewCount} New
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