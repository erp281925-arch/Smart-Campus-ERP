import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { User, AlertTriangle, FileText, Calendar } from 'lucide-react';
import { counsellorReferrals } from '@/data/mockData';

const StudentReferrals: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [notes, setNotes] = useState('');

  const mockStudentDetails = {
    briHistory: [
      { month: 'Jan', score: 65 },
      { month: 'Feb', score: 58 },
      { month: 'Mar', score: 45 },
      { month: 'Apr', score: 38 },
      { month: 'May', score: 42 },
      { month: 'Jun', score: 45 }
    ],
    attendance: 65,
    avgMarks: 68,
    assignments: 70
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Referrals</h1>
        <p className="text-gray-600">Manage referred students requiring counselling support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Referrals List */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Active Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counsellorReferrals.map((referral) => (
                  <div key={referral.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
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
                    
                    <p className="text-sm text-gray-700 mb-3">{referral.notes}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {referral.riskFactors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedStudent(referral)}
                          >
                            View Full Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{referral.realName} - Detailed Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* BRI Chart */}
                            <Card>
                              <CardHeader>
                                <CardTitle>BRI Trend</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ResponsiveContainer width="100%" height={200}>
                                  <LineChart data={mockStudentDetails.briHistory}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={2} />
                                  </LineChart>
                                </ResponsiveContainer>
                              </CardContent>
                            </Card>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                              <Card>
                                <CardContent className="p-4 text-center">
                                  <p className="text-2xl font-bold text-red-600">{mockStudentDetails.attendance}%</p>
                                  <p className="text-sm text-gray-600">Attendance</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-4 text-center">
                                  <p className="text-2xl font-bold text-yellow-600">{mockStudentDetails.avgMarks}%</p>
                                  <p className="text-sm text-gray-600">Avg Marks</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-4 text-center">
                                  <p className="text-2xl font-bold text-orange-600">{mockStudentDetails.assignments}%</p>
                                  <p className="text-sm text-gray-600">Assignments</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button size="sm" variant="outline">
                        Schedule Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New Session
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Support
              </Button>
            </CardContent>
          </Card>

          {/* Session Notes */}
          <Card className="dashboard-card mt-6">
            <CardHeader>
              <CardTitle>Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about the session..."
                className="min-h-32"
              />
              <Button className="w-full mt-3">Save Notes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentReferrals;