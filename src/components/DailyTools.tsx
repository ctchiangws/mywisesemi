
import React from 'react';
import { Utensils, FileBox, CalendarDays, Mail, HardDrive, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const getIcon = (type: string) => {
  switch (type) {
    case 'lunch':
      return <Utensils className="h-4 w-4 mr-2 text-orange-500" />;
    case 'leave':
      return <FileBox className="h-4 w-4 mr-2 text-wisesemi" />;
    case 'mail':
      return <Mail className="h-4 w-4 mr-2 text-blue-500" />;
    case 'drive':
      return <HardDrive className="h-4 w-4 mr-2 text-green-500" />;
    case 'calendar':
      return <Calendar className="h-4 w-4 mr-2 text-purple-500" />;
    case 'chat':
      return <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" />;
    default:
      return <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />;
  }
};

const DailyTools = () => {
  const { t, language } = useLanguage();
  
  const dailyTools = [
    {
      id: 1,
      name: language === 'zh' ? '午餐訂購' : 'Lunch Box Selection',
      type: 'lunch',
      path: 'https://www.dinbendon.net/do/'
    },
    {
      id: 2,
      name: language === 'zh' ? '個人請假管理' : 'Personal Leave Management',
      type: 'leave',
      path: 'https://ap11.ragic.com/sims/reg/login.jsp?a=wisesemi202401'
    },
    {
      id: 3,
      name: language === 'zh' ? '智騰郵件' : 'WiseSemi Mail',
      type: 'mail',
      path: 'https://172.16.0.253/wsmail'
    },
    {
      id: 4,
      name: language === 'zh' ? '智騰雲端硬碟' : 'WiseSemi OADrive',
      type: 'drive',
      path: 'https://172.16.0.253/oadrive'
    },
    {
      id: 5,
      name: language === 'zh' ? '智騰日曆' : 'WiseSemi Calendar',
      type: 'calendar',
      path: 'https://172.16.0.253/wscalendar'
    },
    {
      id: 6,
      name: language === 'zh' ? '智騰聊天' : 'WiseSemi Chat',
      type: 'chat',
      path: 'https://172.16.0.253/wschat'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-wisesemi" />
          {t('home.daily_tools')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {dailyTools.map((tool) => (
            <li key={tool.id}>
              <a
                href={tool.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
              >
                {getIcon(tool.type)}
                <span className="text-gray-700 group-hover:text-wisesemi-dark">
                  {tool.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DailyTools;
