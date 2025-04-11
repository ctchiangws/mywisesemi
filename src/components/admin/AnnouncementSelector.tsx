
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Announcement } from '@/types';

interface AnnouncementSelectorProps {
  announcements: Announcement[];
  selectedAnnouncement: string;
  handleAnnouncementChange: (value: string) => void;
}

const AnnouncementSelector = ({
  announcements,
  selectedAnnouncement,
  handleAnnouncementChange
}: AnnouncementSelectorProps) => {
  return (
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
                <SelectItem key={announcement.id} value={announcement.id.toString()}>
                  {announcement.title}
                </SelectItem>
              ))}
              <SelectItem value="new">Create New Announcement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnnouncementSelector;
