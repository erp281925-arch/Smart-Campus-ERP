import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, AlertTriangle, Calendar, TrendingDown, ArrowRight, Eye } from 'lucide-react';
import { classData } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface StaffDashboardProps {
  onPageChange: (page: string) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ onPageChange }) => {
  const cseKData = classData['CSE-K'];
  const cseDData = classData['CSE-D'];

  const overallStats = {
    totalStudents: cseKData.totalStudents + cseDData.totalStudents,
    avgBri: Math.round((cseKData.avgBri + cseDData.avgBri) / 2),
    totalHighRisk: cseKData.highRiskCount + cseDData.highRiskCount,
    avgAttendance: Math.round((cseKData.avgAttendance + cseDData.avgAttendance) / 2)
  };

  const classComparison = [
    {
      class: 'CSE-K',
      bri: cseKData.avgBri,
      attendance: cseKData.avgAttendance,
      highRisk: cseKData.highRiskCount
    },
    {
      class: 'CSE-D',
      bri: cseDData.avgBri,
      attendance: cseDData.avgAttendance,
      highRisk: cseDData.highRiskCount
    }
  ];

  const weeklyTrend = [
    { week: 'Week 1', cseK: 72, cseD: 78 },
    { week: 'Week 2', cseK: 70, cseD: 76 },
    { week: 'Week 3', cseK: 68, cseD: 75 },
    { week: 'Week 4', cseK: 65, cseD: 73 },
    { week: 'Week 5', cseK: 68, cseD: 75 }
  ];

  const handleClassClick = (className: string) => {
    onPageChange(className.toLowerCase());
  };

  const getBriColor = (score: number) => {
    if (score > 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevelColor = (count: number) => {
    if (count <= 2) return 'text-green-600';
    if (count <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Staff Dashboard</h1>
        <p className="text-gray-600">Monitor student wellbeing across CSE-K and CSE-D classes</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{overallStats.totalStudents}</p>
                <p className="text-xs text-gray-500 mt-1">Both classes</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg BRI</p>
                <p className={`text-3xl font-bold ${getBriColor(overallStats.avgBri)}`}>
                  {overallStats.avgBri}
                </p>
                <p className="text-xs text-gray-500 mt-1">Burnout risk</p>
              </div>
              <TrendingDown className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className={`text-3xl font-bold ${getRiskLevelColor(overallStats.totalHighRisk)}`}>
                  {overallStats.totalHighRisk}
                </p>
                <p className="text-xs text-gray-500 mt-1">Students at risk</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-3xl font-bold text-green-600">{overallStats.avgAttendance}%</p>
                <p className="text-xs text-gray-500 mt-1">Class average</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CSE-K Class Card */}
        <Card className="dashboard-card hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleClassClick('CSE-K')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">CSE-K Class Overview</CardTitle>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${getBriColor(cseKData.avgBri)}`}>{cseKData.avgBri}</p>
                <p className="text-xs text-gray-500">Avg BRI</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${getRiskLevelColor(cseKData.highRiskCount)}`}>{cseKData.highRiskCount}</p>
                <p className="text-xs text-gray-500">High Risk</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{cseKData.avgAttendance}%</p>
                <p className="text-xs text-gray-500">Attendance</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Students:</span>
                <span className="font-medium">{cseKData.totalStudents}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Recent Complaints:</span>
                <span className="font-medium">{cseKData.complaintsCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSE-D Class Card */}
        <Card className="dashboard-card hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleClassClick('CSE-D')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">CSE-D Class Overview</CardTitle>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${getBriColor(cseDData.avgBri)}`}>{cseDData.avgBri}</p>
                <p className="text-xs text-gray-500">Avg BRI</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${getRiskLevelColor(cseDData.highRiskCount)}`}>{cseDData.highRiskCount}</p>
                <p className="text-xs text-gray-500">High Risk</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{cseDData.avgAttendance}%</p>
                <p className="text-xs text-gray-500">Attendance</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Students:</span>
                <span className="font-medium">{cseDData.totalStudents}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Recent Complaints:</span>
                <span className="font-medium">{cseDData.complaintsCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class Comparison Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Class Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="class" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Bar dataKey="bri" fill="#f59e0b" radius={[4, 4, 0, 0]} name="BRI Score" />
                <Bar dataKey="attendance" fill="#22c55e" radius={[4, 4, 0, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly BRI Trend */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Weekly BRI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Line 
                  type="monotone" 
                  dataKey="cseK" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="CSE-K"
                />
                <Line 
                  type="monotone" 
                  dataKey="cseD" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="CSE-D"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onPageChange('students')}
            >
              <Eye className="w-6 h-6" />
              <span>View All Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onPageChange('reports')}
            >
              <TrendingDown className="w-6 h-6" />
              <span>Generate Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onPageChange('cse-k')}
            >
              <Users className="w-6 h-6" />
              <span>CSE-K Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onPageChange('cse-d')}
            >
              <Users className="w-6 h-6" />
              <span>CSE-D Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card className="dashboard-card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Attention Required</h3>
              <p className="text-yellow-700 mt-1">
                CSE-K class showing increased BRI scores this week. Consider scheduling wellness check-ins.
              </p>
              <Button size="sm" className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;