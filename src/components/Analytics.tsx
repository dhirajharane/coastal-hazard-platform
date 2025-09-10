import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle, 
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';

type NavigateFunction = (screen: string) => void;

interface AnalyticsProps {
  user: any;
  onNavigate: NavigateFunction;
}

export function Analytics({ user, onNavigate }: AnalyticsProps) {
  const [dateRange, setDateRange] = useState('7d');
  const [reportFormat, setReportFormat] = useState('pdf');

  // Mock analytics data
  const hazardTrendData = [
    { date: '2025-09-02', 'High Waves': 12, 'Flooding': 8, 'Oil Spill': 2, 'Tsunami': 0, 'Abnormal Tide': 5 },
    { date: '2025-09-03', 'High Waves': 15, 'Flooding': 6, 'Oil Spill': 1, 'Tsunami': 0, 'Abnormal Tide': 7 },
    { date: '2025-09-04', 'High Waves': 18, 'Flooding': 12, 'Oil Spill': 3, 'Tsunami': 1, 'Abnormal Tide': 9 },
    { date: '2025-09-05', 'High Waves': 22, 'Flooding': 15, 'Oil Spill': 2, 'Tsunami': 0, 'Abnormal Tide': 11 },
    { date: '2025-09-06', 'High Waves': 28, 'Flooding': 18, 'Oil Spill': 4, 'Tsunami': 0, 'Abnormal Tide': 14 },
    { date: '2025-09-07', 'High Waves': 35, 'Flooding': 22, 'Oil Spill': 3, 'Tsunami': 1, 'Abnormal Tide': 16 },
    { date: '2025-09-08', 'High Waves': 42, 'Flooding': 28, 'Oil Spill': 5, 'Tsunami': 0, 'Abnormal Tide': 19 }
  ];

  const regionData = [
    { region: 'Chennai', reports: 156, verified: 89, percentage: 78 },
    { region: 'Kochi', reports: 89, verified: 67, percentage: 65 },
    { region: 'Visakhapatnam', reports: 134, verified: 98, percentage: 83 },
    { region: 'Mangalore', reports: 67, verified: 45, percentage: 72 },
    { region: 'Puducherry', reports: 45, verified: 32, percentage: 58 }
  ];

  const sourceData = [
    { name: 'Citizen Reports', value: 65, color: '#3B82F6' },
    { name: 'Social Media', value: 25, color: '#10B981' },
    { name: 'Satellite Data', value: 8, color: '#F59E0B' },
    { name: 'INCOIS Advisories', value: 2, color: '#EF4444' }
  ];

  const verificationData = [
    { date: '09-02', verified: 45, pending: 28, dismissed: 12 },
    { date: '09-03', verified: 52, pending: 31, dismissed: 15 },
    { date: '09-04', verified: 61, pending: 35, dismissed: 18 },
    { date: '09-05', verified: 68, pending: 42, dismissed: 22 },
    { date: '09-06', verified: 75, pending: 48, dismissed: 25 },
    { date: '09-07', verified: 82, pending: 54, dismissed: 28 },
    { date: '09-08', verified: 89, pending: 61, dismissed: 32 }
  ];

  const kpiData = {
    totalReports24h: 94,
    verifiedCount: 67,
    peakUrgencyRegion: 'Chennai',
    averageResponseTime: '12 min',
    activeSources: 8,
    trend: '+15.3%'
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const handleExport = () => {
    // Mock export functionality
    const filename = `coastal-hazard-analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.${reportFormat}`;
    alert(`Exporting ${filename}...`);
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
              <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
              <p className="text-sm text-gray-600">Coastal hazard reporting insights and trends</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation */}
            <div className="flex space-x-1">
              <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('analytics')}
                className="bg-blue-100 text-blue-700"
              >
                Analytics
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('social-feed')}>
                Feed
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('admin-settings')}>
                Settings
              </Button>
            </div>

            {/* Export Controls */}
            <div className="flex items-center space-x-2">
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Date Range Selector */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Performance Overview</h2>
            <p className="text-sm text-gray-600">Data is mock for prototype demonstration</p>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports (24h)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.totalReports24h}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {kpiData.trend}
                </span>
                from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Reports</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.verifiedCount}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((kpiData.verifiedCount / kpiData.totalReports24h) * 100)}% verification rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Region</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.peakUrgencyRegion}</div>
              <p className="text-xs text-muted-foreground">
                Highest activity region
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.averageResponseTime}</div>
              <p className="text-xs text-muted-foreground">
                Time to first review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hazard Trends Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Hazard Types Over Time
              </CardTitle>
              <CardDescription>Number of reports by hazard type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hazardTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    {Object.keys(hazardTrendData[0]).filter(key => key !== 'date').map((hazard, index) => (
                      <Line 
                        key={hazard}
                        type="monotone" 
                        dataKey={hazard} 
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sources Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Report Sources
              </CardTitle>
              <CardDescription>Distribution of report sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsPieChart
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {sourceData.map((source, index) => (
                  <div key={source.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    ></div>
                    <span className="text-sm">{source.name}</span>
                    <span className="text-sm font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Regions Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Most Affected Regions
              </CardTitle>
              <CardDescription>Reports and verification rates by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reports" fill="#3B82F6" name="Total Reports" />
                    <Bar dataKey="verified" fill="#10B981" name="Verified" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Verification Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Verification Trends
              </CardTitle>
              <CardDescription>Daily verification workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={verificationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="verified" 
                      stackId="1" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pending" 
                      stackId="1" 
                      stroke="#F59E0B" 
                      fill="#F59E0B" 
                      fillOpacity={0.8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="dismissed" 
                      stackId="1" 
                      stroke="#EF4444" 
                      fill="#EF4444" 
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance Details</CardTitle>
            <CardDescription>Click on regions to filter map view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Region</th>
                    <th className="text-left py-3 px-4">Total Reports</th>
                    <th className="text-left py-3 px-4">Verified</th>
                    <th className="text-left py-3 px-4">Verification Rate</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((region, index) => (
                    <tr key={region.region} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{region.region}</td>
                      <td className="py-3 px-4">{region.reports}</td>
                      <td className="py-3 px-4">{region.verified}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${region.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{region.percentage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={region.percentage >= 75 ? 'default' : region.percentage >= 60 ? 'secondary' : 'destructive'}
                        >
                          {region.percentage >= 75 ? 'Good' : region.percentage >= 60 ? 'Average' : 'Needs Attention'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onNavigate('dashboard')}
                        >
                          View on Map
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Export Notice */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Export Capabilities
                </p>
                <p className="text-xs text-blue-600">
                  Analytics data can be exported in PDF, CSV, or Excel formats for external reporting and analysis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}