import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { studentData } from '@/data/mockData';

const StudentAssignments: React.FC = () => {
  const { assignments } = studentData;

  const getStatusBadge = (assignment: any) => {
    if (assignment.status === 'completed') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    }
    if (assignment.isOverdue) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
  };

  const getStatusIcon = (assignment: any) => {
    if (assignment.status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (assignment.isOverdue) {
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
    return <Clock className="w-5 h-5 text-yellow-600" />;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  const upcomingAssignments = assignments.filter(a => a.status !== 'completed');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignments</h1>
        <p className="text-gray-600">Track your assignment progress and deadlines</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-orange-600">{assignments.length}</p>
                <p className="text-xs text-gray-500 mt-1">Assignments</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{upcomingAssignments.length}</p>
                <p className="text-xs text-gray-500 mt-1">Due soon</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedAssignments.length}</p>
                <p className="text-xs text-gray-500 mt-1">Finished</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Assignments */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(assignment)}
                  <div>
                    <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">{assignment.subject}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {getDaysUntilDue(assignment.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(assignment)}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            {upcomingAssignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <p>All assignments completed! Great job!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Completed Assignments */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Completed Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">{assignment.subject}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      Submitted on {assignment.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                  <Button size="sm" variant="outline">
                    View Grade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Tips */}
      <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📚 Assignment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-700">Time Management</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Start assignments early</li>
                <li>• Break large tasks into smaller ones</li>
                <li>• Use a calendar to track deadlines</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-700">Quality Tips</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Read instructions carefully</li>
                <li>• Review your work before submission</li>
                <li>• Ask for help when needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAssignments;