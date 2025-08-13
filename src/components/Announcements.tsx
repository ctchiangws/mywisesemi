
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { announcementsApi } from '@/services/api';
import { Announcement } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NewBadge from '@/components/ui/new-badge';
import { useNewContent, useNewContentCount } from '@/hooks/useNewContent';
import { Button } from '@/components/ui/button';
import { lastSeenService } from '@/services/lastSeenService';
import { useConfiguration } from '@/contexts/ConfigurationContext';

const AnnouncementItem = ({ announcement }: { announcement: Announcement }) => {
  const { isNew, markAsSeen } = useNewContent(`announcement-${announcement.id}`, 'announcements');
  
  const handleClick = () => {
    markAsSeen();
  };

  return (
    <div 
      key={announcement.id} 
      className={`p-3 rounded-lg ${announcement.important ? 'bg-wisesemi-light border-l-4 border-wisesemi' : 'bg-gray-50'} cursor-pointer hover:bg-opacity-80 transition-colors`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-wisesemi-dark">{announcement.title}</h3>
          <NewBadge show={isNew} size="sm" />
        </div>
        <span className="text-xs text-gray-500">{announcement.date}</span>
      </div>
      <div className="text-sm text-gray-600 mt-1 prose prose-sm max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children, ...props }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-wisesemi hover:text-wisesemi-dark underline"
                {...props}
              >
                {children}
              </a>
            ),
            p: ({ children }) => <span>{children}</span>
          }}
        >
          {announcement.description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const Announcements = () => {
  const { config } = useConfiguration();
  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: announcementsApi.getAll
  });

  const announcementIds = announcements.map((a: Announcement) => `announcement-${a.id}`);
  const newCount = useNewContentCount(announcementIds, 'announcements');

  const markAllAsSeen = () => {
    announcements.forEach((announcement: Announcement) => {
      lastSeenService.markAsSeen(`announcement-${announcement.id}`, 'announcements');
    });
    // Force a re-render by updating a state or triggering a refresh
    window.location.reload();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-wisesemi" />
            Announcements
            {config.showCounters && newCount > 0 && (
              <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                {newCount} new
              </span>
            )}
          </CardTitle>
          {newCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsSeen}>
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse p-3 rounded-lg bg-gray-200 h-20"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            Failed to load announcements
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement: Announcement) => (
              <AnnouncementItem key={announcement.id} announcement={announcement} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Announcements;
