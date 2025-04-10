
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const events = [
  { id: 1, title: 'Product Launch Meeting', date: '2025-04-12', time: '10:00 AM', location: 'Conference Room A' },
  { id: 2, title: 'Team Building Event', date: '2025-04-15', time: '2:00 PM', location: 'Central Park' },
  { id: 3, title: 'Fiscal Year Planning', date: '2025-04-20', time: '9:00 AM', location: 'Board Room' },
  { id: 4, title: 'Employee Training', date: '2025-04-22', time: '11:00 AM', location: 'Training Center' },
];

const EventCalendar = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-wisesemi" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-start p-2 border-l-2 border-wisesemi rounded-sm bg-white hover:bg-wisesemi-light/50 transition-colors">
              <div className="flex-shrink-0 bg-wisesemi text-white text-xs p-2 rounded text-center mr-3 w-14">
                <div className="font-bold">{event.date.split('-')[2]}</div>
                <div>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(event.date.split('-')[1]) - 1]}</div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-wisesemi-dark">{event.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.time} • {event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCalendar;
