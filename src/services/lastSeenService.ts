
import { NewContentConfig } from '@/contexts/ConfigurationContext';

interface LastSeenData {
  [contentId: string]: {
    timestamp: number;
    contentType: string;
  };
}

const STORAGE_KEY = 'wisesemi-last-seen';

export const lastSeenService = {
  // Get last seen timestamp for specific content
  getLastSeen(contentId: string): Date | null {
    try {
      const data = this.getAllLastSeen();
      const entry = data[contentId];
      return entry ? new Date(entry.timestamp) : null;
    } catch (error) {
      console.error('Error getting last seen data:', error);
      return null;
    }
  },

  // Mark content as seen
  markAsSeen(contentId: string, contentType: string): void {
    try {
      const data = this.getAllLastSeen();
      data[contentId] = {
        timestamp: Date.now(),
        contentType
      };
      
      // Apply max entries limit
      const config = this.getConfig();
      if (config && Object.keys(data).length > config.maxStorageEntries) {
        // Remove oldest entries
        const entries = Object.entries(data);
        entries.sort(([,a], [,b]) => a.timestamp - b.timestamp);
        const toKeep = entries.slice(-config.maxStorageEntries);
        const newData: LastSeenData = {};
        toKeep.forEach(([key, value]) => {
          newData[key] = value;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error marking content as seen:', error);
    }
  },

  // Check if content is new based on configuration
  isContentNew(contentId: string, lastUpdated: string, config: NewContentConfig): boolean {
    if (!config.enabled) return false;

    const lastSeen = this.getLastSeen(contentId);
    const updatedDate = new Date(lastUpdated);
    
    if (!lastSeen) {
      // Never seen before - check if it's within persistence window
      const now = new Date();
      const persistenceMs = config.defaultPersistenceDays * 24 * 60 * 60 * 1000;
      return (now.getTime() - updatedDate.getTime()) <= persistenceMs;
    }
    
    // Content was updated after last seen
    return updatedDate > lastSeen;
  },

  // Get all last seen data
  getAllLastSeen(): LastSeenData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading last seen data:', error);
      return {};
    }
  },

  // Clear all last seen data
  clearAllLastSeen(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing last seen data:', error);
    }
  },

  // Mark all content of a type as seen
  markAllTypeAsSeen(contentType: string): void {
    try {
      const data = this.getAllLastSeen();
      const now = Date.now();
      
      Object.entries(data).forEach(([contentId, entry]) => {
        if (entry.contentType === contentType) {
          data[contentId] = { ...entry, timestamp: now };
        }
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error marking all content as seen:', error);
    }
  },

  // Get new content count for a type
  getNewCount(contentType: string, contentItems: Array<{ id: string; lastUpdated: string }>, config: NewContentConfig): number {
    if (!config.enabled || !config.contentTypes[contentType as keyof typeof config.contentTypes]) {
      return 0;
    }

    return contentItems.filter(item => 
      this.isContentNew(item.id, item.lastUpdated, config)
    ).length;
  },

  // Helper to get current configuration (assumes it's available in localStorage)
  private getConfig(): NewContentConfig | null {
    try {
      const stored = localStorage.getItem('wisesemi-new-content-config');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      return null;
    }
  }
};
