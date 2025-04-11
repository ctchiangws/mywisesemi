
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Event } from '@/types';

interface EventSelectorProps {
  events: Event[];
  selectedEvent: string;
  handleEventChange: (value: string) => void;
}

const EventSelector = ({
  events,
  selectedEvent,
  handleEventChange
}: EventSelectorProps) => {
  return (
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
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.title}
                </SelectItem>
              ))}
              <SelectItem value="new">Create New Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventSelector;
