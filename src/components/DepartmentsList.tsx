
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const departments = [
  { id: 1, name: 'CEO Office', path: '/departments/ceo-office' },
  { id: 2, name: 'Human Resources', path: '/departments/hr' },
  { id: 3, name: 'Finance', path: '/departments/finance' },
  { id: 4, name: 'Marketing', path: '/departments/marketing' },
  { id: 5, name: 'RD1', path: '/departments/rd1' },
  { id: 6, name: 'RD2', path: '/departments/rd2' },
  { id: 7, name: 'Customer Support', path: '/departments/support' },
  { id: 8, name: 'Sales', path: '/departments/sales' },
  { id: 9, name: 'Operations', path: '/departments/operations' },
];

const DepartmentsList = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark">Departments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {departments.map((department) => (
            <li key={department.id}>
              <Link 
                to={department.path}
                className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
              >
                <Folder className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                <span className="text-gray-700 group-hover:text-wisesemi-dark">
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
