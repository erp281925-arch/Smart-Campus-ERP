import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import StudentDashboard from './StudentDashboard';
import StudentAttendance from './StudentAttendance';
import StudentAssignments from './StudentAssignments';
import StudentTests from './StudentTests';
import StudentGroupChat from './StudentGroupChat';
import StudentFeedback from './StudentFeedback';
import StudentProfile from './StudentProfile';
import PrivacyConsent from './PrivacyConsent';

const StudentLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'attendance':
        return <StudentAttendance />;
      case 'assignments':
        return <StudentAssignments />;
      case 'tests':
        return <StudentTests />;
      case 'chat':
        return <StudentGroupChat />;
      case 'feedback':
        return <StudentFeedback />;
      case 'profile':
        return <StudentProfile />;
      case 'privacy':
        return <PrivacyConsent />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navigation
        userType="student"
        userName="STU001"
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

export default StudentLayout;