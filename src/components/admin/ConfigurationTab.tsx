
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { useToast } from '@/hooks/use-toast';
import { Settings, Download, Upload, RotateCcw, Trash2 } from 'lucide-react';

const ConfigurationTab = () => {
  const { config, updateConfig, resetConfig, exportConfig, importConfig } = useConfiguration();
  const { toast } = useToast();
  const [importText, setImportText] = useState('');

  const handleExport = () => {
    const configJson = exportConfig();
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wisesemi-config.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Configuration Exported",
      description: "Configuration file has been downloaded.",
    });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      toast({
        title: "Import Failed",
        description: "Please paste configuration JSON.",
        variant: "destructive",
      });
      return;
    }

    const success = importConfig(importText);
    if (success) {
      setImportText('');
      toast({
        title: "Configuration Imported",
        description: "Settings have been updated successfully.",
      });
    } else {
      toast({
        title: "Import Failed",
        description: "Invalid configuration format.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    resetConfig();
    toast({
      title: "Configuration Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  const clearUserData = () => {
    localStorage.removeItem('wisesemi-last-seen');
    toast({
      title: "User Data Cleared",
      description: "All user tracking data has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-wisesemi-dark flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            New Content Configuration
          </h2>
          <p className="text-gray-600 mt-1">
            Configure how "new" content indicators behave across the system.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="content">Content Types</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable New Content Indicators</Label>
                  <p className="text-sm text-gray-500">Show "new" badges on updated content</p>
                </div>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(enabled) => updateConfig({ enabled })}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Default Persistence (Days)</Label>
                <p className="text-sm text-gray-500">How long to show "new" indicators</p>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={config.defaultPersistenceDays}
                  onChange={(e) => updateConfig({ defaultPersistenceDays: parseInt(e.target.value) || 30 })}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Type Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.contentTypes).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <div>
                    <Label className="capitalize">{type}</Label>
                    <p className="text-sm text-gray-500">Show new indicators for {type}</p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => 
                      updateConfig({
                        contentTypes: { ...config.contentTypes, [type]: checked }
                      })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-mark as Seen</Label>
                  <p className="text-sm text-gray-500">Automatically mark content as seen when clicked</p>
                </div>
                <Switch
                  checked={config.autoMarkAsSeen}
                  onCheckedChange={(autoMarkAsSeen) => updateConfig({ autoMarkAsSeen })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Counters</Label>
                  <p className="text-sm text-gray-500">Display count of new items in section headers</p>
                </div>
                <Switch
                  checked={config.showCounters}
                  onCheckedChange={(showCounters) => updateConfig({ showCounters })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Fade After Seen</Label>
                  <p className="text-sm text-gray-500">Reduce opacity of "new" badges after viewing</p>
                </div>
                <Switch
                  checked={config.fadeAfterSeen}
                  onCheckedChange={(fadeAfterSeen) => updateConfig({ fadeAfterSeen })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle>Visual Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge Style</Label>
                <Select
                  value={config.badgeStyle}
                  onValueChange={(badgeStyle: 'pill' | 'dot' | 'outline') => updateConfig({ badgeStyle })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pill">Pill</SelectItem>
                    <SelectItem value="dot">Dot</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Badge Color</Label>
                <Select
                  value={config.badgeColor}
                  onValueChange={(badgeColor: 'red' | 'blue' | 'green' | 'orange') => updateConfig({ badgeColor })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Animations</Label>
                  <p className="text-sm text-gray-500">Enable subtle animations for new badges</p>
                </div>
                <Switch
                  checked={config.showAnimations}
                  onCheckedChange={(showAnimations) => updateConfig({ showAnimations })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Max Storage Entries</Label>
                <p className="text-sm text-gray-500">Maximum number of tracking entries to store</p>
                <Input
                  type="number"
                  min="100"
                  max="10000"
                  value={config.maxStorageEntries}
                  onChange={(e) => updateConfig({ maxStorageEntries: parseInt(e.target.value) || 1000 })}
                  className="w-32"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label>Import Configuration</Label>
                  <p className="text-sm text-gray-500 mb-2">Paste configuration JSON below</p>
                  <Textarea
                    placeholder="Paste configuration JSON here..."
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    className="min-h-32"
                  />
                  <Button onClick={handleImport} className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Configuration
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label>Clear User Data</Label>
                  <p className="text-sm text-gray-500 mb-2">Remove all user tracking data</p>
                  <Button variant="destructive" onClick={clearUserData}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All User Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigurationTab;
