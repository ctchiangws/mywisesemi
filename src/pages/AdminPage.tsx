
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Megaphone, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { announcementsApi, eventsApi } from '@/services/api';

import AdminLayout from '@/components/admin/AdminLayout';
import Login from '@/components/admin/Login';
import DocumentsTab from '@/components/admin/DocumentsTab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import EventsTab from '@/components/admin/EventsTab';

const documentCategories = [
  { 
    name: 'Departments',
    documents: [
      { id: 'ceo-office', name: 'CEO Office' },
      { id: 'rd1', name: 'RD1' },
      { id: 'rd2', name: 'RD2' },
      { id: 'sales', name: 'Sales' },
      { id: 'finance', name: 'Finance' },
      { id: 'hr', name: 'HR' },
    ]
  },
  {
    name: 'Projects',
    documents: [
      { id: 'project-x', name: 'Project_X' },
      { id: 'project-u', name: 'Project_U' },
      { id: 'project-t', name: 'Project_T' },
    ]
  },
  {
    name: 'ISO Documents',
    documents: [
      { id: 'quality-manual', name: 'ISO 9001 Quality Manual' },
      { id: 'process-docs', name: 'Process Documentation' },
      { id: 'audit-procedures', name: 'Audit Procedures' },
    ]
  },
  {
    name: 'Shared Documents',
    documents: [
      { id: 'financial-report', name: 'Q1 Financial Report' },
      { id: 'brand-guidelines', name: 'Brand Guidelines 2025' },
      { id: 'employee-handbook', name: 'Employee Handbook' },
      { id: 'product-roadmap', name: 'Product Roadmap' },
      { id: 'marketing-assets', name: 'Marketing Assets' },
      { id: 'project-template', name: 'Project Proposal Template' },
      { id: 'it-faq', name: 'IT FAQ' },
      { id: 'new-employee-guide', name: 'New Employee Guide' },
    ]
  },
  {
    name: 'Daily Tools',
    documents: [
      { id: 'lunch-box', name: 'Lunch Box Selection' },
      { id: 'leave-management', name: 'Personal Leave Management' },
    ]
  }
];

const dummyMarkdown = `# Document Title

## Introduction
This is a sample markdown document for demonstration purposes.

## Main Content
- Point 1
- Point 2
- Point 3

## Conclusion
Thank you for reading!
`;

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be environment-based

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState('documents');
  
  // Document state
  const [selectedCategory, setSelectedCategory] = useState(documentCategories[0].name);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [documentContent, setDocumentContent] = useState(dummyMarkdown);
  
  // Announcement state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDescription, setAnnouncementDescription] = useState('');
  const [announcementDate, setAnnouncementDate] = useState('');
  const [announcementImportant, setAnnouncementImportant] = useState(false);
  
  // Event state
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: announcementsApi.getAll,
    enabled: selectedTab === 'announcements' && isAuthenticated
  });
  
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: eventsApi.getAll,
    enabled: selectedTab === 'events' && isAuthenticated
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedDocument('');
  };

  const handleDocumentChange = (value: string) => {
    setSelectedDocument(value);
    setDocumentContent(dummyMarkdown);
  };

  const handleAnnouncementChange = (value: string) => {
    setSelectedAnnouncement(value);
    if (value === 'new') {
      setAnnouncementTitle('');
      setAnnouncementDescription('');
      setAnnouncementDate('');
      setAnnouncementImportant(false);
      return;
    }
    
    const announcement = announcements.find(a => a.id.toString() === value);
    if (announcement) {
      setAnnouncementTitle(announcement.title);
      setAnnouncementDescription(announcement.description);
      setAnnouncementDate(announcement.date);
      setAnnouncementImportant(announcement.important);
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
    if (value === 'new') {
      setEventTitle('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
      return;
    }
    
    const event = events.find(e => e.id.toString() === value);
    if (event) {
      setEventTitle(event.title);
      setEventDate(event.date);
      setEventTime(event.time);
      setEventLocation(event.location);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <Login 
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wisesemi-dark">Admin Dashboard</h1>
        <p className="text-gray-600">Manage content across the intranet</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-1">
            <Megaphone className="h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <DocumentsTab 
            selectedCategory={selectedCategory}
            selectedDocument={selectedDocument}
            documentContent={documentContent}
            documentCategories={documentCategories}
            handleCategoryChange={handleCategoryChange}
            handleDocumentChange={handleDocumentChange}
            setDocumentContent={setDocumentContent}
          />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsTab 
            announcements={announcements}
            selectedAnnouncement={selectedAnnouncement}
            announcementTitle={announcementTitle}
            announcementDescription={announcementDescription}
            announcementDate={announcementDate}
            announcementImportant={announcementImportant}
            handleAnnouncementChange={handleAnnouncementChange}
            setAnnouncementTitle={setAnnouncementTitle}
            setAnnouncementDescription={setAnnouncementDescription}
            setAnnouncementDate={setAnnouncementDate}
            setAnnouncementImportant={setAnnouncementImportant}
          />
        </TabsContent>

        <TabsContent value="events">
          <EventsTab 
            events={events}
            selectedEvent={selectedEvent}
            eventTitle={eventTitle}
            eventDate={eventDate}
            eventTime={eventTime}
            eventLocation={eventLocation}
            handleEventChange={handleEventChange}
            setEventTitle={setEventTitle}
            setEventDate={setEventDate}
            setEventTime={setEventTime}
            setEventLocation={setEventLocation}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminPage;
