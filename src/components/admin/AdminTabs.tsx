
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Megaphone, Calendar, FileText, Tags } from 'lucide-react';
import AnnouncementsTab from './AnnouncementsTab';
import EventsTab from './EventsTab';
import DocumentsTab from './DocumentsTab';
import ConfigurationTab from './ConfigurationTab';
import ContentManagementTab from './ContentManagementTab';

const AdminTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="configuration" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Content
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

          <TabsContent value="content">
            <ContentManagementTab />
          </TabsContent>

          <TabsContent value="announcements">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Announcements Management</h3>
              <p className="text-gray-600">Announcements management will be implemented here.</p>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Events Management</h3>
              <p className="text-gray-600">Events management will be implemented here.</p>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Documents Management</h3>
              <p className="text-gray-600">Documents management will be implemented here.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminTabs;
