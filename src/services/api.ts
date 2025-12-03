
import { Department, Document, Announcement, Event, Project } from '@/types';

const departmentsData: Department[] = [
  { id: 1, name: 'CEO', path: '/departments/ceo-office' },
  { id: 9, name: 'Corporate Operation', path: '/departments/operations' },
  { id: 8, name: 'Sales', path: '/departments/sales' },
  { id: 5, name: 'Silicon Element Design', path: '/departments/rd1' },
  { id: 6, name: 'AI System Engineering', path: '/departments/rd2' },
  { id: 10, name: 'Design Infrastructure', path: 'http://mywisesemi.cad.wisesemi.com' },
];

const documentsData: Document[] = [
  { id: 3, name: '員工手冊', type: 'document', path: '/documents/employee-handbook' },
  { id: 7, name: '員工常見問題', type: 'faq', path: '/documents/employee-faq' },
  { id: 6, name: '公司組織圖', type: 'document', path: '/documents/orgchart' },
  { id: 9, name: '公司行事曆', type: 'document', path: '/documents/company-calendar' },
  { id: 8, name: '新員工指南', type: 'guide', path: '/documents/new-employee-guide' },
  { id: 10, name: '員工座位圖', type: 'document', path: '/documents/seating-chart' },
];

const projectsData: Project[] = [
  { id: 1, name: 'Project Alpha', path: '/projects/project-alpha' },
  { id: 2, name: 'Project Beta', path: '/projects/project-beta' },
  { id: 3, name: 'Project Gamma', path: '/projects/project-gamma' },
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
      const response = await fetch('/data/announcements.md');
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
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
      const response = await fetch('/data/events.md');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
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
