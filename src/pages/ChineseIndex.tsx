
import React from 'react';
import Header from '@/components/Header';
import DepartmentsList from '@/components/DepartmentsList';
import ProjectsList from '@/components/ProjectsList';
import Announcements from '@/components/Announcements';
import EventCalendar from '@/components/EventCalendar';
import SharedDocuments from '@/components/SharedDocuments';
import TopCalendar from '@/components/TopCalendar';
import ISODocuments from '@/components/ISODocuments';
import LifeInWisesemi from '@/components/LifeInWisesemi';
import DailyTools from '@/components/DailyTools';
import { useLanguage } from '@/contexts/LanguageContext';

const ChineseIndex = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Departments, ISO 9001, Life in Wisesemi */}
          <div className="flex flex-col space-y-6">
            <DepartmentsList />
            <ISODocuments />
            <LifeInWisesemi />
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
          
          {/* Right Column - Calendar, Daily Tools and Shared Documents */}
          <div className="flex flex-col space-y-6">
            <div>
              <TopCalendar />
            </div>
            <div>
              <DailyTools />
            </div>
            <div className="flex-1">
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
