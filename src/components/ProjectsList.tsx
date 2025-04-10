
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const projects = [
  { id: 1, name: 'Project_X', path: '/projects/project-x' },
  { id: 2, name: 'Project_U', path: '/projects/project-u' },
  { id: 3, name: 'Project_T', path: '/projects/project-t' },
];

const ProjectsList = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark">Project Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div 
            className="flex items-center p-2 rounded-md cursor-pointer hover:bg-wisesemi-light transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 mr-2 text-wisesemi-dark" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2 text-wisesemi-dark" />
            )}
            <span className="font-medium text-wisesemi-dark">Projects</span>
          </div>
          
          {expanded && (
            <ul className="space-y-1 pl-6">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    to={project.path}
                    className="flex items-center p-2 rounded-md hover:bg-wisesemi-light transition-colors group"
                  >
                    <Folder className="h-4 w-4 mr-2 text-wisesemi-dark group-hover:text-wisesemi" />
                    <span className="text-gray-700 group-hover:text-wisesemi-dark">
                      {project.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsList;
