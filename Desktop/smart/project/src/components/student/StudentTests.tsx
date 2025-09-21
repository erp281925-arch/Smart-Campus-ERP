import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { BookOpen, Calendar, Clock, TrendingUp, Target } from 'lucide-react';
import { studentData } from '@/data/mockData';

const StudentTests: React.FC = () => {
  const [activeTab, setActiveTab] = useState('marks');

  const testMarks = [
    { subject: 'Mathematics', midterm: 85, final: 88, average: 86.5 },
    { subject: 'Physics', midterm: 78, final: 82, average: 80 },
    { subject: 'Chemistry', midterm: 82, final: 85, average: 83.5 },
    { subject: 'English', midterm: 75, final: 78, average: 76.5 },
    { subject: 'Computer Science', midterm: 90, final: 92, average: 91 }
  ];

  const upcomingTests = [
    {
      id: '1',
      subject: 'Mathematics',
      type: 'Unit Test',
      date: '2024-09-15',
      time: '10:00 AM',
      duration: '2 hours',
      topics: ['Derivatives', 'Integration', 'Limits']
    },
    {
      id: '2',
      subject: 'Physics',
      type: 'Lab Test',
      date: '2024-09-18',
      time: '2:00 PM',
      duration: '1.5 hours',
      topics: ['Optics', 'Wave Motion']
    },
    {
      id: '3',
      subject: 'Chemistry',
      type: 'Monthly Test',
      date: '2024-09-22',
      time: '9:00 AM',
      duration: '2 hours',
      topics: ['Organic Chemistry', 'Reaction Mechanisms']
    }
  ];

  const chartData = testMarks.map(subject => ({
    subject: subject.subject.substring(0, 8),
    midterm: subject.midterm,
    final: subject.final
  }));

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">A+</Badge>;
    if (score >= 80) return <Badge className="bg-blue-100 text-blue-800">A</Badge>;
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">B</Badge>;
    return <Badge className="bg-red-100 text-red-800">C</Badge>;
  };

  const getDaysUntilTest = (testDate: string) => {
    const test = new Date(testDate);
    const today = new Date();
    const diffTime = test.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  const averageScore = testMarks.reduce((acc, subject) => acc + subject.average, 0) / testMarks.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tests & Examinations</h1>
        <p className="text-gray-600">View your test performance and upcoming examinations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className={`text-3xl font-bold ${getGradeColor(averageScore)}`}>
                  {averageScore.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Overall performance</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Subject</p>
                <p className="text-lg font-bold text-green-600">CS</p>
                <p className="text-xs text-gray-500 mt-1">91% average</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tests Taken</p>
                <p className="text-3xl font-bold text-purple-600">{testMarks.length * 2}</p>
                <p className="text-xs text-gray-500 mt-1">This semester</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-3xl font-bold text-orange-600">{upcomingTests.length}</p>
                <p className="text-xs text-gray-500 mt-1">Tests scheduled</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marks" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Test Marks
          </TabsTrigger>
          <TabsTrigger value="portal" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Test Portal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marks" className="space-y-6">
          {/* Performance Chart */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="subject" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Bar dataKey="midterm" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Midterm" />
                  <Bar dataKey="final" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Final" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Marks Table */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Detailed Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testMarks.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">
                          Midterm: {subject.midterm}% | Final: {subject.final}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getGradeColor(subject.average)}`}>
                          {subject.average}%
                        </p>
                        <p className="text-xs text-gray-500">Average</p>
                      </div>
                      {getGradeBadge(subject.average)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portal" className="space-y-6">
          {/* Upcoming Tests */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Upcoming Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{test.subject}</h3>
                          <p className="text-blue-600 font-medium">{test.type}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{test.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{test.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{test.duration}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Topics:</p>
                          <div className="flex flex-wrap gap-2">
                            {test.topics.map((topic, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className="bg-orange-100 text-orange-800 mb-2">
                          {getDaysUntilTest(test.date)}
                        </Badge>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            Study Guide
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card className="dashboard-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">📖 Study Tips for Success</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-700">Preparation</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Review notes regularly</li>
                    <li>• Practice past papers</li>
                    <li>• Create study schedules</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-700">Test Day</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Get adequate sleep</li>
                    <li>• Arrive early</li>
                    <li>• Read questions carefully</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentTests;