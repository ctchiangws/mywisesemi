
import React from 'react';
import Header from '@/components/Header';
import DepartmentsList from '@/components/DepartmentsList';
import Announcements from '@/components/Announcements';
import EventCalendar from '@/components/EventCalendar';
import SharedDocuments from '@/components/SharedDocuments';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Departments */}
          <div className="h-full">
            <DepartmentsList />
          </div>
          
          {/* Middle Column - Announcements and Calendar */}
          <div className="flex flex-col space-y-6">
            <div className="flex-1">
              <Announcements />
            </div>
            <div className="flex-1">
              <EventCalendar />
            </div>
          </div>
          
          {/* Right Column - Shared Documents */}
          <div className="h-full">
            <SharedDocuments />
          </div>
        </div>
      </main>
      
      <footer className="bg-intranet-dark text-white p-4 text-center text-sm">
        <p>© 2025 Company Intranet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
