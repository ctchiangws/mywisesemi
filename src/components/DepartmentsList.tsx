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

const DepartmentItem = ({ department }: { department: Department }) => {
  const { t } = useLanguage();
  
  const getContentId = (path: string) => {
    if (path.startsWith('/departments/')) {
      return path.replace('/departments/', '');
    }
    return department.name.toLowerCase();
  };
  
  const { isNew } = useNewContent(getContentId(department.path), 'departments');
  
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

  return (
    <li key={department.id}>
      {isExternalLink(department.path) ? (
        <a
          href={department.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
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
  
  const { data: departments = [], isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: departmentsApi.getAll,
  });

  const departmentIds = departments.map((d: Department) => {
    if (d.path.startsWith('/departments/')) {
      return d.path.replace('/departments/', '');
    }
    return d.name.toLowerCase();
  });
  const newCount = useNewContentCount(departmentIds, 'departments');

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
            {t('home.departments')}
            {newCount > 0 && (
              <span className="ml-2 text-sm bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                {newCount} new
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse h-32 w-full bg-muted rounded-md"></div>
          </div>
        ) : error ? (
          <div className="text-destructive text-center py-4">
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
