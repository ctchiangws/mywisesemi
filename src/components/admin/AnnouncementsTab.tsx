
import React from 'react';
import AnnouncementSelector from './AnnouncementSelector';
import AnnouncementEditor from './AnnouncementEditor';
import { Announcement } from '@/types';

interface AnnouncementsTabProps {
  announcements: Announcement[];
  selectedAnnouncement: string;
  announcementTitle: string;
  announcementDescription: string;
  announcementDate: string;
  announcementImportant: boolean;
  handleAnnouncementChange: (value: string) => void;
  setAnnouncementTitle: (value: string) => void;
  setAnnouncementDescription: (value: string) => void;
  setAnnouncementDate: (value: string) => void;
  setAnnouncementImportant: (value: boolean) => void;
}

const AnnouncementsTab = ({
  announcements,
  selectedAnnouncement,
  announcementTitle,
  announcementDescription,
  announcementDate,
  announcementImportant,
  handleAnnouncementChange,
  setAnnouncementTitle,
  setAnnouncementDescription,
  setAnnouncementDate,
  setAnnouncementImportant
}: AnnouncementsTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <AnnouncementSelector 
          announcements={announcements}
          selectedAnnouncement={selectedAnnouncement}
          handleAnnouncementChange={handleAnnouncementChange}
        />
      </div>
      
      <div className="lg:col-span-3">
        <AnnouncementEditor 
          selectedAnnouncement={selectedAnnouncement}
          announcementTitle={announcementTitle}
          announcementDescription={announcementDescription}
          announcementDate={announcementDate}
          announcementImportant={announcementImportant}
          setAnnouncementTitle={setAnnouncementTitle}
          setAnnouncementDescription={setAnnouncementDescription}
          setAnnouncementDate={setAnnouncementDate}
          setAnnouncementImportant={setAnnouncementImportant}
        />
      </div>
    </div>
  );
}

export default AnnouncementsTab;
