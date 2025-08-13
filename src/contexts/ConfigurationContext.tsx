
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface NewContentConfig {
  // General Settings
  enabled: boolean;
  defaultPersistenceDays: number;
  
  // Content Type Settings
  contentTypes: {
    announcements: boolean;
    events: boolean;
    documents: boolean;
    departments: boolean;
    projects: boolean;
  };
  
  // Behavior Settings
  autoMarkAsSeen: boolean;
  showCounters: boolean;
  fadeAfterSeen: boolean;
  
  // Visual Settings
  badgeStyle: 'pill' | 'dot' | 'outline';
  badgeColor: 'red' | 'blue' | 'green' | 'orange';
  showAnimations: boolean;
  
  // Data Management
  clearDataOnLogout: boolean;
  maxStorageEntries: number;
}

const defaultConfig: NewContentConfig = {
  enabled: true,
  defaultPersistenceDays: 30,
  contentTypes: {
    announcements: true,
    events: true,
    documents: true,
    departments: true,
    projects: true,
  },
  autoMarkAsSeen: true,
  showCounters: true,
  fadeAfterSeen: true,
  badgeStyle: 'pill',
  badgeColor: 'red',
  showAnimations: true,
  clearDataOnLogout: false,
  maxStorageEntries: 1000,
};

interface ConfigurationContextType {
  config: NewContentConfig;
  updateConfig: (updates: Partial<NewContentConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

const STORAGE_KEY = 'wisesemi-new-content-config';

export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<NewContentConfig>(defaultConfig);

  // Load configuration from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        setConfig({ ...defaultConfig, ...parsedConfig });
      }
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  }, []);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  }, [config]);

  const updateConfig = (updates: Partial<NewContentConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      // Handle nested contentTypes object
      ...(updates.contentTypes && {
        contentTypes: { ...prev.contentTypes, ...updates.contentTypes }
      })
    }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfig = (configJson: string): boolean => {
    try {
      const imported = JSON.parse(configJson);
      setConfig({ ...defaultConfig, ...imported });
      return true;
    } catch (error) {
      console.error('Failed to import configuration:', error);
      return false;
    }
  };

  return (
    <ConfigurationContext.Provider value={{
      config,
      updateConfig,
      resetConfig,
      exportConfig,
      importConfig
    }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = (): ConfigurationContextType => {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider');
  }
  return context;
};
