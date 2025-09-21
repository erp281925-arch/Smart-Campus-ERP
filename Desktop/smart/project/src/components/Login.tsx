import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Shield, Heart } from 'lucide-react';

interface LoginFormData {
  email?: string;
  rollNo?: string;
  password: string;
  class?: string;
}

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'staff' | 'admin' | 'counsellor'>('student');
  const [formData, setFormData] = useState<LoginFormData>({ password: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (userType === 'student' && (!formData.rollNo || !formData.class)) {
      alert('Please fill all student fields');
      return;
    }
    if (userType !== 'student' && !formData.email) {
      alert('Please enter email');
      return;
    }
    if (!formData.password) {
      alert('Please enter password');
      return;
    }

    // Navigate to appropriate dashboard
    navigate(`/${userType}`);
  };

  const userTypeConfig = {
    student: { icon: GraduationCap, title: 'Student Login', color: 'text-blue-600' },
    staff: { icon: Users, title: 'Staff Login', color: 'text-green-600' },
    admin: { icon: Shield, title: 'Admin Login', color: 'text-purple-600' },
    counsellor: { icon: Heart, title: 'Counsellor Login', color: 'text-pink-600' }
  };

  const currentConfig = userTypeConfig[userType];
  const IconComponent = currentConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="text-center text-white">
          <GraduationCap className="w-32 h-32 mx-auto mb-8 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Smart Campus ERP</h1>
          <p className="text-xl text-blue-100 max-w-md">
            Empowering education through intelligent analytics and student well-being monitoring
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <IconComponent className={`w-16 h-16 mx-auto mb-4 ${currentConfig.color}`} />
              <h2 className="text-2xl font-bold text-gray-800">{currentConfig.title}</h2>
              <p className="text-gray-600 mt-2">Welcome back! Please sign in to continue.</p>
            </div>

            {/* User Type Selector */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700">Login as</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(userTypeConfig).map(([key, config]) => {
                  const IconComp = config.icon;
                  return (
                    <Button
                      key={key}
                      type="button"
                      variant={userType === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType(key as any)}
                      className="flex items-center justify-center gap-2 h-12"
                    >
                      <IconComp className="w-4 h-4" />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {userType === 'student' ? (
                <>
                  <div>
                    <Label htmlFor="rollNo" className="text-sm font-medium text-gray-700">
                      Roll Number
                    </Label>
                    <Input
                      id="rollNo"
                      type="text"
                      placeholder="Enter your roll number"
                      value={formData.rollNo || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, rollNo: e.target.value }))}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="class" className="text-sm font-medium text-gray-700">
                      Class
                    </Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSE-K">CSE-K</SelectItem>
                        <SelectItem value="CSE-D">CSE-D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;