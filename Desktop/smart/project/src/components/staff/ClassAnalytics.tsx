import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, TrendingDown, MessageSquare, Eye, UserX, Phone, Mail, Shield } from 'lucide-react';
import { classData, complaints } from '@/data/mockData';

interface ClassAnalyticsProps {
  className: 'CSE-K' | 'CSE-D';
}

const ClassAnalytics: React.FC<ClassAnalyticsProps> = ({ className }) => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const classInfo = classData[className];

  // Sample sparkline data generator
  const generateSparklineData = (trend: number[]) => {
    return trend.map((value, index) => ({ x: index, y: value }));
  };

  const getStudentRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  const getBriColor = (score: number) => {
    if (score > 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const recentComplaints = complaints.filter(complaint => complaint.class === className);

  const StudentModal: React.FC<{ student: any }> = ({ student }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Student Analysis - {student.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {!student.dataSharing ? (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This student has not granted permission to share their academic data with advisors. 
              Data sharing consent is required to view detailed analytics.
            </p>
          </div>
        ) : (
          <div>
            {/* Student Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <p className={`text-3xl font-bold ${getBriColor(student.briScore)}`}>{student.briScore}</p>
              <p className="text-sm text-gray-600">Current BRI</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{student.riskLevel}</p>
              <p className="text-sm text-gray-600">Risk Level</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-600">Attendance</p>
            </div>
          </Card>
        </div>

        {/* BRI Trend */}
        <Card>
          <CardHeader>
            <CardTitle>BRI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={generateSparklineData(student.trend)}>
                <XAxis dataKey="x" hide />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contributing Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Contributing Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Academic workload', 'Assignment stress', 'Sleep patterns'].map((factor, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{factor}</span>
                  <Badge variant="outline">High Impact</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Notify Counsellor
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Full History
          </Button>
        </div>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{className} Class Analytics</h1>
        <p className="text-gray-600">Detailed wellbeing analysis for {className} students</p>
      </div>

      {/* Class KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class BRI</p>
                <p className={`text-3xl font-bold ${getBriColor(classInfo.avgBri)}`}>{classInfo.avgBri}</p>
                <p className="text-xs text-gray-500 mt-1">Average score</p>
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
                <p className="text-3xl font-bold text-red-600">{classInfo.highRiskCount}</p>
                <p className="text-xs text-gray-500 mt-1">Students</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-3xl font-bold text-green-600">{classInfo.avgAttendance}%</p>
                <p className="text-xs text-gray-500 mt-1">Class average</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Complaints</p>
                <p className="text-3xl font-bold text-blue-600">{classInfo.complaintsCount}</p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BRI Trend Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Class BRI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classInfo.briTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classInfo.riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {classInfo.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4 space-x-6">
              {classInfo.riskDistribution.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                  <span className="text-sm text-gray-600">{entry.risk}: {entry.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Heatmap/Grid */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Student Monitoring Grid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {classInfo.students.map((student) => (
              <Dialog key={student.id}>
                <DialogTrigger asChild>
                  <Card className={`cursor-pointer transition-all hover:shadow-md ${getStudentRiskColor(student.riskLevel)}`}>
                    <CardContent className="p-4">
                      <div className="text-center mb-3">
                        <p className="font-semibold text-sm">{student.id}</p>
                        <p className={`text-2xl font-bold ${getBriColor(student.briScore)}`}>
                          {student.briScore}
                        </p>
                      </div>
                      <div className="h-12">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateSparklineData(student.trend)}>
                            <Line 
                              type="monotone" 
                              dataKey="y" 
                              stroke="#6b7280" 
                              strokeWidth={1}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <Badge variant="outline" className="w-full text-xs mt-2 justify-center">
                        {student.riskLevel} risk
                      </Badge>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <StudentModal student={student} />
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complaint Feed */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Anonymous Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-800">{complaint.text}</p>
                    <p className="text-xs text-gray-500 mt-2">{complaint.timestamp}</p>
                  </div>
                  <Badge className={`ml-4 ${
                    complaint.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    complaint.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {complaint.sentiment}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-700">Immediate Actions</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Schedule wellness check-ins for high-risk students</li>
                <li>• Review course workload distribution</li>
                <li>• Send counsellor referrals for flagged students</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-700">Preventive Measures</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Organize stress management workshops</li>
                <li>• Implement peer support programs</li>
                <li>• Adjust assignment deadlines if possible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassAnalytics;