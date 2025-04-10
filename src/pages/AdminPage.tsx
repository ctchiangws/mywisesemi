
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { FileText, Save, Calendar, Lock, Megaphone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const announcements = [
  {
    id: 'new-policy',
    title: 'New Company Policy Update',
    description: 'Please review the updated remote work policy before the end of the month.',
    date: '2025-04-05',
    important: true,
  },
  {
    id: 'all-hands',
    title: 'Quarterly All-Hands Meeting',
    description: 'Join us for our Q2 all-hands meeting next Friday at 2pm in the main conference room.',
    date: '2025-04-15',
    important: true,
  },
  {
    id: 'it-maintenance',
    title: 'IT System Maintenance',
    description: 'The IT systems will be down for maintenance this Saturday from 10pm to 2am.',
    date: '2025-04-12',
    important: false,
  }
];

const events = [
  { id: 'product-launch', title: 'Product Launch Meeting', date: '2025-04-12', time: '10:00 AM', location: 'Conference Room A' },
  { id: 'team-building', title: 'Team Building Event', date: '2025-04-15', time: '2:00 PM', location: 'Central Park' },
  { id: 'planning', title: 'Fiscal Year Planning', date: '2025-04-20', time: '9:00 AM', location: 'Board Room' },
  { id: 'training', title: 'Employee Training', date: '2025-04-22', time: '11:00 AM', location: 'Training Center' },
];

// The password is "admin123" - in a real app, this would be securely stored and verified
const ADMIN_PASSWORD = "admin123";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(documentCategories[0].name);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [documentContent, setDocumentContent] = useState(dummyMarkdown);
  const [selectedTab, setSelectedTab] = useState('documents');
  
  // Announcements state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDescription, setAnnouncementDescription] = useState('');
  const [announcementDate, setAnnouncementDate] = useState('');
  const [announcementImportant, setAnnouncementImportant] = useState(false);
  
  // Events state
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Authentication successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedDocument('');
  };

  const handleDocumentChange = (value: string) => {
    setSelectedDocument(value);
    // In a real app, this would fetch the document content from the backend
    setDocumentContent(dummyMarkdown);
  };

  const handleAnnouncementChange = (value: string) => {
    setSelectedAnnouncement(value);
    const announcement = announcements.find(a => a.id === value);
    if (announcement) {
      setAnnouncementTitle(announcement.title);
      setAnnouncementDescription(announcement.description);
      setAnnouncementDate(announcement.date);
      setAnnouncementImportant(announcement.important);
    } else {
      setAnnouncementTitle('');
      setAnnouncementDescription('');
      setAnnouncementDate('');
      setAnnouncementImportant(false);
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
    const event = events.find(e => e.id === value);
    if (event) {
      setEventTitle(event.title);
      setEventDate(event.date);
      setEventTime(event.time);
      setEventLocation(event.location);
    } else {
      setEventTitle('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
    }
  };

  const handleSaveDocument = () => {
    // In a real app, this would save the document content to the backend
    toast({
      title: "Document saved",
      description: `${selectedDocument} has been successfully updated`,
    });
  };

  const handleSaveAnnouncement = () => {
    // In a real app, this would save the announcement to the backend
    toast({
      title: "Announcement saved",
      description: `${announcementTitle} has been successfully updated`,
    });
  };

  const handleSaveEvent = () => {
    // In a real app, this would save the event to the backend
    toast({
      title: "Event saved",
      description: `${eventTitle} has been successfully updated`,
    });
  };

  const filteredDocuments = documentCategories.find(
    (category) => category.name === selectedCategory
  )?.documents || [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock className="h-5 w-5 text-wisesemi" />
                Admin Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <Button 
                  onClick={handleLogin} 
                  className="w-full bg-wisesemi hover:bg-wisesemi-dark"
                >
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <footer className="bg-wisesemi-dark text-white p-4 text-center text-sm">
          <p>© 2025 WiseSemi Intranet. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
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

          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Navigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NavigationMenu orientation="vertical" className="max-w-none w-full">
                      <NavigationMenuList className="flex flex-col space-y-2 w-full">
                        {documentCategories.map((category) => (
                          <NavigationMenuItem key={category.name} className="w-full">
                            <NavigationMenuTrigger 
                              className={`w-full justify-start ${selectedCategory === category.name ? 'bg-wisesemi text-white' : ''}`}
                              onClick={() => handleCategoryChange(category.name)}
                            >
                              {category.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-full">
                              <ul className="grid w-[200px] gap-1 p-2">
                                {category.documents.map((doc) => (
                                  <li key={doc.id}>
                                    <Button
                                      variant="ghost"
                                      className="w-full justify-start"
                                      onClick={() => {
                                        setSelectedCategory(category.name);
                                        handleDocumentChange(doc.id);
                                      }}
                                    >
                                      <FileText className="mr-2 h-4 w-4" />
                                      {doc.name}
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Edit Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Category</Label>
                          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {documentCategories.map((category) => (
                                <SelectItem key={category.name} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Document</Label>
                          <Select 
                            value={selectedDocument} 
                            onValueChange={handleDocumentChange}
                            disabled={!selectedCategory}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select document" />
                            </SelectTrigger>
                            <SelectContent>
                              {filteredDocuments.map((doc) => (
                                <SelectItem key={doc.id} value={doc.id}>
                                  {doc.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Markdown Content</Label>
                        <Textarea 
                          className="min-h-[400px] font-mono"
                          value={documentContent}
                          onChange={(e) => setDocumentContent(e.target.value)}
                          disabled={!selectedDocument}
                          placeholder="Enter markdown content here..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSaveDocument} 
                          disabled={!selectedDocument}
                          className="bg-wisesemi hover:bg-wisesemi-dark"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Document
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Select Announcement</Label>
                      <Select 
                        value={selectedAnnouncement} 
                        onValueChange={handleAnnouncementChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select announcement" />
                        </SelectTrigger>
                        <SelectContent>
                          {announcements.map((announcement) => (
                            <SelectItem key={announcement.id} value={announcement.id}>
                              {announcement.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">Create New Announcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedAnnouncement === 'new' ? 'Create New Announcement' : 'Edit Announcement'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="announcementTitle">Title</Label>
                        <Input 
                          id="announcementTitle"
                          value={announcementTitle}
                          onChange={(e) => setAnnouncementTitle(e.target.value)}
                          placeholder="Announcement title"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="announcementDescription">Description</Label>
                        <Textarea 
                          id="announcementDescription"
                          value={announcementDescription}
                          onChange={(e) => setAnnouncementDescription(e.target.value)}
                          placeholder="Announcement description"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="announcementDate">Date</Label>
                          <Input 
                            id="announcementDate"
                            type="date"
                            value={announcementDate}
                            onChange={(e) => setAnnouncementDate(e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 md:mt-8">
                          <input
                            type="checkbox"
                            id="announcementImportant"
                            checked={announcementImportant}
                            onChange={(e) => setAnnouncementImportant(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-wisesemi focus:ring-wisesemi"
                          />
                          <Label htmlFor="announcementImportant" className="mb-0">Mark as important</Label>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSaveAnnouncement} 
                          className="bg-wisesemi hover:bg-wisesemi-dark"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Announcement
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Select Event</Label>
                      <Select 
                        value={selectedEvent} 
                        onValueChange={handleEventChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">Create New Event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedEvent === 'new' ? 'Create New Event' : 'Edit Event'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="eventTitle">Title</Label>
                        <Input 
                          id="eventTitle"
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="Event title"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Date</Label>
                          <Input 
                            id="eventDate"
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="eventTime">Time</Label>
                          <Input 
                            id="eventTime"
                            type="time"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="eventLocation">Location</Label>
                        <Input 
                          id="eventLocation"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          placeholder="Event location"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSaveEvent} 
                          className="bg-wisesemi hover:bg-wisesemi-dark"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Event
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-wisesemi-dark text-white p-4 text-center text-sm">
        <p>© 2025 WiseSemi Intranet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
