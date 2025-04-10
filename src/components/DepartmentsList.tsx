
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const departments = [
  { id: 1, name: 'Human Resources', path: '/departments/hr' },
  { id: 2, name: 'Finance', path: '/departments/finance' },
  { id: 3, name: 'Marketing', path: '/departments/marketing' },
  { id: 4, name: 'Engineering', path: '/departments/engineering' },
  { id: 5, name: 'Product Management', path: '/departments/product' },
  { id: 6, name: 'Customer Support', path: '/departments/support' },
  { id: 7, name: 'Sales', path: '/departments/sales' },
  { id: 8, name: 'Operations', path: '/departments/operations' },
];

const DepartmentsList = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-intranet-dark">Departments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {departments.map((department) => (
            <li key={department.id}>
              <Link 
                to={department.path}
                className="flex items-center p-2 rounded-md hover:bg-intranet-light transition-colors group"
              >
                <Folder className="h-4 w-4 mr-2 text-intranet-dark group-hover:text-intranet" />
                <span className="text-gray-700 group-hover:text-intranet-dark">
                  {department.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DepartmentsList;
