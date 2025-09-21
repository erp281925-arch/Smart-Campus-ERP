import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Users, AlertTriangle, TrendingUp, Phone, Mail, Eye, Shield } from 'lucide-react';
import { classData } from '@/data/mockData';

const StaffStudentMonitor: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Combine students from both classes
  const allStudents = [
    ...classData['CSE-K'].students.map(s => ({ ...s, class: 'CSE-K' })),
    ...classData['CSE-D'].students.map(s => ({ ...s, class: 'CSE-D' }))
  ];

  // Filter students based on search and filters
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesRisk = filterRisk === 'all' || student.riskLevel === filterRisk;
    return matchesSearch && matchesClass && matchesRisk;
  });

  const getBriColor = (score: number) => {
    if (score > 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getGradientBackground = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
      case 'medium': return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
      default: return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
    }
  };

  const highRiskStudents = filteredStudents.filter(s => s.riskLevel === 'high');
  const mediumRiskStudents = filteredStudents.filter(s => s.riskLevel === 'medium');
  const lowRiskStudents = filteredStudents.filter(s => s.riskLevel === 'low');

  const StudentDetailModal: React.FC<{ student: any }> = ({ student }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Student Details - {student.id}</DialogTitle>
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
            <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className={`text-2xl font-bold ${getBriColor(student.briScore)}`}>{student.briScore}</p>
            <p className="text-sm text-gray-600">BRI Score</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{student.class}</p>
            <p className="text-sm text-gray-600">Class</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Badge className={getRiskBadgeColor(student.riskLevel)}>
              {student.riskLevel.toUpperCase()} RISK
            </Badge>
            <p className="text-sm text-gray-600 mt-1">Risk Level</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Risk Factors</h4>
          <div className="space-y-2">
            {['Academic stress', 'Assignment overload', 'Social isolation'].map((factor, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{factor}</span>
                <Badge variant="outline">High Impact</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Notify Counsellor
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Contact Student
          </Button>
          <Button variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Full Profile
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Monitoring</h1>
        <p className="text-gray-600">Monitor and manage student wellbeing across all classes</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{allStudents.length}</p>
                <p className="text-xs text-gray-500 mt-1">All classes</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-3xl font-bold text-red-600">{highRiskStudents.length}</p>
                <p className="text-xs text-gray-500 mt-1">Immediate attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medium Risk</p>
                <p className="text-3xl font-bold text-yellow-600">{mediumRiskStudents.length}</p>
                <p className="text-xs text-gray-500 mt-1">Monitor closely</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Risk</p>
                <p className="text-3xl font-bold text-green-600">{lowRiskStudents.length}</p>
                <p className="text-xs text-gray-500 mt-1">Doing well</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="CSE-K">CSE-K</SelectItem>
                <SelectItem value="CSE-D">CSE-D</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterClass('all');
              setFilterRisk('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* High Risk Students - Priority Section */}
      {highRiskStudents.length > 0 && (
        <Card className="dashboard-card bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              High Risk Students - Immediate Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highRiskStudents.map((student) => (
                <Dialog key={student.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white border-red-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{student.id}</h3>
                          <Badge className="bg-red-100 text-red-800 text-xs">HIGH RISK</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">BRI:</span>
                            <span className={`ml-1 font-bold ${getBriColor(student.briScore)}`}>
                              {student.briScore}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Class:</span>
                            <span className="ml-1 font-medium">{student.class}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" className="text-xs h-7 bg-red-600 hover:bg-red-700">
                            Alert Counsellor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <StudentDetailModal student={student} />
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Students Grid */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>
            All Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStudents.map((student) => (
              <Dialog key={student.id}>
                <DialogTrigger asChild>
                  <Card className={`cursor-pointer hover:shadow-md transition-shadow ${getGradientBackground(student.riskLevel)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{student.id}</h3>
                        <Badge className={getRiskBadgeColor(student.riskLevel)}>
                          {student.riskLevel}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">BRI Score:</span>
                          <span className={`font-bold ${getBriColor(student.briScore)}`}>
                            {student.briScore}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Class:</span>
                          <span className="font-medium text-sm">{student.class}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Button size="sm" variant="outline" className="w-full text-xs">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <StudentDetailModal student={student} />
              </Dialog>
            ))}
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No students found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Bulk Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center space-y-1">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Send All High-Risk to Counsellor</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Mail className="w-5 h-5" />
              <span className="text-sm">Email Wellness Survey</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffStudentMonitor;