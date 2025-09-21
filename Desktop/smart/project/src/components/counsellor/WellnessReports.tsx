import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, TrendingUp, Users, Calendar } from 'lucide-react';

const WellnessReports: React.FC = () => {
  const monthlyWellnessTrend = [
    { month: 'Jan', avgBRI: 72, sessions: 15, referrals: 8 },
    { month: 'Feb', avgBRI: 68, sessions: 22, referrals: 12 },
    { month: 'Mar', avgBRI: 65, sessions: 28, referrals: 15 },
    { month: 'Apr', avgBRI: 63, sessions: 32, referrals: 18 },
    { month: 'May', avgBRI: 66, sessions: 30, referrals: 14 },
    { month: 'Jun', avgBRI: 69, sessions: 25, referrals: 10 }
  ];

  const interventionOutcomes = [
    { type: 'Stress Management', success: 85, total: 45 },
    { type: 'Academic Support', success: 78, total: 32 },
    { type: 'Social Skills', success: 92, total: 28 },
    { type: 'Anxiety Counselling', success: 88, total: 38 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Wellness Reports</h1>
        <p className="text-gray-600">Comprehensive wellness analytics and reports</p>
      </div>

      {/* Report Actions */}
      <div className="flex justify-end space-x-3 mb-6">
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Custom Date Range
        </Button>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Wellness Trend */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Campus Wellness Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyWellnessTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Line 
                type="monotone" 
                dataKey="avgBRI" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Avg BRI Score"
              />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Sessions Conducted"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Intervention Success */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Intervention Success Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interventionOutcomes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="success" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-blue-600">152</p>
                <p className="text-xs text-gray-500 mt-1">This semester</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">86%</p>
                <p className="text-xs text-gray-500 mt-1">Positive outcomes</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Helped</p>
                <p className="text-3xl font-bold text-purple-600">67</p>
                <p className="text-xs text-gray-500 mt-1">Unique students</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessReports;