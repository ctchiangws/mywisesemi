
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const documentData = {
  'financial-report': {
    name: 'Q1 Financial Report',
    type: 'spreadsheet',
    lastUpdated: '2025-03-31',
    author: 'Robert Thompson',
    content: '# Q1 Financial Report\n\n## Executive Summary\n\nThis report provides a comprehensive overview of our financial performance for Q1 2025. Overall, the company has exceeded revenue targets while maintaining expenses below budget.\n\n## Key Metrics\n\n- Revenue: $4.2M (15% above target)\n- Expenses: $2.8M (5% below budget)\n- Gross Margin: 33.3%\n- Net Profit: $1.4M\n\n## Department Breakdown\n\n- Sales: $2.1M (exceeded target by 20%)\n- Marketing: $1.5M (exceeded target by 10%)\n- Services: $0.6M (met target)\n\n## Recommendations\n\n- Increase investment in Sales team given strong performance\n- Review Marketing campaign effectiveness to optimize spending\n- Consider expansion into new markets given strong financial position',
  },
  'brand-guidelines': {
    name: 'Brand Guidelines 2025',
    type: 'document',
    lastUpdated: '2025-01-15',
    author: 'Jessica Brown',
    content: '# Brand Guidelines 2025\n\n## Overview\n\nThese brand guidelines provide the standards for our company\'s visual identity and messaging. Adhering to these guidelines ensures consistency across all communications.\n\n## Logo Usage\n\n- Maintain clear space around the logo equal to the height of the logo mark\n- Minimum size: 1 inch / 25mm width for print, 72px for digital\n- Do not stretch, distort, or alter the colors of the logo\n- Prefer using the logo on white or light backgrounds\n\n## Color Palette\n\n- Primary: #9b87f5 (Purple)\n- Secondary: #6E59A5 (Dark Purple)\n- Accent: #E5DEFF (Light Purple)\n- Neutral: #333333 (Dark Gray)\n\n## Typography\n\n- Headings: Montserrat Bold\n- Body: Open Sans Regular\n- Digital UI: Inter',
  },
  'employee-handbook': {
    name: 'Employee Handbook',
    type: 'document',
    lastUpdated: '2025-02-10',
    author: 'Jane Smith',
    content: '# Employee Handbook\n\n## Welcome\n\nWelcome to our company! This handbook is designed to provide you with information about our policies, procedures, and benefits.\n\n## Company Policies\n\n- Work Hours: 9:00 AM - 5:00 PM, Monday to Friday\n- Remote Work: Flexible remote work options available\n- Time Off: 20 days of paid vacation annually, plus public holidays\n- Sick Leave: 10 days of paid sick leave annually\n\n## Benefits\n\n- Health Insurance: Comprehensive medical, dental, and vision coverage\n- Retirement: 401(k) with company matching up to 5%\n- Professional Development: Annual budget of $2,000 for courses and conferences\n- Wellness Program: Gym membership subsidy and mental health resources',
  },
  'product-roadmap': {
    name: 'Product Roadmap',
    type: 'document',
    lastUpdated: '2025-03-15',
    author: 'Christopher Taylor',
    content: '# Product Roadmap 2025\n\n## Q2 2025\n\n- Launch mobile application v2.0\n- Implement AI-powered recommendation engine\n- Redesign user dashboard for improved UX\n- Integrate with third-party analytics platforms\n\n## Q3 2025\n\n- Develop advanced reporting features\n- Implement real-time collaboration tools\n- Enhance security features with two-factor authentication\n- Optimize performance for large data sets\n\n## Q4 2025\n\n- Launch enterprise version with dedicated support\n- Develop custom API for enterprise clients\n- Implement advanced access control features\n- Add internationalization support for European markets\n\n## Q1 2026\n\n- Explore expansion into Asian markets\n- Develop native desktop application\n- Implement blockchain-based document verification\n- Launch premium subscription tier',
  },
  'marketing-assets': {
    name: 'Marketing Assets',
    type: 'image',
    lastUpdated: '2025-03-20',
    author: 'Daniel White',
    content: '# Marketing Assets Collection\n\n## Overview\n\nThis collection contains all approved marketing assets for campaigns in 2025. All assets follow our brand guidelines and are optimized for various platforms.\n\n## Social Media Assets\n\n- Instagram post templates\n- Facebook cover images\n- Twitter header images\n- LinkedIn article graphics\n\n## Email Marketing\n\n- Newsletter templates\n- Promotional email headers\n- Product announcement templates\n- Event invitation designs\n\n## Print Materials\n\n- Brochure templates\n- Business card designs\n- Trade show banner designs\n- Product catalog layouts',
  },
  'project-template': {
    name: 'Project Proposal Template',
    type: 'document',
    lastUpdated: '2025-01-30',
    author: 'Matthew Robinson',
    content: '# Project Proposal Template\n\n## Executive Summary\n\n[Brief overview of the project and its value to the organization]\n\n## Project Objectives\n\n- [Objective 1]\n- [Objective 2]\n- [Objective 3]\n\n## Scope\n\n[Define what is included and excluded from the project]\n\n## Timeline\n\n- Planning Phase: [Start Date] - [End Date]\n- Development Phase: [Start Date] - [End Date]\n- Testing Phase: [Start Date] - [End Date]\n- Deployment Phase: [Start Date] - [End Date]\n\n## Budget\n\n[Detailed breakdown of estimated costs]\n\n## Resources\n\n[List of team members, equipment, and other resources needed]\n\n## Success Criteria\n\n[Measurable criteria that will be used to determine project success]\n\n## Risk Assessment\n\n[Identification of potential risks and mitigation strategies]',
  },
};

const DocumentPage = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  
  const document = docId && documentData[docId as keyof typeof documentData];
  
  if (!document) {
    return (
      <div className="p-6">
        <h1>Document not found</h1>
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
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{document.name}</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Last updated: {document.lastUpdated} • Author: {document.author}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderMarkdown(document.content)}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentPage;
