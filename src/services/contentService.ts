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
    name: 'CEO Office',
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
  
  // Individual Announcements (matching component IDs)
  'announcement-1': {
    id: 'announcement-1',
    name: 'Company Policy Update',
    type: 'announcement',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/announcements.md'
  },
  'announcement-2': {
    id: 'announcement-2',
    name: 'New Office Hours',
    type: 'announcement',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/announcements.md'
  },
  'announcement-3': {
    id: 'announcement-3',
    name: 'IT System Maintenance',
    type: 'announcement',
    lastUpdated: '2025-08-13',
    author: 'IT Department',
    path: '/data/announcements.md'
  },

  // Individual Events (matching component IDs)
  'event-1': {
    id: 'event-1',
    name: 'Team Building Event',
    type: 'event',
    lastUpdated: '2025-08-14',
    author: 'Event Coordinator',
    path: '/data/events.md'
  },
  'event-2': {
    id: 'event-2',
    name: 'Quarterly All-Hands',
    type: 'event',
    lastUpdated: '2025-08-14',
    author: 'Event Coordinator',
    path: '/data/events.md'
  },
  'event-3': {
    id: 'event-3',
    name: 'Holiday Party',
    type: 'event',
    lastUpdated: '2025-08-13',
    author: 'Event Coordinator',
    path: '/data/events.md'
  },

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
  'document-8': {
    id: 'document-8',
    name: '新員工指南',
    type: 'guide',
    lastUpdated: '2025-08-13',
    author: 'HR Department',
    path: '/documents/new-employee-guide'
  },
  'document-6': {
    id: 'document-6',
    name: '專案提案模板',
    type: 'document',
    lastUpdated: '2025-08-14',
    author: 'Project Management',
    path: '/documents/project-template'
  },
  'document-4': {
    id: 'document-4',
    name: '產品路線圖',
    type: 'document',
    lastUpdated: '2025-08-14',
    author: 'Product Team',
    path: '/documents/product-roadmap'
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
  'marketing-assets': {
    id: 'marketing-assets',
    name: 'Marketing Assets',
    type: 'document',
    lastUpdated: '2025-08-13',
    author: 'Marketing Team',
    path: '/data/documents/marketing-assets.md'
  },
  'employee-handbook': {
    id: 'employee-handbook',
    name: 'Employee Handbook',
    type: 'document',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/documents/employee-handbook.md'
  },
  'project-template': {
    id: 'project-template',
    name: 'Project Template',
    type: 'document',
    lastUpdated: '2025-08-14',
    author: 'Project Management',
    path: '/data/documents/project-template.md'
  },
  'product-roadmap': {
    id: 'product-roadmap',
    name: 'Product Roadmap',
    type: 'document',
    lastUpdated: '2025-08-13',
    author: 'Product Team',
    path: '/data/documents/product-roadmap.md'
  },
  'new-employee-guide': {
    id: 'new-employee-guide',
    name: 'New Employee Guide',
    type: 'guide',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/documents/new-employee-guide.md'
  },
  'employee-faq': {
    id: 'employee-faq',
    name: 'Employee FAQ',
    type: 'faq',
    lastUpdated: '2025-08-14',
    author: 'HR Department',
    path: '/data/documents/employee-faq.md'
  }
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

  getAllContent(): ContentMetadata[] {
    return Object.values(contentRegistry);
  }
};
