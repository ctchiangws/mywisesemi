import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/services/api';
import { Event } from '@/types';
import NewBadge from '@/components/ui/new-badge';
import { useNewContent, useNewContentCount } from '@/hooks/useNewContent';

const EventItem = ({ event }: { event: Event }) => {
  const { isNew } = useNewContent(`event-${event.id}`, 'events');

  return (
    <div 
      key={event.id} 
      className="flex items-start p-2 border-l-2 border-wisesemi rounded-sm bg-white hover:bg-wisesemi-light/50 transition-colors"
    >
      <div className="flex-shrink-0 bg-wisesemi text-white text-xs p-2 rounded text-center mr-3 w-14">
        <div className="font-bold">{event.date.split('-')[2]}</div>
        <div>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(event.date.split('-')[1]) - 1]}</div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-wisesemi-dark">{event.title}</h3>
          <NewBadge show={isNew} size="sm" />
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>{event.time} • {event.location}</span>
        </div>
      </div>
    </div>
  );
};

const EventCalendar = () => {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: eventsApi.getAll
  });

  const eventIds = events.map((e: Event) => `event-${e.id}`);
  const newCount = useNewContentCount(eventIds, 'events');

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-wisesemi" />
            Upcoming Events
            {newCount > 0 && (
              <span className="ml-2 text-sm bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                {newCount} new
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse flex items-start p-2 h-16 bg-muted rounded-sm"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-destructive text-center py-4">
            Failed to load events
          </div>
        ) : (
          <div className="grid gap-3">
            {events.map((event: Event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCalendar;
