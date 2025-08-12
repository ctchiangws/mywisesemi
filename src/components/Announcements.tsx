
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { announcementsApi } from '@/services/api';
import { Announcement } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Announcements = () => {
  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: announcementsApi.getAll
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <Megaphone className="h-5 w-5 mr-2 text-wisesemi" />
          Announcements
        </CardTitle>
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
              <div key={announcement.id} className={`p-3 rounded-lg ${announcement.important ? 'bg-wisesemi-light border-l-4 border-wisesemi' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-wisesemi-dark">{announcement.title}</h3>
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Announcements;
