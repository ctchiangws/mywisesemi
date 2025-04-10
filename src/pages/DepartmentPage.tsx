
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const departmentData = {
  'hr': {
    name: 'Human Resources',
    description: '# Human Resources Department\n\nThe Human Resources department is responsible for recruiting, hiring, and training employees, as well as administering employee-benefit programs.\n\n## Key Responsibilities\n\n- Recruiting and staffing\n- Performance management\n- Learning and development\n- Compensation and benefits\n- Employee relations\n- Compliance with labor laws\n\n## Team Members\n\n- Jane Smith, HR Director\n- John Johnson, Recruitment Manager\n- Emily Davis, Benefits Specialist\n- Michael Wilson, Training Coordinator',
  },
  'finance': {
    name: 'Finance',
    description: '# Finance Department\n\nThe Finance department oversees the financial operations of the company, including accounting, financial planning, and investment decisions.\n\n## Key Responsibilities\n\n- Financial reporting\n- Budgeting and forecasting\n- Cash flow management\n- Tax planning and compliance\n- Risk management\n- Investor relations\n\n## Team Members\n\n- Robert Thompson, CFO\n- Sarah Jackson, Controller\n- David Miller, Financial Analyst\n- Lisa Clark, Accounts Payable Manager',
  },
  'marketing': {
    name: 'Marketing',
    description: '# Marketing Department\n\nThe Marketing department is responsible for promoting the company\'s products or services and building the company\'s brand.\n\n## Key Responsibilities\n\n- Brand management\n- Marketing campaigns\n- Market research\n- Digital marketing\n- Social media management\n- Content creation\n\n## Team Members\n\n- Jessica Brown, Marketing Director\n- Daniel White, Brand Manager\n- Nicole Martinez, Digital Marketing Specialist\n- Kevin Lee, Content Creator',
  },
  'engineering': {
    name: 'Engineering',
    description: '# Engineering Department\n\nThe Engineering department is responsible for designing, developing, and maintaining the company\'s products or services.\n\n## Key Responsibilities\n\n- Product development\n- Quality assurance\n- Technical support\n- Infrastructure management\n- Research and development\n- Technical documentation\n\n## Team Members\n\n- Alex Chen, CTO\n- Samantha Wong, Lead Developer\n- Ryan Patel, QA Manager\n- Jennifer Kim, DevOps Engineer',
  },
  'product': {
    name: 'Product Management',
    description: '# Product Management Department\n\nThe Product Management department is responsible for defining the product vision, strategy, and roadmap.\n\n## Key Responsibilities\n\n- Product strategy\n- Feature prioritization\n- User experience\n- Market analysis\n- Product lifecycle management\n- Cross-functional coordination\n\n## Team Members\n\n- Christopher Taylor, Head of Product\n- Michelle Rodriguez, Senior Product Manager\n- Andrew Wilson, Product Owner\n- Rachel Green, UX Researcher',
  },
  'support': {
    name: 'Customer Support',
    description: '# Customer Support Department\n\nThe Customer Support department is responsible for providing assistance and guidance to customers who are using the company\'s products or services.\n\n## Key Responsibilities\n\n- Technical support\n- Customer inquiries\n- Issue resolution\n- Customer feedback collection\n- Knowledge base management\n- Customer satisfaction monitoring\n\n## Team Members\n\n- Brian Johnson, Customer Support Director\n- Amanda Garcia, Support Team Lead\n- Steven Lewis, Technical Support Specialist\n- Olivia Taylor, Customer Success Manager',
  },
  'sales': {
    name: 'Sales',
    description: '# Sales Department\n\nThe Sales department is responsible for generating revenue by selling the company\'s products or services to customers.\n\n## Key Responsibilities\n\n- Lead generation\n- Sales presentations\n- Contract negotiations\n- Account management\n- Sales forecasting\n- Customer relationship management\n\n## Team Members\n\n- Thomas Wilson, Sales Director\n- Stephanie Harris, Account Executive\n- Jonathan Davis, Sales Development Representative\n- Victoria Lee, Customer Relationship Manager',
  },
  'operations': {
    name: 'Operations',
    description: '# Operations Department\n\nThe Operations department is responsible for ensuring that the company runs efficiently and effectively on a day-to-day basis.\n\n## Key Responsibilities\n\n- Process optimization\n- Supply chain management\n- Facility management\n- Project management\n- Resource allocation\n- Business continuity planning\n\n## Team Members\n\n- Matthew Robinson, Operations Director\n- Laura Phillips, Process Improvement Manager\n- Eric Nguyen, Supply Chain Specialist\n- Karen Smith, Facilities Manager',
  },
};

const DepartmentPage = () => {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  
  const department = deptId && departmentData[deptId as keyof typeof departmentData];
  
  if (!department) {
    return (
      <div className="p-6">
        <h1>Department not found</h1>
        <Button onClick={() => navigate('/')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }
  
  // Simple markdown rendering for demonstration
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    return (
      <div className="markdown">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
          } else if (line === '') {
            return <p key={index} className="my-2"></p>;
          } else {
            return <p key={index} className="mb-2">{line}</p>;
          }
        })}
      </div>
    );
  };
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      
      <Card>
        <CardHeader className="bg-intranet-light">
          <CardTitle>{department.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {renderMarkdown(department.description)}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentPage;
