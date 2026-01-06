
import React from 'react';
import { FolderGit2, GitBranch, Workflow, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const getIcon = (type: string) => {
  switch (type) {
    case 'project':
      return <FolderGit2 className="h-4 w-4 mr-2 text-blue-500" />;
    case 'version':
      return <GitBranch className="h-4 w-4 mr-2 text-green-500" />;
    case 'workflow':
      return <Workflow className="h-4 w-4 mr-2 text-purple-500" />;
    case 'erp':
      return <Package className="h-4 w-4 mr-2 text-orange-500" />;
    default:
      return <FolderGit2 className="h-4 w-4 mr-2 text-blue-500" />;
  }
};

const ProjectTools = () => {
  const { language } = useLanguage();
  
  const projectTools = [
    {
      id: 1,
      name: language === 'zh' ? '智騰專案管理' : 'WiseProj',
      type: 'project',
      path: 'http://192.168.30.253:30080/'
    },
    {
      id: 2,
      name: language === 'zh' ? '智騰版本控制' : 'OAHub',
      type: 'version',
      path: 'http://192.168.30.253:3000/'
    },
    {
      id: 3,
      name: language === 'zh' ? '智騰流程控制' : 'Wisen8n',
      type: 'workflow',
      path: 'http://192.168.30.253:5678/'
    },
    {
      id: 4,
      name: language === 'zh' ? '智騰ERP' : 'WiseOdoo',
      type: 'erp',
      path: 'http://192.168.30.170:8069/web/login?db=wisesemi'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-wisesemi-dark flex items-center">
          <FolderGit2 className="h-5 w-5 mr-2 text-wisesemi" />
          {language === 'zh' ? '專案工具' : 'Project Tools'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {projectTools.map((tool) => (
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

export default ProjectTools;
