
import { Department, Document, Announcement, Event, Project } from '@/types';

const departmentsData: Department[] = [
  { id: 1, name: 'CEO Office', path: '/departments/ceo-office' },
  { id: 2, name: 'Human Resources', path: '/departments/hr' },
  { id: 3, name: 'Finance', path: '/departments/finance' },
  { id: 4, name: 'Marketing', path: '/departments/marketing' },
  { id: 5, name: 'RD1', path: '/departments/rd1' },
  { id: 6, name: 'RD2', path: '/departments/rd2' },
  { id: 7, name: 'Customer Support', path: '/departments/support' },
  { id: 8, name: 'Sales', path: '/departments/sales' },
  { id: 9, name: 'Operations', path: '/departments/operations' },
  { id: 10, name: 'ITCAD', path: 'http://mywisesemi.cad.wisesemi.com' },
  { id: 11, name: 'QA', path: 'http://mywisesemi.qa.wisesemi.com' },
];

const documentsData: Document[] = [
  { id: 1, name: 'Q1 Financial Report', type: 'spreadsheet', path: '/documents/financial-report' },
  { id: 2, name: 'Brand Guidelines 2025', type: 'document', path: '/documents/brand-guidelines' },
  { id: 3, name: 'Employee Handbook', type: 'document', path: '/documents/employee-handbook' },
  { id: 4, name: 'Product Roadmap', type: 'document', path: '/documents/product-roadmap' },
  { id: 5, name: 'Marketing Assets', type: 'image', path: '/documents/marketing-assets' },
  { id: 6, name: 'Project Proposal Template', type: 'document', path: '/documents/project-template' },
  { id: 7, name: 'IT FAQ', type: 'faq', path: 'http://mywisesemi.it.wisesemi.com' },
  { id: 8, name: 'New Employee Guide', type: 'guide', path: '/documents/new-employee-guide' },
  { id: 9, name: 'Life in WiseSemi', type: 'document', path: 'http://mywisesemi.life.wisesemi.com' },
];

const projectsData: Project[] = [
  { id: 1, name: 'Project Alpha', status: 'In Progress' },
  { id: 2, name: 'Project Beta', status: 'Completed' },
  { id: 3, name: 'Project Gamma', status: 'Planning' },
];

import { announcementsService } from './announcementsService';
import { eventsService } from './eventsService';

export const departmentsApi = {
  getAll: async (): Promise<Department[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return departmentsData;
  },
};

export const documentsApi = {
  getAll: async (): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return documentsData;
  },
};

export const announcementsApi = {
  getAll: async (): Promise<Announcement[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const response = await fetch('/src/data/content/announcements.md');
      const content = await response.text();
      const parsed = announcementsService.parseMarkdown(content);
      return parsed.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.description,
        date: item.date,
        important: item.important
      }));
    } catch (error) {
      console.error('Error loading announcements:', error);
      return [];
    }
  },
  
  create: async (announcement: Omit<Announcement, 'id'>): Promise<Announcement> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...(await announcementsApi.getAll()).map(a => a.id)) + 1;
    return { ...announcement, id: newId };
  },
  
  update: async (id: number, data: Partial<Announcement>): Promise<Announcement> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const announcements = await announcementsApi.getAll();
    const existing = announcements.find(a => a.id === id);
    if (!existing) throw new Error('Announcement not found');
    return { ...existing, ...data };
  },
  
  delete: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const response = await fetch('/src/data/content/events.md');
      const content = await response.text();
      const parsed = eventsService.parseMarkdown(content);
      return parsed.map((item, index) => ({
        id: index + 1,
        title: item.title,
        date: item.date,
        time: item.time,
        location: item.location
      }));
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  },
  
  create: async (event: Omit<Event, 'id'>): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...(await eventsApi.getAll()).map(e => e.id)) + 1;
    return { ...event, id: newId };
  },
  
  update: async (id: number, data: Partial<Event>): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const events = await eventsApi.getAll();
    const existing = events.find(e => e.id === id);
    if (!existing) throw new Error('Event not found');
    return { ...existing, ...data };
  },
  
  delete: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return projectsData;
  },
};
