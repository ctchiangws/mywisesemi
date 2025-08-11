
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DocumentPage = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>('');
  
  useEffect(() => {
    const loadDocument = async () => {
      if (!docId) return;
      
      setLoading(true);
      
      try {
        let filePath = '';
        let documentTitle = '';
        
        // Determine the correct file path based on the document ID
        if (docId === 'employee-activities') {
          filePath = '/data/life/employee-activities.md';
          documentTitle = 'Employee Activities / 員工活動';
        } else if (docId === 'company-dining') {
          filePath = '/data/life/company-dining.md';
          documentTitle = 'Company Dining / 公司聚餐';
        } else if (docId === 'team-building') {
          filePath = '/data/life/team-building.md';
          documentTitle = 'Team Building / 團隊建設';
        } else if (docId === 'work-life-balance') {
          filePath = '/data/life/work-life-balance.md';
          documentTitle = 'Work Life Balance / 工作生活平衡';
        } else if (docId === 'photo-gallery') {
          filePath = '/data/life/photo-gallery.md';
          documentTitle = 'Photo Gallery / 員工相簿';
        } else {
          // For other documents, try the documents folder
          filePath = `/data/documents/${docId}.md`;
          documentTitle = docId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load document: ${docId}`);
        }
        const markdownContent = await response.text();
        
        setContent(markdownContent);
        setTitle(documentTitle);
      } catch (error) {
        console.error('Error loading document:', error);
        setContent('# Document Not Found\n\nThe requested document could not be loaded.');
        setTitle('Document Not Found');
      }
      
      setLoading(false);
    };
    
    loadDocument();
  }, [docId]);
  
  if (!docId) {
    return (
      <div className="p-6">
        <h1>Document not found</h1>
        <Button onClick={() => navigate('/')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }
  
  // Custom components for ReactMarkdown
  const components = {
    // Custom image component to handle relative paths
    img: ({ src, alt, ...props }: any) => {
      let imagePath = src;
      
      // Handle relative paths starting with ./
      if (imagePath?.startsWith('./')) {
        imagePath = `/data/documents/${imagePath.substring(2)}`;
      }
      
      return (
        <div className="my-4">
          <img 
            src={imagePath} 
            alt={alt} 
            className="max-w-full h-auto rounded-lg shadow-md"
            onError={(e) => {
              console.error(`Failed to load image: ${imagePath}`);
              e.currentTarget.style.display = 'none';
            }}
            {...props}
          />
        </div>
      );
    },
    // Custom code block component with syntax highlighting
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    // Styled components for other elements
    h1: ({ children, ...props }: any) => (
      <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-xl font-semibold mt-6 mb-3" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-lg font-semibold mt-4 mb-2" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-3 leading-relaxed" {...props}>{children}</p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="ml-2" {...props}>{children}</li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props}>{children}</blockquote>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-gray-300 px-4 py-2" {...props}>{children}</td>
    ),
    a: ({ children, href, ...props }: any) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline" {...props}>
        {children}
      </a>
    ),
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-32"></div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{title}</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Document ID: {docId}
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
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentPage;
