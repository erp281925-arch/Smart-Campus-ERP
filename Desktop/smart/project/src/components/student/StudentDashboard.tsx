import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, CheckCircle, AlertCircle, Smile } from 'lucide-react';
import { studentData } from '@/data/mockData';

const StudentDashboard: React.FC = () => {
  const { briScore, attendance, avgMarks, assignmentsOnTime, sentiment, briHistory, attendanceData } = studentData;

  const getBriColor = (score: number) => {
    if (score > 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBriGradient = (score: number) => {
    if (score < 40) return 'from-red-500 to-red-600';
    if (score <= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-green-600" />;
      case 'neutral': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'negative': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Monitor your academic well-being and performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* BRI Score */}
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">BRI Score</p>
                <p className={`text-3xl font-bold ${getBriColor(briScore)}`}>{briScore}</p>
                <p className="text-xs text-gray-500 mt-1">Burnout Risk Index</p>
              </div>
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBriGradient(briScore)} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{briScore}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-3xl font-bold text-green-600">{attendance}%</p>
                <p className="text-xs text-gray-500 mt-1">Present days</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Average Marks */}
        <Card className="kpi-card bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Marks</p>
                <p className="text-3xl font-bold text-purple-600">{avgMarks}%</p>
                <p className="text-xs text-gray-500 mt-1">Overall average</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Assignments On-Time */}
        <Card className="kpi-card bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time</p>
                <p className="text-3xl font-bold text-orange-600">{assignmentsOnTime}%</p>
                <p className="text-xs text-gray-500 mt-1">Assignments</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        {/* Latest Sentiment */}
        <Card className="kpi-card bg-gradient-to-br from-white to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sentiment</p>
                <p className="text-lg font-bold text-gray-700 capitalize">{sentiment}</p>
                <p className="text-xs text-gray-500 mt-1">Latest mood</p>
              </div>
              {getSentimentIcon(sentiment)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BRI Trend Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Burnout Risk Index Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={briHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Attendance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4 space-x-6">
              {attendanceData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                  <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
              <h3 className="font-semibold text-blue-800">View Detailed Analysis</h3>
              <p className="text-sm text-blue-600 mt-1">See comprehensive BRI breakdown</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
              <h3 className="font-semibold text-green-800">Submit Feedback</h3>
              <p className="text-sm text-green-600 mt-1">Share your thoughts anonymously</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
              <h3 className="font-semibold text-purple-800">Join Group Chat</h3>
              <p className="text-sm text-purple-600 mt-1">Connect with your classmates</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentData.subjectMarks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Bar dataKey="marks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;