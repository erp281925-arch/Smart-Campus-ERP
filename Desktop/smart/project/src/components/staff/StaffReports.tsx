import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Users } from 'lucide-react';

const StaffReports: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and export comprehensive reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Weekly Wellness Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Comprehensive analysis of student wellbeing trends</p>
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Class Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Academic and wellness metrics by class</p>
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffReports;