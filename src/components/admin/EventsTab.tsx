
import React from 'react';
import EventSelector from './EventSelector';
import EventEditor from './EventEditor';
import { Event } from '@/types';

interface EventsTabProps {
  events: Event[];
  selectedEvent: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  handleEventChange: (value: string) => void;
  setEventTitle: (value: string) => void;
  setEventDate: (value: string) => void;
  setEventTime: (value: string) => void;
  setEventLocation: (value: string) => void;
}

const EventsTab = ({
  events,
  selectedEvent,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  handleEventChange,
  setEventTitle,
  setEventDate,
  setEventTime,
  setEventLocation
}: EventsTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <EventSelector 
          events={events}
          selectedEvent={selectedEvent}
          handleEventChange={handleEventChange}
        />
      </div>
      
      <div className="lg:col-span-3">
        <EventEditor 
          selectedEvent={selectedEvent}
          eventTitle={eventTitle}
          eventDate={eventDate}
          eventTime={eventTime}
          eventLocation={eventLocation}
          setEventTitle={setEventTitle}
          setEventDate={setEventDate}
          setEventTime={setEventTime}
          setEventLocation={setEventLocation}
        />
      </div>
    </div>
  );
}

export default EventsTab;
