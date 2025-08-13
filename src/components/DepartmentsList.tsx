
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { departmentsApi } from '@/services/api';
import { Department } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import NewBadge from '@/components/ui/new-badge';
import { useNewContent, useNewContentCount } from '@/hooks/useNewContent';
import { Button } from '@/components/ui/button';
import { lastSeenService } from '@/services/lastSeenService';
import { useConfiguration } from '@/contexts/ConfigurationContext';

const DepartmentItem = ({ department }: { department: Department }) => {
  const { t } = useLanguage();
  const { isNew, markAsSeen } = useNewContent(department.name.toLowerCase(), 'departments');
  
  const getDepartmentName = (dept: Department) => {
    if (dept.name === 'QA') {
      return 'QA';
    }
    
    if (isExternalLink(dept.path)) {
      const translationKey = `dept.${dept.name.toLowerCase()}`;
      return t(translationKey);
    }
    
    const deptKey = dept.path.split('/').pop();
    const translationKey = `dept.${deptKey}`;
    return t(translationKey);
  };

  const isExternalLink = (path: string) => {
    return path.startsWith('http://') || path.startsWith('https://');
  };

  const handleClick = () => {
    markAsSeen();
  };

  return (
    <li key={department.id}>
      {isExternalLink(department.path) ? (
        <a
          href={department.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
          onClick={handleClick}
        >
          <Folder className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
          <span className="text-gray-700 group-hover:text-wisesemi-dark flex-grow">
            {getDepartmentName(department)}
          </span>
          <NewBadge show={isNew} size="sm" />
        </a>
      ) : (
        <Link 
          to={department.path}
          className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
          onClick={handleClick}
        >
          <Folder className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
          <span className="text-gray-700 group-hover:text-wisesemi-dark flex-grow">
            {getDepartmentName(department)}
          </span>
          <NewBadge show={isNew} size="sm" />
        </Link>
      )}
    </li>
  );
};

const DepartmentsList = () => {
  const { t } = useLanguage();
  const { config } = useConfiguration();
  
  const { data: departments = [], isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: departmentsApi.getAll,
  });

  const departmentIds = departments.map((d: Department) => d.name.toLowerCase());
  const newCount = useNewContentCount(departmentIds, 'departments');

  const markAllAsSeen = () => {
    departments.forEach((department: Department) => {
      lastSeenService.markAsSeen(department.name.toLowerCase(), 'departments');
    });
    window.location.reload();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
            {t('home.departments')}
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
          <div className="flex justify-center py-4">
            <div className="animate-pulse h-32 w-full bg-gray-200 rounded-md"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            Failed to load departments
          </div>
        ) : (
          <ul className="space-y-2">
            {departments.map((department: Department) => (
              <DepartmentItem key={department.id} department={department} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentsList;
