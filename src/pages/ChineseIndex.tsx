
import React from 'react';
import Header from '@/components/Header';
import DepartmentsList from '@/components/DepartmentsList';
import ProjectsList from '@/components/ProjectsList';
import Announcements from '@/components/Announcements';
import EventCalendar from '@/components/EventCalendar';
import SharedDocuments from '@/components/SharedDocuments';
import TopCalendar from '@/components/TopCalendar';
import ISODocuments from '@/components/ISODocuments';
import DailyTools from '@/components/DailyTools';
import { useLanguage } from '@/contexts/LanguageContext';

const ChineseIndex = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Departments, Project Management & ISO 9001 */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">部門列表</h2>
              <DepartmentsList />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">專案管理</h2>
              <ProjectsList />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">ISO 9001</h2>
              <ISODocuments />
            </div>
          </div>
          
          {/* Middle Column - Announcements and Calendar */}
          <div className="flex flex-col space-y-6">
            <div className="flex-1 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">公告</h2>
              <Announcements />
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">活動日曆</h2>
              <EventCalendar />
            </div>
          </div>
          
          {/* Right Column - Calendar, Daily Tools and Shared Documents */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">重要日期</h2>
              <TopCalendar />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">日常工具</h2>
              <DailyTools />
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-wisesemi-dark mb-4">共享文件</h2>
              <SharedDocuments />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-wisesemi-dark text-white p-4 text-center text-sm">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default ChineseIndex;
