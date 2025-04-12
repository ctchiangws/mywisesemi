
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import { Announcement } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementsApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AnnouncementEditorProps {
  selectedAnnouncement: string;
  announcementTitle: string;
  announcementDescription: string;
  announcementDate: string;
  announcementImportant: boolean;
  setAnnouncementTitle: (value: string) => void;
  setAnnouncementDescription: (value: string) => void;
  setAnnouncementDate: (value: string) => void;
  setAnnouncementImportant: (value: boolean) => void;
}

const AnnouncementEditor = ({
  selectedAnnouncement,
  announcementTitle,
  announcementDescription,
  announcementDate,
  announcementImportant,
  setAnnouncementTitle,
  setAnnouncementDescription,
  setAnnouncementDate,
  setAnnouncementImportant
}: AnnouncementEditorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createAnnouncementMutation = useMutation({
    mutationFn: (announcement: Omit<Announcement, 'id'>) => announcementsApi.create(announcement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Announcement created",
        description: `${announcementTitle} has been successfully created`,
      });
    }
  });
  
  const updateAnnouncementMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<Announcement> }) => 
      announcementsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Announcement updated",
        description: `${announcementTitle} has been successfully updated`,
      });
    }
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: (id: number) => announcementsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({
        title: "Announcement deleted",
        description: `The announcement has been successfully deleted`,
      });
    }
  });

  const handleSaveAnnouncement = () => {
    const announcementData = {
      title: announcementTitle,
      description: announcementDescription,
      date: announcementDate,
      important: announcementImportant
    };
    
    if (selectedAnnouncement === 'new') {
      createAnnouncementMutation.mutate(announcementData);
    } else {
      const announcementId = parseInt(selectedAnnouncement);
      updateAnnouncementMutation.mutate({ 
        id: announcementId, 
        data: announcementData 
      });
    }
  };

  const handleDeleteAnnouncement = () => {
    if (selectedAnnouncement !== 'new') {
      const announcementId = parseInt(selectedAnnouncement);
      deleteAnnouncementMutation.mutate(announcementId);
    }
  };

  return (
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

          <div className="flex justify-between">
            {selectedAnnouncement !== 'new' && (
              <Button 
                onClick={handleDeleteAnnouncement} 
                variant="destructive"
                disabled={deleteAnnouncementMutation.isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deleteAnnouncementMutation.isPending ? 'Deleting...' : 'Delete Announcement'}
              </Button>
            )}
            <Button 
              onClick={handleSaveAnnouncement} 
              className="bg-wisesemi hover:bg-wisesemi-dark"
              disabled={createAnnouncementMutation.isPending || updateAnnouncementMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {createAnnouncementMutation.isPending || updateAnnouncementMutation.isPending 
                ? 'Saving...' 
                : 'Save Announcement'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnnouncementEditor;
