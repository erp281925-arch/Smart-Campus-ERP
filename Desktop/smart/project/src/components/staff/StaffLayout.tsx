import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import StaffDashboard from './StaffDashboard';
import ClassAnalytics from './ClassAnalytics';
import StaffStudentMonitor from './StaffStudentMonitor';
import StaffReports from './StaffReports';

const StaffLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StaffDashboard onPageChange={setCurrentPage} />;
      case 'cse-k':
        return <ClassAnalytics className="CSE-K" />;
      case 'cse-d':
        return <ClassAnalytics className="CSE-D" />;
      case 'students':
        return <StaffStudentMonitor />;
      case 'reports':
        return <StaffReports />;
      default:
        return <StaffDashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation
        userType="staff"
        userName="STAFF001"
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

export default StaffLayout;