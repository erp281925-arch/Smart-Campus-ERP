import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import CounsellorDashboard from './CounsellorDashboard';
import StudentReferrals from './StudentReferrals';
import CounsellingSessions from './CounsellingSessions';
import WellnessReports from './WellnessReports';

const CounsellorLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <CounsellorDashboard />;
      case 'referrals':
        return <StudentReferrals />;
      case 'sessions':
        return <CounsellingSessions />;
      case 'reports':
        return <WellnessReports />;
      default:
        return <CounsellorDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation
        userType="counsellor"
        userName="COUNS001"
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>

      <ChatBot />
    </div>
  );
};

export default CounsellorLayout;