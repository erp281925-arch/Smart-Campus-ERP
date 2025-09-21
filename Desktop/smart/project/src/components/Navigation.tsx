import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';

interface NavigationProps {
  userType: 'student' | 'staff' | 'admin' | 'counsellor';
  userName: string;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ userType, userName, currentPage, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    switch (userType) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'attendance', label: 'Attendance' },
          { id: 'assignments', label: 'Assignments' },
          { id: 'tests', label: 'Tests' },
          { id: 'chat', label: 'Group Chat' },
          { id: 'feedback', label: 'Feedback' },
          { id: 'profile', label: 'Profile' }
        ];
      case 'staff':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'cse-k', label: 'CSE-K Analytics' },
          { id: 'cse-d', label: 'CSE-D Analytics' },
          { id: 'students', label: 'Student Monitor' },
          { id: 'reports', label: 'Reports' }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'students', label: 'Student Management' },
          { id: 'staff', label: 'Staff Management' },
          { id: 'settings', label: 'System Settings' },
          { id: 'reports', label: 'Reports' }
        ];
      case 'counsellor':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'referrals', label: 'Student Referrals' },
          { id: 'sessions', label: 'Counselling Sessions' },
          { id: 'reports', label: 'Wellness Reports' }
        ];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = getMenuItems();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">ERP</span>
              <span className="ml-1 text-sm text-gray-500 capitalize">{userType}</span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-gray-700">
              Welcome, <span className="font-medium">{userName}</span>
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;