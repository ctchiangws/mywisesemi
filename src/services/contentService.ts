import { announcementsService } from './announcementsService';
import { eventsService } from './eventsService';

export interface ContentMetadata {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
  author: string;
  path: string;
}

// Content metadata registry
export const contentRegistry: Record<string, ContentMetadata> = {
  // Departments - updated names and removed specified departments
  'ceo-office': {
    id: 'ceo-office',
    name: 'CEO',
    type: 'department',
    lastUpdated: '2025-08-14',
    author: 'Admin',
    path: '/data/departments/ceo-office.md'
  },
  'rd1': {
    id: 'rd1',
    name: 'Silicon Element Design',
    type: 'department',
    lastUpdated: '2025-08-14',
    author: 'Alex Chen',
    path: '/data/departments/rd1.md'
  },
  'rd2': {
    id: 'rd2',
    name: 'AI System Engineering',
    type: 'department',
    lastUpdated: '2025-08-13',
    author: 'Samantha Wong',
    path: '/data/departments/rd2.md'
  },
  'sales': {
    id: 'sales',
    name: 'Sales',
    type: 'department',
    lastUpdated: '2025-08-14',
    author: 'Thomas Wilson',
    path: '/data/departments/sales.md'
  },
  'operations': {
    id: 'operations',
    name: 'Corporate Operation',
    type: 'department',
    lastUpdated: '2025-08-13',
    author: 'Matthew Robinson',
    path: '/data/departments/operations.md'
  },
  'itcad': {
    id: 'itcad',
    name: 'Design Infrastructure',
    type: 'department',
    lastUpdated: '2025-08-14',
    author: 'IT Department',
    path: '/data/departments/itcad.md'
  },
  
  // Announcements and Events are now dynamically loaded in getAllContent()

  // Documents (matching API IDs)
  'document-3': {
    id: 'document-3',
    name: '員工手冊',
    type: 'document',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/documents/employee-handbook'
  },
  'document-7': {
    id: 'document-7',
    name: '員工常見問題',
    type: 'faq',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/documents/employee-faq'
  },
  'document-6': {
    id: 'document-6',
    name: '公司組織圖',
    type: 'document',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/documents/orgchart'
  },
  'document-9': {
    id: 'document-9',
    name: '公司行事曆',
    type: 'document',
    lastUpdated: '2024-12-28',
    author: 'HR Department',
    path: '/documents/company-calendar'
  },
  'document-10': {
    id: 'document-10',
    name: '員工座位圖',
    type: 'document',
    lastUpdated: '2025-12-01',
    author: 'HR Department',
    path: '/documents/seating-chart'
  },
  'document-8': {
    id: 'document-8',
    name: '新員工指南',
    type: 'guide',
    lastUpdated: '2025-08-13',
    author: 'HR Department',
    path: '/documents/new-employee-guide'
  },

  // Life in Wisesemi
  'employee-activities': {
    id: 'employee-activities',
    name: 'Employee Activities',
    type: 'life',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/life/employee-activities.md'
  },
  'company-dining': {
    id: 'company-dining',
    name: 'Company Dining',
    type: 'life',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/life/company-dining.md'
  },
  'team-building': {
    id: 'team-building',
    name: 'Team Building',
    type: 'life',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/life/team-building.md'
  },
  'work-life-balance': {
    id: 'work-life-balance',
    name: 'Work Life Balance',
    type: 'life',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/life/work-life-balance.md'
  },
  'holiday-events': {
    id: 'holiday-events',
    name: 'Holiday Events',
    type: 'life',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/life/holiday-events.md'
  },
  'photo-gallery': {
    id: 'photo-gallery',
    name: 'Photo Gallery',
    type: 'life',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: 'http://mywisesemi.photo.wisesemi.com/'
  },

  // Legacy entries for backward compatibility
  'announcements': {
    id: 'announcements',
    name: 'Company Announcements',
    type: 'announcement',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/announcements.md'
  },
  'events': {
    id: 'events',
    name: 'Upcoming Events',
    type: 'event',
    lastUpdated: '2025-08-14',
    author: 'Event Coordinator',
    path: '/data/events.md'
  },
};

// Service to load markdown content
export const contentService = {
  async getContent(contentId: string): Promise<string> {
    try {
      console.log(`Attempting to load content for ID: ${contentId}`);
      
      // Get metadata for the content
      const metadata = this.getContentMetadata(contentId);
      
      if (!metadata) {
        console.error(`No metadata found for content ID: ${contentId}`);
        return '# Content Not Found\n\nThe requested content could not be loaded.';
      }
      
      const filePath = metadata.path;
      console.log(`Loading content from: ${filePath}`);
      
      const response = await fetch(filePath);
      
      if (!response.ok) {
        console.error(`Failed to load content: ${contentId}, status: ${response.status}`);
        return '# Content Not Found\n\nThe requested content could not be loaded.';
      }
      
      const contentType = response.headers.get('content-type');
      console.log(`Content-Type: ${contentType}`);
      
      // Ensure we're getting text/plain or text/markdown, not HTML
      if (contentType && contentType.includes('text/html')) {
        console.error(`Received HTML instead of markdown for: ${filePath}`);
        return '# Content Error\n\nReceived HTML instead of markdown content.';
      }
      
      const content = await response.text();
      
      // Additional check: if content starts with HTML tags, it's not markdown
      if (content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
        console.error(`Content appears to be HTML instead of markdown for: ${filePath}`);
        return '# Content Error\n\nReceived HTML content instead of markdown.';
      }
      
      return content;
    } catch (error) {
      console.error('Error loading content:', error);
      return '# Content Not Found\n\nThe requested content could not be loaded.';
    }
  },

  getContentMetadata(contentId: string): ContentMetadata | null {
    console.log(`Getting metadata for content ID: ${contentId}`);
    
    // Handle different content ID formats
    if (contentId.includes('/')) {
      const actualId = contentId.split('/').pop();
      const result = actualId ? contentRegistry[actualId] || null : null;
      console.log(`Extracted ID from path: ${actualId}, found: ${!!result}`);
      return result;
    }
    
    const result = contentRegistry[contentId] || null;
    console.log(`Direct lookup for ID: ${contentId}, found: ${!!result}`);
    return result;
  },

  async getAllContent(): Promise<ContentMetadata[]> {
    const staticContent = Object.values(contentRegistry);
    const dynamicContent: ContentMetadata[] = [];

    try {
      // Fetch and parse announcements
      const announcementsResponse = await fetch('/data/announcements.md');
      if (announcementsResponse.ok) {
        const announcementsText = await announcementsResponse.text();
        const announcements = announcementsService.parseMarkdown(announcementsText);
        
        // Extract last update date from markdown
        const lastUpdateMatch = announcementsText.match(/Last update:\s*(.+)/);
        const lastUpdate = lastUpdateMatch ? lastUpdateMatch[1].trim() : '2025-08-14';
        
        announcements.forEach(announcement => {
          dynamicContent.push({
            id: `announcement-${announcement.id}`,
            name: announcement.title,
            type: 'announcement',
            lastUpdated: announcement.date || lastUpdate,
            author: 'HR Department',
            path: '/data/announcements.md'
          });
        });
      }

      // Fetch and parse events
      const eventsResponse = await fetch('/data/events.md');
      if (eventsResponse.ok) {
        const eventsText = await eventsResponse.text();
        const events = eventsService.parseMarkdown(eventsText);
        
        events.forEach(event => {
          dynamicContent.push({
            id: `event-${event.id}`,
            name: event.title,
            type: 'event',
            lastUpdated: event.date || '2025-08-14',
            author: 'Event Coordinator',
            path: '/data/events.md'
          });
        });
      }
    } catch (error) {
      console.error('Error loading dynamic content:', error);
    }

    return [...staticContent, ...dynamicContent];
  }
};
