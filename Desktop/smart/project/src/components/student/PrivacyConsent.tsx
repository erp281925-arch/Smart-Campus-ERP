import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Check, X, Eye, EyeOff } from 'lucide-react';
import { studentData } from '@/data/mockData';

const PrivacyConsent: React.FC = () => {
  const [dataSharing, setDataSharing] = useState(studentData.dataSharing);
  
  const handleToggleConsent = () => {
    setDataSharing(!dataSharing);
    // In a real app, this would make an API call to update the database
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy & Consent</h1>
        <p className="text-gray-600">You are in control of your data.</p>
      </div>

      {/* Main Privacy Settings */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <CardTitle>Data Sharing with Academic Advisors</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            To help us provide proactive support, you can choose to share your wellness and
            engagement data with your assigned academic advisor. This data will only be used to
            offer timely help and resources.
          </p>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">Data Sharing Status</h3>
                <p className="text-sm text-gray-600">
                  {dataSharing 
                    ? "Your advisor can now view your data to offer better support. You can revoke this consent at any time." 
                    : "Your data is private and not shared with academic advisors."}
                </p>
              </div>
              <div className="ml-6">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  dataSharing 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {dataSharing ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  <span className="font-medium">
                    {dataSharing ? 'Allowed' : 'Denied'}
                  </span>
                </div>
              </div>
            </div>

            {dataSharing && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Thank you! Your advisor can now view your data to offer better support. You can revoke this consent at any time.</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleToggleConsent}
              className={`px-8 py-3 ${
                dataSharing 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {dataSharing ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Revoke Consent
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Grant Consent
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What Data is Shared */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>What Data is Shared</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Academic Performance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Attendance records</li>
                <li>• Assignment submission rates</li>
                <li>• Overall grade trends</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Wellness Indicators</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Burnout Risk Index (BRI) scores</li>
                <li>• Engagement patterns</li>
                <li>• Anonymous feedback sentiment</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Your personal information, grades, and detailed academic records 
              are never shared without explicit permission. Only wellness and engagement metrics are 
              included to help identify when you might need additional support.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Your Rights */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Your Privacy Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Right to Withdraw</h4>
                <p className="text-sm text-gray-600">You can revoke your consent at any time.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Eye className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Data Transparency</h4>
                <p className="text-sm text-gray-600">You can always see what data is being shared.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Control & Choice</h4>
                <p className="text-sm text-gray-600">Your privacy preferences are always respected.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyConsent;