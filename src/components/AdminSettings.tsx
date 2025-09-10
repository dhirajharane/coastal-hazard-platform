import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Users, 
  Settings, 
  Database, 
  Activity, 
  Shield, 
  Bell, 
  Globe, 
  Trash2, 
  UserPlus, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

type NavigateFunction = (screen: string) => void;

interface AdminSettingsProps {
  user: any;
  onNavigate: NavigateFunction;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'analyst' | 'official' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  reportsSubmitted?: number;
  reportsVerified?: number;
}

export function AdminSettings({ user, onNavigate }: AdminSettingsProps) {
  const [activeTab, setActiveTab] = useState('users');
  const [mapRefreshInterval, setMapRefreshInterval] = useState([30]);
  const [maxClusterSize, setMaxClusterSize] = useState([25]);
  const [thresholdDefaults, setThresholdDefaults] = useState([50]);
  const [socialMediaEnabled, setSocialMediaEnabled] = useState(true);
  const [satelliteEnabled, setSatelliteEnabled] = useState(true);
  const [incoisdataEnabled, setIncoisdataEnabled] = useState(false);

  // Mock users data
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    {
      id: 'u_001',
      name: 'Dr. Sarah Patel',
      email: 'sarah.patel@coastalwatch.gov',
      role: 'official',
      status: 'active',
      lastActive: '2025-09-08T16:30:00Z',
      reportsVerified: 245
    },
    {
      id: 'u_002',
      name: 'Raj Kumar',
      email: 'raj.kumar@coastalwatch.gov',
      role: 'analyst',
      status: 'active',
      lastActive: '2025-09-08T15:45:00Z',
      reportsVerified: 156
    },
    {
      id: 'u_003',
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      role: 'citizen',
      status: 'active',
      lastActive: '2025-09-08T14:20:00Z',
      reportsSubmitted: 12
    },
    {
      id: 'u_004',
      name: 'Lisa Wong',
      email: 'lisa.wong@coastalwatch.gov',
      role: 'analyst',
      status: 'inactive',
      lastActive: '2025-09-05T10:15:00Z',
      reportsVerified: 89
    },
    {
      id: 'u_005',
      name: 'Coastal Observer',
      email: 'observer@fishing.coop',
      role: 'citizen',
      status: 'pending',
      lastActive: '2025-09-08T12:00:00Z',
      reportsSubmitted: 3
    }
  ]);

  // Mock audit logs
  const auditLogs = [
    {
      id: 'log_001',
      timestamp: '2025-09-08T16:45:00Z',
      user: 'Dr. Sarah Patel',
      action: 'Verified report',
      details: 'Report r_001 marked as verified',
      type: 'verification'
    },
    {
      id: 'log_002',
      timestamp: '2025-09-08T16:30:00Z',
      user: 'Admin',
      action: 'Settings updated',
      details: 'Social media ingestion enabled',
      type: 'system'
    },
    {
      id: 'log_003',
      timestamp: '2025-09-08T16:15:00Z',
      user: 'Raj Kumar',
      action: 'User role changed',
      details: 'lisa.wong@coastalwatch.gov role changed to analyst',
      type: 'user_management'
    },
    {
      id: 'log_004',
      timestamp: '2025-09-08T15:45:00Z',
      user: 'System',
      action: 'Data sync',
      details: 'Satellite data synchronized - 45 new data points',
      type: 'data'
    }
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { color: 'bg-purple-100 text-purple-800', label: 'Admin' },
      official: { color: 'bg-blue-100 text-blue-800', label: 'Official' },
      analyst: { color: 'bg-green-100 text-green-800', label: 'Analyst' },
      citizen: { color: 'bg-gray-100 text-gray-800', label: 'Citizen' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.citizen;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setSystemUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole as any } : user
    ));
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setSystemUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus as any } : user
    ));
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'system':
        return <Settings className="w-4 h-4 text-blue-500" />;
      case 'user_management':
        return <Users className="w-4 h-4 text-purple-500" />;
      case 'data':
        return <Database className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-semibold">System Administration</h1>
              <p className="text-sm text-gray-600">Manage users, settings, and system configuration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation */}
            <div className="flex space-x-1">
              <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('analytics')}>
                Analytics
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('social-feed')}>
                Feed
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('admin-settings')}
                className="bg-blue-100 text-blue-700"
              >
                Settings
              </Button>
            </div>

            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              <Shield className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </TabsTrigger>
            <TabsTrigger value="data-sources" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Data Sources</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Audit Logs</span>
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">User Role Management</h3>
                <p className="text-sm text-gray-600">Manage user roles and permissions</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6 border-b">User</th>
                        <th className="text-left py-3 px-6 border-b">Role</th>
                        <th className="text-left py-3 px-6 border-b">Status</th>
                        <th className="text-left py-3 px-6 border-b">Last Active</th>
                        <th className="text-left py-3 px-6 border-b">Activity</th>
                        <th className="text-left py-3 px-6 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemUsers.map(systemUser => (
                        <tr key={systemUser.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 border-b">
                            <div>
                              <p className="font-medium">{systemUser.name}</p>
                              <p className="text-sm text-gray-500">{systemUser.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <Select 
                              value={systemUser.role} 
                              onValueChange={(value) => handleRoleChange(systemUser.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="citizen">Citizen</SelectItem>
                                <SelectItem value="analyst">Analyst</SelectItem>
                                <SelectItem value="official">Official</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="py-4 px-6 border-b">
                            {getStatusBadge(systemUser.status)}
                          </td>
                          <td className="py-4 px-6 border-b">
                            <span className="text-sm text-gray-600">
                              {new Date(systemUser.lastActive).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <div className="text-sm">
                              {systemUser.reportsSubmitted && (
                                <p>Reports: {systemUser.reportsSubmitted}</p>
                              )}
                              {systemUser.reportsVerified && (
                                <p>Verified: {systemUser.reportsVerified}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 border-b">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sources Tab */}
          <TabsContent value="data-sources" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Data Source Configuration</h3>
              <p className="text-sm text-gray-600">Enable or disable active data sources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Social Media Ingestion
                  </CardTitle>
                  <CardDescription>
                    Monitor Twitter, Facebook, Instagram, and YouTube for coastal hazard mentions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Status</p>
                      <p className="text-sm text-gray-600">
                        {socialMediaEnabled ? 'Active - monitoring 4 platforms' : 'Disabled'}
                      </p>
                    </div>
                    <Switch 
                      checked={socialMediaEnabled}
                      onCheckedChange={setSocialMediaEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Satellite Data Fetching
                  </CardTitle>
                  <CardDescription>
                    Automatically fetch satellite imagery and oceanographic data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Status</p>
                      <p className="text-sm text-gray-600">
                        {satelliteEnabled ? 'Active - hourly updates' : 'Disabled'}
                      </p>
                    </div>
                    <Switch 
                      checked={satelliteEnabled}
                      onCheckedChange={setSatelliteEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    INCOIS Advisories
                  </CardTitle>
                  <CardDescription>
                    Integration with Indian National Centre for Ocean Information Services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Status</p>
                      <p className="text-sm text-gray-600">
                        {incoisdataEnabled ? 'Active - real-time advisories' : 'Disabled'}
                      </p>
                    </div>
                    <Switch 
                      checked={incoisdataEnabled}
                      onCheckedChange={setIncoisdataEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Data Synchronization
                  </CardTitle>
                  <CardDescription>
                    Manual data sync and system health monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Sync:</span>
                    <span className="text-sm text-gray-600">5 minutes ago</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Sync Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">System Configuration</h3>
              <p className="text-sm text-gray-600">Configure system behavior and default settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Map Settings</CardTitle>
                  <CardDescription>Configure map refresh rates and clustering behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Map Refresh Interval (seconds)</Label>
                    <Slider
                      value={mapRefreshInterval}
                      onValueChange={setMapRefreshInterval}
                      max={120}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>10s</span>
                      <span>{mapRefreshInterval[0]}s</span>
                      <span>120s</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Cluster Size</Label>
                    <Slider
                      value={maxClusterSize}
                      onValueChange={setMaxClusterSize}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5</span>
                      <span>{maxClusterSize[0]}</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Cluster Threshold</Label>
                    <Slider
                      value={thresholdDefaults}
                      onValueChange={setThresholdDefaults}
                      max={100}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Low</span>
                      <span>{thresholdDefaults[0]}</span>
                      <span>High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>High Urgency Alerts</Label>
                      <p className="text-xs text-gray-600">Notify on reports with urgency &gt; 80</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Social Media Spikes</Label>
                      <p className="text-xs text-gray-600">Alert on unusual social activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Health Alerts</Label>
                      <p className="text-xs text-gray-600">Notify on system issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-xs text-gray-600">Send email summaries</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Retention</CardTitle>
                  <CardDescription>Configure how long data is kept in the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reports-retention">Reports Retention</Label>
                      <Select defaultValue="2years">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="5years">5 Years</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="social-retention">Social Media Data</Label>
                      <Select defaultValue="30days">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">7 Days</SelectItem>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Actions</CardTitle>
                  <CardDescription>Maintenance and administrative actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export System Configuration
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restart Data Ingestion
                  </Button>
                  
                  <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">System Activity Logs</h3>
                <p className="text-sm text-gray-600">Monitor system actions and user activities</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        {getActionIcon(log.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{log.action}</p>
                            <span className="text-xs text-gray-500">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                          <p className="text-xs text-gray-500 mt-1">by {log.user}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button variant="outline">
                Load More Logs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}