
import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, FileBox, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { dailyToolsApi } from '@/services/api';
import { DailyTool } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const getIcon = (type: string) => {
  switch (type) {
    case 'lunch':
      return <Utensils className="h-4 w-4 mr-2 text-orange-500" />;
    case 'leave':
      return <FileBox className="h-4 w-4 mr-2 text-wisesemi" />;
    default:
      return <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />;
  }
};

const DailyTools = () => {
  const { t } = useLanguage();
  
  const { data: dailyTools = [], isLoading } = useQuery({
    queryKey: ['dailyTools'],
    queryFn: dailyToolsApi.getAll
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-wisesemi" />
          {t('home.daily_tools')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {dailyTools.map((tool: DailyTool) => (
              <li key={tool.id}>
                <Link
                  to={tool.path}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
                >
                  {getIcon(tool.type)}
                  <span className="text-gray-700 group-hover:text-wisesemi-dark">
                    {tool.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyTools;
