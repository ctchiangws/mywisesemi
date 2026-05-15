import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface NewContentConfig {
  // General Settings
  enabled: boolean;
  
  // Content Type Settings
  contentTypes: {
    announcements: boolean;
    events: boolean;
    documents: boolean;
    departments: boolean;
    projects: boolean;
  };
  
  // Manual Badge Control - the only way to set badges
  manualBadges: Record<string, boolean>;
  
  // Visual Settings
  badgeStyle: 'pill' | 'dot' | 'outline';
  badgeColor: 'red' | 'blue' | 'green' | 'orange';
  showAnimations: boolean;
}

const defaultConfig: NewContentConfig = {
  enabled: true,
  contentTypes: {
    announcements: true,
    events: true,
    documents: true,
    departments: true,
    projects: true,
  },
  manualBadges: {},
  badgeStyle: 'pill',
  badgeColor: 'red',
  showAnimations: true,
};

interface ConfigurationContextType {
  config: NewContentConfig;
  updateConfig: (updates: Partial<NewContentConfig>) => void;
  resetConfig: () => void;
  setBadge: (contentId: string, isNew: boolean) => void;
  clearAllBadges: () => void;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

const STORAGE_KEY = 'wisesemi-new-content-config';

// Load initial config from localStorage synchronously
const loadInitialConfig = (): NewContentConfig => {
  try {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      return { ...defaultConfig, ...parsedConfig };
    }
  } catch (error) {
    console.error('Failed to load configuration:', error);
  }
  return defaultConfig;
};

export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<NewContentConfig>(loadInitialConfig);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      } catch (error) {
        console.error('Failed to save configuration:', error);
      }
    }
  }, [config, isInitialized]);

  const updateConfig = (updates: Partial<NewContentConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      ...(updates.contentTypes && {
        contentTypes: { ...prev.contentTypes, ...updates.contentTypes }
      })
    }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const setBadge = (contentId: string, isNew: boolean) => {
    setConfig(prev => {
      const newManualBadges = { ...prev.manualBadges };
      if (isNew) {
        newManualBadges[contentId] = true;
      } else {
        delete newManualBadges[contentId];
      }
      return { ...prev, manualBadges: newManualBadges };
    });
  };

  const clearAllBadges = () => {
    setConfig(prev => ({ ...prev, manualBadges: {} }));
  };

  return (
    <ConfigurationContext.Provider value={{
      config,
      updateConfig,
      resetConfig,
      setBadge,
      clearAllBadges
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
