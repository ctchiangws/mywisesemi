import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { useToast } from '@/hooks/use-toast';
import { Settings, RotateCcw, Trash2 } from 'lucide-react';

const ConfigurationTab = () => {
  const { config, updateConfig, resetConfig, clearAllBadges } = useConfiguration();
  const { toast } = useToast();

  const handleReset = () => {
    resetConfig();
    toast({
      title: "Configuration Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  const handleClearBadges = () => {
    clearAllBadges();
    toast({
      title: "Badges Cleared",
      description: "All NEW badges have been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-wisesemi-dark flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            Badge Configuration
          </h2>
          <p className="text-gray-600 mt-1">
            Configure how NEW badges appear across the system.
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable NEW Badges</Label>
              <p className="text-sm text-muted-foreground">Show NEW badges on content items</p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(enabled) => updateConfig({ enabled })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Type Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Content Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(config.contentTypes).map(([type, enabled]) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <Label className="capitalize">{type}</Label>
                <p className="text-sm text-muted-foreground">Show badges for {type}</p>
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

      {/* Visual Settings */}
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
              <p className="text-sm text-muted-foreground">Enable pulse animation for badges</p>
            </div>
            <Switch
              checked={config.showAnimations}
              onCheckedChange={(showAnimations) => updateConfig({ showAnimations })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Clear All Badges</Label>
            <p className="text-sm text-muted-foreground mb-2">Remove all NEW badges from all content</p>
            <Button variant="destructive" onClick={handleClearBadges}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All NEW Badges
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationTab;
