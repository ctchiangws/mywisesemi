
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, Coffee, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const LifeInWisesemi = () => {
  const { t, language } = useLanguage();
  
  const lifeItems = [
    {
      id: 1,
      name: language === 'zh' ? '員工活動' : 'Employee Activities',
      path: '/documents/employee-activities',
      icon: <Users className="h-4 w-4 mr-2 text-pink-500" />
    },
    {
      id: 2,
      name: language === 'zh' ? '公司聚餐' : 'Company Dining',
      path: '/documents/company-dining',
      icon: <Coffee className="h-4 w-4 mr-2 text-orange-500" />
    },
    {
      id: 3,
      name: language === 'zh' ? '團隊建設' : 'Team Building',
      path: '/documents/team-building',
      icon: <Heart className="h-4 w-4 mr-2 text-red-500" />
    },
    {
      id: 4,
      name: language === 'zh' ? '節慶活動' : 'Holiday Events',
      path: '/documents/holiday-events',
      icon: <Calendar className="h-4 w-4 mr-2 text-green-500" />
    },
    {
      id: 5,
      name: language === 'zh' ? '員工相簿' : 'Photo Gallery',
      path: '/documents/photo-gallery',
      icon: <Camera className="h-4 w-4 mr-2 text-blue-500" />
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <Heart className="h-5 w-5 mr-2 text-pink-500" />
          {t('home.life_in_wisesemi')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {lifeItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
              >
                {item.icon}
                <span className="text-gray-700 group-hover:text-wisesemi-dark">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LifeInWisesemi;
