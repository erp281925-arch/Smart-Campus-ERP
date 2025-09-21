import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const CounsellingSessions: React.FC = () => {
  const sessions = [
    {
      id: '1',
      studentName: 'John Doe',
      date: '2024-09-10',
      time: '10:00 AM',
      duration: '45 mins',
      status: 'completed',
      type: 'Individual',
      notes: 'Good progress on stress management techniques'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      date: '2024-09-10',
      time: '2:00 PM',
      duration: '60 mins',
      status: 'scheduled',
      type: 'Individual',
      notes: 'Follow-up session on anxiety management'
    },
    {
      id: '3',
      studentName: 'Group Session A',
      date: '2024-09-11',
      time: '11:00 AM',
      duration: '90 mins',
      status: 'scheduled',
      type: 'Group',
      notes: 'Stress management workshop'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Counselling Sessions</h1>
        <p className="text-gray-600">Manage and track counselling sessions</p>
      </div>

      {/* Today's Schedule */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.filter(s => s.date === '2024-09-10').map((session) => (
              <div key={session.id} className="p-4 bg-gray-50 rounded-lg border flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{session.studentName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{session.time} • {session.duration}</span>
                      <Badge variant="outline">{session.type}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                    {session.status}
                  </Badge>
                  {session.status === 'scheduled' && (
                    <Button size="sm">Start Session</Button>
                  )}
                  {session.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.filter(s => s.date !== '2024-09-10').map((session) => (
              <div key={session.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{session.studentName}</h3>
                  <Badge variant="outline">{session.type}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                  <span>• {session.duration}</span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{session.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellingSessions;