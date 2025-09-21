import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Users, AlertTriangle, Calendar, TrendingUp, Heart, Clock } from 'lucide-react';
import { counsellorReferrals } from '@/data/mockData';

const CounsellorDashboard: React.FC = () => {
  const activeReferrals = counsellorReferrals.filter(r => r.status === 'active');
  const totalSessions = 24;
  const completedSessions = 18;

  const weeklySessionData = [
    { week: 'Week 1', sessions: 6, newReferrals: 2 },
    { week: 'Week 2', sessions: 8, newReferrals: 1 },
    { week: 'Week 3', sessions: 5, newReferrals: 3 },
    { week: 'Week 4', sessions: 7, newReferrals: 2 }
  ];

  const riskLevelData = [
    { name: 'Critical Risk', value: 3, fill: '#ef4444' },
    { name: 'High Risk', value: 8, fill: '#f59e0b' },
    { name: 'Moderate Risk', value: 15, fill: '#3b82f6' },
    { name: 'Improving', value: 6, fill: '#22c55e' }
  ];

  const sessionOutcomes = [
    { outcome: 'Significant Improvement', count: 8 },
    { outcome: 'Moderate Improvement', count: 12 },
    { outcome: 'Stable', count: 3 },
    { outcome: 'Ongoing Support', count: 9 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Counsellor Dashboard</h1>
        <p className="text-gray-600">Student wellness management and counselling overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Referrals</p>
                <p className="text-3xl font-bold text-red-600">{activeReferrals.length}</p>
                <p className="text-xs text-gray-500 mt-1">Requiring attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-blue-600">{totalSessions}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
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
                <p className="text-3xl font-bold text-green-600">85%</p>
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
                <p className="text-sm font-medium text-gray-600">Avg Session Length</p>
                <p className="text-3xl font-bold text-purple-600">45m</p>
                <p className="text-xs text-gray-500 mt-1">Per session</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Sessions */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Weekly Session Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Sessions"
                />
                <Line 
                  type="monotone" 
                  dataKey="newReferrals" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="New Referrals"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Level Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Student Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskLevelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {riskLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent High-Priority Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {counsellorReferrals.slice(0, 3).map((referral) => (
              <div key={referral.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{referral.realName}</h3>
                      <p className="text-sm text-gray-600">BRI Score: {referral.briScore}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={referral.status === 'active' ? 'destructive' : 'secondary'}>
                      {referral.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{referral.referredDate}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{referral.notes}</p>
                <div className="flex flex-wrap gap-1">
                  {referral.riskFactors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Outcomes */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Session Outcomes (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sessionOutcomes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="outcome" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellorDashboard;