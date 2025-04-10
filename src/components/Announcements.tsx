
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'New Company Policy Update',
    description: 'Please review the updated remote work policy before the end of the month.',
    date: '2025-04-05',
    important: true,
  },
  {
    id: 2,
    title: 'Quarterly All-Hands Meeting',
    description: 'Join us for our Q2 all-hands meeting next Friday at 2pm in the main conference room.',
    date: '2025-04-15',
    important: true,
  },
  {
    id: 3,
    title: 'IT System Maintenance',
    description: 'The IT systems will be down for maintenance this Saturday from 10pm to 2am.',
    date: '2025-04-12',
    important: false,
  }
];

const Announcements = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-intranet-dark flex items-center">
          <Megaphone className="h-5 w-5 mr-2 text-intranet" />
          Announcements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className={`p-3 rounded-lg ${announcement.important ? 'bg-intranet-light border-l-4 border-intranet' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-intranet-dark">{announcement.title}</h3>
                <span className="text-xs text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{announcement.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Announcements;
