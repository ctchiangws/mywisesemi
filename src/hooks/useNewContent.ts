
import { useMemo } from 'react';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { lastSeenService } from '@/services/lastSeenService';
import { contentService } from '@/services/contentService';

export const useNewContent = (contentId: string, contentType: string) => {
  const { config } = useConfiguration();
  
  const isNew = useMemo(() => {
    console.log(`useNewContent - Checking contentId: ${contentId}, contentType: ${contentType}`);
    console.log(`Config enabled: ${config.enabled}, contentType enabled: ${config.contentTypes[contentType as keyof typeof config.contentTypes]}`);
    
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      console.log(`Content type ${contentType} is disabled or config is disabled`);
      return false;
    }

    // Check manual mode first
    if (config.manualMode) {
      const manualSetting = config.manualBadges[contentId];
      console.log(`Manual mode enabled - contentId: ${contentId}, manual setting: ${manualSetting}`);
      return manualSetting === true;
    }

    const metadata = contentService.getContentMetadata(contentId);
    if (!metadata) {
      console.log(`No metadata found for contentId: ${contentId}`);
      return false;
    }

    console.log(`Metadata found: ${JSON.stringify(metadata)}`);
    
    const lastUpdated = new Date(metadata.lastUpdated).getTime();
    const lastSeen = lastSeenService.getLastSeen(contentId);
    const now = Date.now();
    
    console.log(`Last updated: ${new Date(lastUpdated).toISOString()}`);
    console.log(`Last seen: ${lastSeen ? lastSeen.toISOString() : 'never'}`);
    console.log(`Now: ${new Date(now).toISOString()}`);
    
    // If never seen, check if it's within the persistence window
    if (!lastSeen) {
      const persistenceWindow = config.defaultPersistenceDays * 24 * 60 * 60 * 1000;
      const isWithinWindow = (now - lastUpdated) <= persistenceWindow;
      console.log(`Never seen - persistence window: ${config.defaultPersistenceDays} days, within window: ${isWithinWindow}`);
      return isWithinWindow;
    }
    
    // If seen, check if content was updated after last seen
    const wasUpdatedAfterSeen = lastUpdated > lastSeen.getTime();
    console.log(`Was updated after last seen: ${wasUpdatedAfterSeen}`);
    return wasUpdatedAfterSeen;
  }, [contentId, contentType, config]);

  const markAsSeen = () => {
    console.log(`Marking as seen: ${contentId}, auto mark: ${config.autoMarkAsSeen}`);
    if (config.autoMarkAsSeen) {
      lastSeenService.markAsSeen(contentId, contentType);
    }
  };

  console.log(`useNewContent result for ${contentId}: isNew = ${isNew}`);
  return { isNew, markAsSeen };
};

export const useNewContentCount = (contentIds: string[], contentType: string) => {
  const { config } = useConfiguration();
  
  const count = useMemo(() => {
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      return 0;
    }

    // Use manual mode if enabled
    if (config.manualMode) {
      return contentIds.filter(id => config.manualBadges[id] === true).length;
    }

    return contentIds.filter(id => {
      const metadata = contentService.getContentMetadata(id);
      if (!metadata) return false;

      const lastUpdated = new Date(metadata.lastUpdated).getTime();
      const lastSeen = lastSeenService.getLastSeen(id);
      
      if (!lastSeen) {
        const now = Date.now();
        const persistenceWindow = config.defaultPersistenceDays * 24 * 60 * 60 * 1000;
        return (now - lastUpdated) <= persistenceWindow;
      }
      
      return lastUpdated > lastSeen.getTime();
    }).length;
  }, [contentIds, contentType, config]);

  return count;
};
