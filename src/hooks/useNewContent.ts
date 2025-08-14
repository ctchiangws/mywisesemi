
import { useMemo } from 'react';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { lastSeenService } from '@/services/lastSeenService';
import { contentService } from '@/services/contentService';

export const useNewContent = (contentId: string, contentType: string) => {
  const { config } = useConfiguration();
  
  const isNew = useMemo(() => {
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      return false;
    }

    const metadata = contentService.getContentMetadata(contentId);
    if (!metadata) return false;

    const lastUpdated = new Date(metadata.lastUpdated).getTime();
    const lastSeen = lastSeenService.getLastSeen(contentId);
    
    // If never seen, check if it's within the persistence window
    if (!lastSeen) {
      const now = Date.now();
      const persistenceWindow = config.defaultPersistenceDays * 24 * 60 * 60 * 1000;
      return (now - lastUpdated) <= persistenceWindow;
    }
    
    // If seen, check if content was updated after last seen
    return lastUpdated > lastSeen.getTime();
  }, [contentId, contentType, config]);

  const markAsSeen = () => {
    if (config.autoMarkAsSeen) {
      lastSeenService.markAsSeen(contentId, contentType);
    }
  };

  return { isNew, markAsSeen };
};

export const useNewContentCount = (contentIds: string[], contentType: string) => {
  const { config } = useConfiguration();
  
  const count = useMemo(() => {
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      return 0;
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
