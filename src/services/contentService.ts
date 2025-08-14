
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
  // Departments - some with recent updates
  'ceo-office': {
    id: 'ceo-office',
    name: 'CEO Office',
    type: 'department',
    lastUpdated: '2025-01-13',
    author: 'Admin',
    path: '/data/departments/ceo-office.md'
  },
  'hr': {
    id: 'hr',
    name: 'Human Resources',
    type: 'department',
    lastUpdated: '2025-01-14',
    author: 'Jane Smith',
    path: '/data/departments/hr.md'
  },
  'finance': {
    id: 'finance',
    name: 'Finance',
    type: 'department',
    lastUpdated: '2025-01-12',
    author: 'Robert Thompson',
    path: '/data/departments/finance.md'
  },
  'marketing': {
    id: 'marketing',
    name: 'Marketing',
    type: 'department',
    lastUpdated: '2025-01-14',
    author: 'Jessica Brown',
    path: '/data/departments/marketing.md'
  },
  'rd1': {
    id: 'rd1',
    name: 'RD1',
    type: 'department',
    lastUpdated: '2025-01-13',
    author: 'Alex Chen',
    path: '/data/departments/rd1.md'
  },
  'rd2': {
    id: 'rd2',
    name: 'RD2',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Samantha Wong',
    path: '/data/departments/rd2.md'
  },
  'support': {
    id: 'support',
    name: 'Customer Support',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Brian Johnson',
    path: '/data/departments/support.md'
  },
  'sales': {
    id: 'sales',
    name: 'Sales',
    type: 'department',
    lastUpdated: '2025-01-14',
    author: 'Thomas Wilson',
    path: '/data/departments/sales.md'
  },
  'operations': {
    id: 'operations',
    name: 'Operations',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Matthew Robinson',
    path: '/data/departments/operations.md'
  },
  'itcad': {
    id: 'itcad',
    name: 'ITCAD',
    type: 'department',
    lastUpdated: '2025-01-13',
    author: 'IT Department',
    path: '/data/departments/itcad.md'
  },
  // Life in Wisesemi
  'employee-activities': {
    id: 'employee-activities',
    name: 'Employee Activities',
    type: 'life',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/data/life/employee-activities.md'
  },
  'company-dining': {
    id: 'company-dining',
    name: 'Company Dining',
    type: 'life',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/data/life/company-dining.md'
  },
  'team-building': {
    id: 'team-building',
    name: 'Team Building',
    type: 'life',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/data/life/team-building.md'
  },
  'work-life-balance': {
    id: 'work-life-balance',
    name: 'Work Life Balance',
    type: 'life',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/data/life/work-life-balance.md'
  },
  'holiday-events': {
    id: 'holiday-events',
    name: 'Holiday Events',
    type: 'life',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/data/life/holiday-events.md'
  },
  'photo-gallery': {
    id: 'photo-gallery',
    name: 'Photo Gallery',
    type: 'life',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: 'http://mywisesemi.photo.wisesemi.com/'
  },
  // Announcements and Events with recent updates
  'announcements': {
    id: 'announcements',
    name: 'Company Announcements',
    type: 'announcement',
    lastUpdated: '2025-01-14',
    author: 'HR Department',
    path: '/data/announcements.md'
  },
  'events': {
    id: 'events',
    name: 'Upcoming Events',
    type: 'event',
    lastUpdated: '2025-01-14',
    author: 'Event Coordinator',
    path: '/data/events.md'
  },
  // Shared Documents with some recent updates
  'marketing-assets': {
    id: 'marketing-assets',
    name: 'Marketing Assets',
    type: 'document',
    lastUpdated: '2025-01-13',
    author: 'Marketing Team',
    path: '/data/documents/marketing-assets.md'
  },
  'employee-handbook': {
    id: 'employee-handbook',
    name: 'Employee Handbook',
    type: 'document',
    lastUpdated: '2025-01-14',
    author: 'HR Department',
    path: '/data/documents/employee-handbook.md'
  },
  'project-template': {
    id: 'project-template',
    name: 'Project Template',
    type: 'document',
    lastUpdated: '2025-04-01',
    author: 'Project Management',
    path: '/data/documents/project-template.md'
  },
  'product-roadmap': {
    id: 'product-roadmap',
    name: 'Product Roadmap',
    type: 'document',
    lastUpdated: '2025-01-13',
    author: 'Product Team',
    path: '/data/documents/product-roadmap.md'
  },
  'new-employee-guide': {
    id: 'new-employee-guide',
    name: 'New Employee Guide',
    type: 'guide',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/data/documents/new-employee-guide.md'
  },
  'employee-faq': {
    id: 'employee-faq',
    name: 'Employee FAQ',
    type: 'faq',
    lastUpdated: '2025-04-01',
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
