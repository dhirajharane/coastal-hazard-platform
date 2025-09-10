import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

import { ArrowLeft, Waves, UserCheck } from 'lucide-react';

type NavigateFunction = (screen: string) => void;

interface AuthPageProps {
  onLogin: (user: any) => void;
  onNavigate: NavigateFunction;
  pendingRole: 'citizen' | 'analyst' | 'official' | null;
}

export function AuthPage({ onLogin, onNavigate, pendingRole }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const role = pendingRole || 'citizen';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock user data
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      username: email.split('@')[0]
    };
    
    onLogin(userData);
  };

  const handleGuestAccess = () => {
    // Mock guest user
    const guestUser = {
      id: 'guest',
      email: 'guest@example.com',
      role: 'citizen' as const,
      username: 'Guest User'
    };
    onLogin(guestUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="absolute top-6 left-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3 mr-3">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CoastalWatch</h1>
          </div>
          <p className="text-gray-600">Join the coastal safety community</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the platform or create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="bg-gray-50 border rounded-md px-3 py-2">
                      <span className="text-sm font-medium capitalize">{role}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Role selected from landing page. Return to home to change.
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Continue
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role</Label>
                    <div className="bg-gray-50 border rounded-md px-3 py-2">
                      <span className="text-sm font-medium capitalize">{role}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Role selected from landing page. Return to home to change.
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            {/* Guest Access */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleGuestAccess}
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Continue as Guest
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Read-only access to public data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}