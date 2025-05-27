
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
  { id: 1, name: 'Project Alpha', description: 'Developing new AI solution', status: 'In Progress' },
  { id: 2, name: 'Project Beta', description: 'Enhancing customer service platform', status: 'Completed' },
  { id: 3, name: 'Project Gamma', description: 'Upgrading IT infrastructure', status: 'Planning' },
];

import { announcementsService } from './announcementsService';
import { eventsService } from './eventsService';

// Import the markdown content directly
const announcementsContent = `
# Company Announcements

## New Company Policy Update
**Date: 2025-04-05 | Important**

Please review the updated remote work policy before the end of the month. The new policy includes flexible working arrangements and updated guidelines for hybrid work schedules.

## Quarterly All-Hands Meeting
**Date: 2025-04-15 | Important**

Join us for our Q2 all-hands meeting next Friday at 2pm in the main conference room. We'll be discussing company performance, upcoming projects, and strategic initiatives.

## IT System Maintenance
**Date: 2025-04-12**

The IT systems will be down for maintenance this Saturday from 10pm to 2am. Please save your work and log out before the maintenance window begins.
`;

const eventsContent = `
# Upcoming Events

## 智騰半導體 首次員工旅遊
**Date: Sep. 13/14, 2025**
**Time: ALL DAY**
**Location: 雲品 日月潭**

## 智騰半導體 2025 股東會
**Date: June 30, 2025**
**Time: 10:00 AM**
**Location: Conference Room A**

Important meeting to discuss the upcoming product launch strategy and timeline.

## 智騰半導體 首次員工教育訓練Team Building Event
**Date: April 15, 2025**
**Time: 2:00 PM**
**Location: Central Park**

Annual team building activities to strengthen collaboration and team spirit.

## 智騰半導體 首次員工教育訓練
**Date: Jan 07, 2025**
**Time: 13:00 AM**
**Location: 肯沃商務中心 Training Center**

Professional development workshop on new technologies and best practices.
`;

export const departmentsApi = {
  getAll: async (): Promise<Department[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return departmentsData;
  },
};

export const documentsApi = {
  getAll: async (): Promise<Document[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return documentsData;
  },
};

export const announcementsApi = {
  getAll: async (): Promise<Announcement[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const parsed = announcementsService.parseMarkdown(announcementsContent);
    return parsed.map((item, index) => ({
      id: index + 1,
      title: item.title,
      description: item.description,
      date: item.date,
      important: item.important
    }));
  }
};

export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const parsed = eventsService.parseMarkdown(eventsContent);
    return parsed.map((item, index) => ({
      id: index + 1,
      title: item.title,
      date: item.date,
      time: item.time,
      location: item.location
    }));
  }
};

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return projectsData;
  },
};
