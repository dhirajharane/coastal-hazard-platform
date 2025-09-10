import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { IndianMap } from './IndianMap';
import { EmergencyPopup } from './EmergencyPopup';
import { 
  Bell, 
  Settings, 
  MapPin, 
  Satellite, 
  Users, 
  Filter,
  Eye,
  Calendar,
  Globe,
  Volume2,
  VolumeX,
  Layers,
  Zap,
  Clock,
  TrendingUp,
  X,
  MoreVertical
} from 'lucide-react';

type NavigateFunction = (screen: string, reportId?: string) => void;

interface DashboardProps {
  user: any;
  onNavigate: NavigateFunction;
  onLogout: () => void;
}

interface Report {
  id: string;
  type: string;
  lat: number;
  lng: number;
  urgency: number;
  status: 'unverified' | 'verified' | 'dismissed';
  timestamp: string;
  reporter: string;
  trustScore: number;
}

interface SocialPost {
  id: string;
  platform: string;
  username: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  timestamp: string;
  lat: number;
  lng: number;
}

export function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [sonificationEnabled, setSonificationEnabled] = useState(true);
  const [liveUpdating, setLiveUpdating] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState([0.7]);
  const [clusterThreshold, setClusterThreshold] = useState([50]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [emergencyPopupsEnabled, setEmergencyPopupsEnabled] = useState(true);

  // Mock data
  const [reports, setReports] = useState<Report[]>([
    {
      id: 'r_001',
      type: 'High Waves',
      lat: 13.0827,
      lng: 80.2707,
      urgency: 78,
      status: 'unverified',
      timestamp: '2025-09-08T15:24:00Z',
      reporter: 'Ravi K',
      trustScore: 60
    },
    {
      id: 'r_002',
      type: 'Oil Spill',
      lat: 12.9716,
      lng: 77.5946,
      urgency: 92,
      status: 'verified',
      timestamp: '2025-09-08T14:45:00Z',
      reporter: 'Priya S',
      trustScore: 85
    },
    {
      id: 'r_003',
      type: 'Abnormal Tide',
      lat: 11.9416,
      lng: 79.8083,
      urgency: 45,
      status: 'unverified',
      timestamp: '2025-09-08T16:10:00Z',
      reporter: 'Coastal Observer',
      trustScore: 70
    }
  ]);

  const socialPosts: SocialPost[] = [
    {
      id: 's_001',
      platform: 'Twitter',
      username: '@coastwatch',
      text: 'Unusual tides at Chennai beach #tide #warning',
      sentiment: 'negative',
      timestamp: '2025-09-08T15:10:00Z',
      lat: 13.0827,
      lng: 80.2707
    },
    {
      id: 's_002',
      platform: 'Facebook',
      username: 'Marina Beach Updates',
      text: 'High waves observed this morning, stay safe!',
      sentiment: 'neutral',
      timestamp: '2025-09-08T14:30:00Z',
      lat: 13.0827,
      lng: 80.2707
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!liveUpdating) return;

    const interval = setInterval(() => {
      // Randomly add new reports
      if (Math.random() < 0.3) {
        const newReport: Report = {
          id: `r_${Date.now()}`,
          type: ['High Waves', 'Flooding', 'Oil Spill'][Math.floor(Math.random() * 3)],
          lat: 13.0827 + (Math.random() - 0.5) * 0.1,
          lng: 80.2707 + (Math.random() - 0.5) * 0.1,
          urgency: Math.floor(Math.random() * 100),
          status: 'unverified',
          timestamp: new Date().toISOString(),
          reporter: 'New Reporter',
          trustScore: Math.floor(Math.random() * 100)
        };
        setReports(prev => [newReport, ...prev]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [liveUpdating]);

  const handleClusterClick = (clusterId: string) => {
    setSelectedCluster(clusterId);
    setRightPanelOpen(true);
  };

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 80) return 'bg-red-500';
    if (urgency >= 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return '🟢';
      case 'dismissed':
        return '🔴';
      default:
        return '🟡';
    }
  };

  const handleEmergencyViewDetails = (alertId: string) => {
    // Navigate to report details or alert management
    onNavigate('report-details', alertId);
  };

  const handleEmergencyDismiss = (alertId: string) => {
    // Handle dismissing emergency alert
    console.log('Dismissed alert:', alertId);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-semibold">Coastal Hazard Dashboard</h1>
          
          {/* Live Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${liveUpdating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">
              {liveUpdating ? 'Live Updating' : 'Updates Paused'}
            </span>
          </div>
          
          {/* Date/Time Selector */}
          <Select defaultValue="live">
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live Data</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          {/* Navigation */}
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('dashboard')}
              className="bg-blue-100 text-blue-700"
            >
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('analytics')}>
              Analytics
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('social-feed')}>
              Feed
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('admin-settings')}>
              Settings
            </Button>
          </div>

          {/* Alerts */}
          <Button
            variant="ghost"
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Emergency Popups Toggle */}
          {(user?.role === 'analyst' || user?.role === 'official') && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Emergency Alerts</span>
              <Switch
                checked={emergencyPopupsEnabled}
                onCheckedChange={setEmergencyPopupsEnabled}
              />
            </div>
          )}

          {/* Language */}
          <Select defaultValue="en">
            <SelectTrigger className="w-16">
              <Globe className="w-4 h-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="hi">HI</SelectItem>
              <SelectItem value="ta">TA</SelectItem>
            </SelectContent>
          </Select>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{user?.username}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Filters */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters & Layers
              </h3>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select defaultValue="tamil-nadu">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="chennai">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="kochi">Kochi</SelectItem>
                  <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hazard Types */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Hazard Types</label>
              <div className="space-y-2">
                {['Tsunami', 'Flooding', 'High Waves', 'Oil Spill', 'Abnormal Tide'].map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} defaultChecked />
                    <label htmlFor={type} className="text-sm">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="24h">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last 1 Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sources</label>
              <div className="space-y-2">
                {['Citizen Reports', 'Social Media', 'Satellite Data', 'INCOIS Advisories'].map(source => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox id={source} defaultChecked />
                    <label htmlFor={source} className="text-sm">{source}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                Map Layers
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Satellite Overlay</span>
                  <Button variant="outline" size="sm">ON</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Social Media</span>
                  <Button variant="outline" size="sm">ON</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">INCOIS Advisories</span>
                  <Button variant="outline" size="sm">OFF</Button>
                </div>
              </div>
            </div>

            {/* Cluster Threshold */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Cluster Threshold</label>
              <Slider
                value={clusterThreshold}
                onValueChange={setClusterThreshold}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low</span>
                <span>{clusterThreshold[0]}</span>
                <span>High</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </Button>
              <Button variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Center - Map Area */}
        <div className="flex-1 relative bg-gray-900">
          {/* Map Header Controls */}
          <div className="absolute top-4 left-4 z-10 flex space-x-2">
            <Card className="p-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSonificationEnabled(!sonificationEnabled)}
                >
                  {sonificationEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <span className="text-xs">Sonification {sonificationEnabled ? 'ON' : 'OFF'}</span>
              </div>
            </Card>
            
            <Card className="p-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs">Heatmap Opacity</span>
                <Slider
                  value={heatmapOpacity}
                  onValueChange={setHeatmapOpacity}
                  max={1}
                  step={0.1}
                  className="w-20"
                />
              </div>
            </Card>
          </div>

          {/* Social Feed Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button 
              onClick={() => onNavigate('social-feed')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Social Feed
            </Button>
          </div>

          {/* Indian Map */}
          <IndianMap
            reports={reports}
            heatmapOpacity={heatmapOpacity[0]}
            onClusterClick={handleClusterClick}
          />
        </div>

        {/* Right Panel */}
        {rightPanelOpen && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold">Report Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRightPanelOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <Tabs defaultValue="details" className="flex-1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="flex-1 p-4 space-y-4">
                {selectedCluster && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cluster Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Reports:</span>
                            <span className="font-semibold">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span>2 min ago</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Urgency:</span>
                            <Badge className="bg-red-100 text-red-800">92</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <h4 className="font-medium">Recent Reports</h4>
                      {reports.slice(0, 3).map(report => (
                        <Card key={report.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium">{report.type}</span>
                                <Badge variant="outline" className="text-xs">
                                  {report.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600">
                                By {report.reporter} • {new Date(report.timestamp).toLocaleTimeString()}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs">Urgency:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getUrgencyColor(report.urgency)}`}
                                    style={{ width: `${report.urgency}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium">{report.urgency}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onNavigate('report-details', report.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Mark as Reviewed
                      </Button>
                      <Button variant="outline" className="w-full">
                        Escalate Priority
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="social" className="flex-1 p-4 space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Social Media Posts</h4>
                  {socialPosts.map(post => (
                    <Card key={post.id} className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">T</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{post.username}</span>
                            <Badge 
                              variant={post.sentiment === 'negative' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {post.sentiment}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{post.text}</p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View on Map
                            </Button>
                            <Button variant="outline" size="sm">
                              Save Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="satellite" className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded border flex items-center justify-center">
                    <div className="text-center">
                      <Satellite className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Satellite View</p>
                      <p className="text-xs text-gray-500">Last updated: 1 hour ago</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Range (Last 24h)</label>
                    <Slider defaultValue={[12]} max={24} step={1} className="w-full" />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      Before/After
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Full Screen
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Alerts Slide-in */}
      {showAlerts && (
        <div className="fixed top-16 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold">Recent Alerts</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowAlerts(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            <div className="flex items-start space-x-3 p-2 bg-red-50 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">High urgency report</p>
                <p className="text-xs text-gray-600">Oil spill detected near Marina Beach</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 bg-yellow-50 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Social media spike</p>
                <p className="text-xs text-gray-600">Increased mentions of "high waves"</p>
                <p className="text-xs text-gray-500">12 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Popups for Officials/Analysts */}
      {(user?.role === 'analyst' || user?.role === 'official') && (
        <EmergencyPopup
          userRole={user.role}
          emergencyPopupsEnabled={emergencyPopupsEnabled}
          onViewDetails={handleEmergencyViewDetails}
          onDismiss={handleEmergencyDismiss}
        />
      )}
    </div>
  );
}