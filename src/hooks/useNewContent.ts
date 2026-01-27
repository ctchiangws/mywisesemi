import { useMemo } from 'react';
import { useConfiguration } from '@/contexts/ConfigurationContext';

/**
 * Simple hook to check if content should show NEW badge
 * Uses manual badge settings from configuration only
 */
export const useNewContent = (contentId: string, contentType: string) => {
  const { config } = useConfiguration();
  
  const isNew = useMemo(() => {
    // Check if feature is enabled and content type is active
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      return false;
    }

    // Simply check if this content ID is marked as NEW in manual badges
    return config.manualBadges[contentId] === true;
  }, [contentId, contentType, config]);

  return { isNew };
};

/**
 * Hook to count how many items in a list have NEW badges
 */
export const useNewContentCount = (contentIds: string[], contentType: string) => {
  const { config } = useConfiguration();
  
  const count = useMemo(() => {
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      return 0;
    }

    return contentIds.filter(id => config.manualBadges[id] === true).length;
  }, [contentIds, contentType, config]);

  return count;
};
