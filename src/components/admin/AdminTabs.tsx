
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Megaphone, Calendar, FileText } from 'lucide-react';
import AnnouncementsTab from './AnnouncementsTab';
import EventsTab from './EventsTab';
import DocumentsTab from './DocumentsTab';
import ConfigurationTab from './ConfigurationTab';

const AdminTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="configuration" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="configuration">
            <ConfigurationTab />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsTab />
          </TabsContent>

          <TabsContent value="events">
            <EventsTab />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminTabs;
