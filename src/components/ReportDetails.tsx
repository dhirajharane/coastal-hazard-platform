import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  User, 
  Star, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Image as ImageIcon,
  Play,
  Volume2,
  Download,
  Flag,
  Share2,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type NavigateFunction = (screen: string) => void;

interface ReportDetailsProps {
  reportId: string | null;
  user: any;
  onNavigate: NavigateFunction;
}

export function ReportDetails({ reportId, user, onNavigate }: ReportDetailsProps) {
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [verifierNotes, setVerifierNotes] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');

  // Mock report data
  const report = {
    id: reportId || 'r_001',
    type: 'High Waves',
    lat: 13.0827,
    lng: 80.2707,
    urgency: 78,
    status: 'unverified',
    timestamp: '2025-09-08T15:24:00Z',
    reporter: 'Ravi K',
    trustScore: 85,
    reporterBadges: ['Wave Watcher', 'Verified Citizen'],
    text: 'Large waves hitting the shore approximately 3-4 meters high. Water has entered the coastal road. Multiple vehicles stranded. People are moving to higher ground. Situation appears to be worsening with each wave cycle.',
    location: 'Marina Beach, Chennai, Tamil Nadu',
    language: 'English',
    media: [
      'https://images.unsplash.com/photo-1570408002311-8ed18fa0a9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwZmxvb2RpbmclMjB3YXZlc3xlbnwxfHx8fDE3NTczMzAzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'video_placeholder.mp4',
      'audio_recording.mp3'
    ],
    metadata: {
      deviceInfo: 'iPhone 14 Pro',
      gpsAccuracy: '±3 meters',
      weatherConditions: 'Cloudy, Wind: 25 km/h',
      tideLevel: 'High tide +1.2m',
      timeOfDay: 'Afternoon'
    }
  };

  const handleVerificationAction = (action: string) => {
    setVerificationStatus(action);
    // In a real app, this would update the backend
  };

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 80) return 'bg-red-500';
    if (urgency >= 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'dismissed':
        return <Badge className="bg-red-100 text-red-800">Dismissed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
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
              <h1 className="text-xl font-semibold">Report Details</h1>
              <p className="text-sm text-gray-600">ID: {report.id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {getStatusBadge(report.status)}
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Urgency:</span>
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Media */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Media Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={report.media[0]}
                      alt="Report evidence"
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  {/* Media Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center cursor-pointer">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center cursor-pointer">
                      <Play className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center cursor-pointer">
                      <Volume2 className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Media Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Full View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-square bg-blue-100 rounded border-2 border-blue-200 flex items-center justify-center relative">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Marina Beach</p>
                      <p className="text-xs text-gray-500">Chennai, Tamil Nadu</p>
                    </div>
                    <Button className="absolute bottom-2 right-2 text-xs" variant="outline" size="sm">
                      Open Map
                    </Button>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coordinates:</span>
                      <span className="font-mono">{report.lat}, {report.lng}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy:</span>
                      <span>{report.metadata.gpsAccuracy}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Report Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Report Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hazard Type:</span>
                    <Badge variant="outline" className="bg-blue-50">{report.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Timestamp:</span>
                    <span className="text-sm">{new Date(report.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Language:</span>
                    <span className="text-sm">{report.language}</span>
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Reporter Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">{report.reporter}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Trust Score:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{report.trustScore}/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Badges:</span>
                      <div className="flex space-x-1">
                        {report.reporterBadges.map(badge => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Description */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Description</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded">
                    {report.text}
                  </p>
                </div>

                {/* Environmental Data */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Environmental Context</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weather:</span>
                      <span>{report.metadata.weatherConditions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tide Level:</span>
                      <span>{report.metadata.tideLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time of Day:</span>
                      <span>{report.metadata.timeOfDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Device:</span>
                      <span>{report.metadata.deviceInfo}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Verification Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleVerificationAction('verified')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Verified
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleVerificationAction('pending')}
                    className="w-full"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Keep Pending
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleVerificationAction('dismissed')}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Dismiss Report
                  </Button>
                </div>

                {/* Priority Setting */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority Level</label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assign To */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign to Team Member</label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst1">Dr. Sarah Patel (Senior Analyst)</SelectItem>
                      <SelectItem value="analyst2">Raj Kumar (Field Coordinator)</SelectItem>
                      <SelectItem value="analyst3">Lisa Wong (Marine Specialist)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Verifier Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Verification Notes</label>
                  <Textarea
                    placeholder="Add notes about verification process, cross-references, or additional context..."
                    value={verifierNotes}
                    onChange={(e) => setVerifierNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Additional Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Flag className="w-4 h-4 mr-2" />
                    Escalate to Supervisor
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Agencies
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Issue Public Alert
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification History */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Report submitted</p>
                      <p className="text-xs text-gray-500">by {report.reporter} • {new Date(report.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Under review</p>
                      <p className="text-xs text-gray-500">assigned to {user?.username} • 5 min ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}