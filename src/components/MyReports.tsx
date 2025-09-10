import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type NavigateFunction = (screen: string) => void;

interface MyReportsProps {
  user: any;
  onNavigate: NavigateFunction;
}

interface UserReport {
  id: string;
  type: string;
  status: 'pending' | 'verified' | 'dismissed' | 'under-review';
  urgency: number;
  location: string;
  timestamp: string;
  description: string;
  media: string[];
  verifierNotes?: string;
  canEdit: boolean;
  canDelete: boolean;
}

export function MyReports({ user, onNavigate }: MyReportsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Mock user reports data
  const userReports: UserReport[] = [
    {
      id: 'ur_001',
      type: 'High Waves',
      status: 'verified',
      urgency: 78,
      location: 'Marina Beach, Chennai',
      timestamp: '2025-09-08T15:24:00Z',
      description: 'Large waves hitting the shore, water entered the coastal road area.',
      media: ['https://images.unsplash.com/photo-1570408002311-8ed18fa0a9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwZmxvb2RpbmclMjB3YXZlc3xlbnwxfHx8fDE3NTczMzAzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      verifierNotes: 'Verified by coastal guard. Action taken to redirect traffic.',
      canEdit: false,
      canDelete: false
    },
    {
      id: 'ur_002',
      type: 'Oil Spill',
      status: 'under-review',
      urgency: 85,
      location: 'Ennore Port, Chennai',
      timestamp: '2025-09-08T10:45:00Z',
      description: 'Small oil spill observed near the port area. Affects approximately 50 meter stretch.',
      media: [],
      canEdit: true,
      canDelete: true
    },
    {
      id: 'ur_003',
      type: 'Abnormal Tide',
      status: 'pending',
      urgency: 45,
      location: 'Elliot Beach, Chennai',
      timestamp: '2025-09-07T18:30:00Z',
      description: 'Tide levels seem higher than usual for this time of day.',
      media: ['https://images.unsplash.com/photo-1612214827065-c16505567204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwZmxvb2RpbmclMjB3YXZlc3xlbnwxfHx8fDE3NTczMzAzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      canEdit: true,
      canDelete: true
    },
    {
      id: 'ur_004',
      type: 'Flooding',
      status: 'dismissed',
      urgency: 32,
      location: 'Besant Nagar Beach, Chennai',
      timestamp: '2025-09-06T14:15:00Z',
      description: 'Water accumulation near beach entrance after rain.',
      media: [],
      verifierNotes: 'Normal tidal pooling, not a hazard. Regular monsoon effect.',
      canEdit: false,
      canDelete: false
    },
    {
      id: 'ur_005',
      type: 'High Waves',
      status: 'pending',
      urgency: 65,
      location: 'Kovalam Beach, Chennai',
      timestamp: '2025-09-08T07:20:00Z',
      description: 'Increased wave activity, surfers and swimmers advised caution.',
      media: [],
      canEdit: true,
      canDelete: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'dismissed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Dismissed</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-800"><Eye className="w-3 h-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 80) return 'bg-red-500';
    if (urgency >= 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const filteredReports = userReports.filter(report => {
    const matchesSearch = !searchQuery || 
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: userReports.length,
    pending: userReports.filter(r => r.status === 'pending').length,
    'under-review': userReports.filter(r => r.status === 'under-review').length,
    verified: userReports.filter(r => r.status === 'verified').length,
    dismissed: userReports.filter(r => r.status === 'dismissed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('citizen-reporting')}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Reporting
            </Button>
            <div>
              <h1 className="text-xl font-semibold">My Reports</h1>
              <p className="text-sm text-gray-600">View and manage your submitted reports</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-blue-50">
              {filteredReports.length} of {userReports.length} reports
            </Badge>
            
            <Button 
              onClick={() => onNavigate('citizen-reporting')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Verified: {statusCounts.verified}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Under Review: {statusCounts['under-review']}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Pending: {statusCounts.pending}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Dismissed: {statusCounts.dismissed}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search reports by type, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
              <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
              <SelectItem value="under-review">Under Review ({statusCounts['under-review']})</SelectItem>
              <SelectItem value="verified">Verified ({statusCounts.verified})</SelectItem>
              <SelectItem value="dismissed">Dismissed ({statusCounts.dismissed})</SelectItem>
            </SelectContent>
          </Select>
          
          {/* View Mode */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none"
            >
              List
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none"
            >
              Grid
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {filteredReports.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <AlertTriangle className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-4">
              {userReports.length === 0 
                ? "You haven't submitted any reports yet." 
                : "Try adjusting your search or filter criteria."
              }
            </p>
            <Button 
              onClick={() => onNavigate('citizen-reporting')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Your First Report
            </Button>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredReports.map(report => (
              viewMode === 'grid' ? (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{report.type}</CardTitle>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {report.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {report.media.length > 0 && (
                      <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
                        <ImageWithFallback
                          src={report.media[0]}
                          alt="Report media"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Urgency:</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getUrgencyColor(report.urgency)}`}
                              style={{ width: `${report.urgency}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{report.urgency}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(report.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {report.verifierNotes && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-3">
                        <p className="text-xs text-blue-800">
                          <strong>Verifier Notes:</strong> {report.verifierNotes}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      {report.canEdit && (
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                      {report.canDelete && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Media Thumbnail */}
                      <div className="flex-shrink-0">
                        {report.media.length > 0 ? (
                          <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                            <ImageWithFallback
                              src={report.media[0]}
                              alt="Report media"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{report.type}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {report.location}
                            </div>
                          </div>
                          {getStatusBadge(report.status)}
                        </div>
                        
                        <p className="text-gray-700 mb-3">{report.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Urgency:</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getUrgencyColor(report.urgency)}`}
                                    style={{ width: `${report.urgency}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{report.urgency}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(report.timestamp).toLocaleDateString()}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(report.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        
                        {report.verifierNotes && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                            <p className="text-sm text-blue-800">
                              <strong>Verifier Notes:</strong> {report.verifierNotes}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Report ID: {report.id}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            {report.canEdit && (
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            )}
                            {report.canDelete && (
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}