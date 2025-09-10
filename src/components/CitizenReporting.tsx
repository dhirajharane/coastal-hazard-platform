import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, Camera, Upload, Wifi, WifiOff, Clock, CheckCircle, Video, Image, Navigation } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

type NavigateFunction = (screen: string) => void;

interface CitizenReportingProps {
  user: any;
  onNavigate: NavigateFunction;
  isOffline: boolean;
}

interface QueuedReport {
  id: string;
  type: string;
  status: 'waiting' | 'uploading' | 'synced';
  timestamp: string;
}

export function CitizenReporting({ user, onNavigate, isOffline }: CitizenReportingProps) {
  const [hazardType, setHazardType] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('Auto-detected: Marina Beach, Chennai');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [geoTaggedData, setGeoTaggedData] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [queuedReports, setQueuedReports] = useState<QueuedReport[]>([
    { id: 'q1', type: 'High Waves', status: 'synced', timestamp: '14:30' },
    { id: 'q2', type: 'Oil Spill', status: 'uploading', timestamp: '15:45' }
  ]);

  const hazardTypes = [
    'Tsunami',
    'Flooding',
    'High Waves',
    'Swell Surge',
    'Oil Spill',
    'Abnormal Tide'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedPhotos(Array.from(e.target.files));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedVideos(Array.from(e.target.files));
    }
  };

  const handleGeoTaggedReport = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoTaggedData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        });
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add to queued reports
    const newReport: QueuedReport = {
      id: `q${Date.now()}`,
      type: hazardType,
      status: isOffline ? 'waiting' : 'uploading',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
    
    setQueuedReports(prev => [newReport, ...prev]);
    setShowSuccessModal(true);
    
    // Reset form
    setHazardType('');
    setNotes('');
    setUploadedFiles([]);
    setUploadedPhotos([]);
    setUploadedVideos([]);
    setGeoTaggedData(null);
    
    // Simulate upload completion
    if (!isOffline) {
      setTimeout(() => {
        setQueuedReports(prev => 
          prev.map(report => 
            report.id === newReport.id 
              ? { ...report, status: 'synced' } 
              : report
          )
        );
      }, 3000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'uploading':
        return <Upload className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('landing')}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold">Report Coastal Hazard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center">
              {isOffline ? (
                <div className="flex items-center text-red-600">
                  <WifiOff className="w-4 h-4 mr-1" />
                  <span className="text-sm">Offline</span>
                </div>
              ) : (
                <div className="flex items-center text-green-600">
                  <Wifi className="w-4 h-4 mr-1" />
                  <span className="text-sm">Online</span>
                </div>
              )}
            </div>
            
            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="hi">HI</SelectItem>
                <SelectItem value="ta">TA</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Profile */}
            <Button
              variant="ghost"
              onClick={() => onNavigate('my-reports')}
              className="text-blue-600"
            >
              {user?.username}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Report a Coastal Hazard</CardTitle>
                <CardDescription>
                  Help keep our coastline safe by reporting any hazardous conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hazard Type */}
                  <div className="space-y-2">
                    <Label htmlFor="hazard-type">Hazard Type *</Label>
                    <Select value={hazardType} onValueChange={setHazardType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hazard type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hazardTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" className="px-3">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Click the pin icon to place manually on map</p>
                  </div>

                  {/* Media Upload Options */}
                  <div className="space-y-4">
                    <Label>Report Media & Location</Label>
                    
                    {/* Upload Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Upload Photos Button */}
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                        <div className="text-center">
                          <Image className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <p className="text-sm font-medium text-blue-800 mb-2">Upload Photos</p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => document.getElementById('photo-upload')?.click()}
                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            Choose Photos
                          </Button>
                          {uploadedPhotos.length > 0 && (
                            <p className="text-xs text-blue-600 mt-1">{uploadedPhotos.length} photo(s) selected</p>
                          )}
                        </div>
                      </div>

                      {/* Upload Videos Button */}
                      <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                        <div className="text-center">
                          <Video className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <p className="text-sm font-medium text-green-800 mb-2">Upload Videos</p>
                          <input
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                            id="video-upload"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => document.getElementById('video-upload')?.click()}
                            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                          >
                            Choose Videos
                          </Button>
                          {uploadedVideos.length > 0 && (
                            <p className="text-xs text-green-600 mt-1">{uploadedVideos.length} video(s) selected</p>
                          )}
                        </div>
                      </div>

                      {/* Submit Geo-tagged Report Button */}
                      <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 bg-orange-50 hover:bg-orange-100 transition-colors">
                        <div className="text-center">
                          <Navigation className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                          <p className="text-sm font-medium text-orange-800 mb-2">Geo-tagged Report</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={handleGeoTaggedReport}
                            className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                          >
                            Get Location
                          </Button>
                          {geoTaggedData && (
                            <p className="text-xs text-orange-600 mt-1">Location captured</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* File Previews */}
                    {(uploadedPhotos.length > 0 || uploadedVideos.length > 0) && (
                      <div className="space-y-3">
                        {uploadedPhotos.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Photos ({uploadedPhotos.length})</p>
                            <div className="grid grid-cols-4 gap-2">
                              {uploadedPhotos.map((file, index) => (
                                <div key={index} className="relative">
                                  <div className="aspect-square bg-blue-100 rounded border flex items-center justify-center">
                                    <Image className="w-6 h-6 text-blue-600" />
                                  </div>
                                  <Badge className="absolute -top-1 -right-1 text-xs bg-blue-100 text-blue-800">
                                    IMG
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {uploadedVideos.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Videos ({uploadedVideos.length})</p>
                            <div className="grid grid-cols-4 gap-2">
                              {uploadedVideos.map((file, index) => (
                                <div key={index} className="relative">
                                  <div className="aspect-square bg-green-100 rounded border flex items-center justify-center">
                                    <Video className="w-6 h-6 text-green-600" />
                                  </div>
                                  <Badge className="absolute -top-1 -right-1 text-xs bg-green-100 text-green-800">
                                    VID
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Geo-tagged Data Display */}
                    {geoTaggedData && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Navigation className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Geo-tagged Location</span>
                        </div>
                        <div className="text-xs text-orange-700 space-y-1">
                          <p>Latitude: {geoTaggedData.latitude.toFixed(6)}</p>
                          <p>Longitude: {geoTaggedData.longitude.toFixed(6)}</p>
                          <p>Accuracy: ±{Math.round(geoTaggedData.accuracy)}m</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe what you observed..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                    disabled={!hazardType}
                  >
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mini Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-blue-100 rounded border-2 border-blue-200 flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Marina Beach</p>
                    <p className="text-xs text-gray-500">Chennai, Tamil Nadu</p>
                  </div>
                  <Button className="absolute bottom-2 right-2 text-xs" variant="outline" size="sm">
                    Adjust
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Queued Reports */}
            {(queuedReports.length > 0 || isOffline) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Queued Reports
                  </CardTitle>
                  <CardDescription>
                    {isOffline ? 'Reports will sync when online' : 'Recent submissions'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {queuedReports.map(report => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(report.status)}
                          <div>
                            <p className="text-sm font-medium">{report.type}</p>
                            <p className="text-xs text-gray-500">{report.timestamp}</p>
                          </div>
                        </div>
                        <Badge variant={
                          report.status === 'synced' ? 'default' : 
                          report.status === 'uploading' ? 'secondary' : 'outline'
                        }>
                          {report.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('my-reports')}
                >
                  View My Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6 mr-2" />
              Report Submitted Successfully
            </DialogTitle>
            <DialogDescription>
              Thank you for helping keep our coastline safe. Your report has been {isOffline ? 'queued' : 'submitted'} and will be reviewed by officials.
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-2 mt-4">
            <Button onClick={() => setShowSuccessModal(false)} className="flex-1">
              Continue Reporting
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate('my-reports');
              }}
            >
              View My Reports
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}