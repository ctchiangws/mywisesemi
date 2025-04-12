
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import { Event } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface EventEditorProps {
  selectedEvent: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  setEventTitle: (value: string) => void;
  setEventDate: (value: string) => void;
  setEventTime: (value: string) => void;
  setEventLocation: (value: string) => void;
}

const EventEditor = ({
  selectedEvent,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  setEventTitle,
  setEventDate,
  setEventTime,
  setEventLocation
}: EventEditorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: (event: Omit<Event, 'id'>) => eventsApi.create(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Event created",
        description: `${eventTitle} has been successfully created`,
      });
    }
  });
  
  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<Event> }) => 
      eventsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Event updated",
        description: `${eventTitle} has been successfully updated`,
      });
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: number) => eventsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Event deleted",
        description: `The event has been successfully deleted`,
      });
    }
  });

  const handleSaveEvent = () => {
    const eventData = {
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      location: eventLocation
    };
    
    if (selectedEvent === 'new') {
      createEventMutation.mutate(eventData);
    } else {
      const eventId = parseInt(selectedEvent);
      updateEventMutation.mutate({ 
        id: eventId, 
        data: eventData 
      });
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent !== 'new') {
      const eventId = parseInt(selectedEvent);
      deleteEventMutation.mutate(eventId);
    }
  };

  return (
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

          <div className="flex justify-between">
            {selectedEvent !== 'new' && (
              <Button 
                onClick={handleDeleteEvent} 
                variant="destructive"
                disabled={deleteEventMutation.isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deleteEventMutation.isPending ? 'Deleting...' : 'Delete Event'}
              </Button>
            )}
            <Button 
              onClick={handleSaveEvent} 
              className="bg-wisesemi hover:bg-wisesemi-dark"
              disabled={createEventMutation.isPending || updateEventMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {createEventMutation.isPending || updateEventMutation.isPending 
                ? 'Saving...' 
                : 'Save Event'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventEditor;
