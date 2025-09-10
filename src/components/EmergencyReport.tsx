import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, AlertTriangle, MapPin, Camera, Phone, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

type NavigateFunction = (screen: string) => void;

interface EmergencyReportProps {
  onNavigate: NavigateFunction;
}

export function EmergencyReport({ onNavigate }: EmergencyReportProps) {
  const [hazardType, setHazardType] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('Auto-detected: Current Location');
  const [contactNumber, setContactNumber] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const hazardTypes = [
    'Tsunami',
    'Flooding',
    'High Waves',
    'Swell Surge',
    'Oil Spill',
    'Abnormal Tide',
    'Other Emergency'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Header */}
      <div className="bg-red-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('landing')}
              className="mr-4 text-white hover:bg-red-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 animate-pulse" />
              <h1 className="text-xl font-bold">Emergency Report</h1>
            </div>
          </div>
          
          {/* Emergency Contact */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm">Emergency Hotline</p>
              <p className="font-bold">108</p>
            </div>
            <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <p className="text-yellow-800">
            <span className="font-semibold">Emergency Mode:</span> Your report will be prioritized and sent immediately to authorities. 
            No login required.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Emergency Form */}
          <div className="lg:col-span-2">
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Report Emergency Situation
                </CardTitle>
                <CardDescription className="text-red-600">
                  Provide as much detail as possible. Your report will be sent immediately to coastal authorities.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hazard Type - Required */}
                  <div className="space-y-2">
                    <Label htmlFor="hazard-type" className="text-red-800 font-semibold">
                      Emergency Type *
                    </Label>
                    <Select value={hazardType} onValueChange={setHazardType} required>
                      <SelectTrigger className="border-red-200">
                        <SelectValue placeholder="Select emergency type" />
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
                    <Label htmlFor="location" className="text-red-800 font-semibold">
                      Location
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1 border-red-200"
                        placeholder="Describe the location"
                      />
                      <Button type="button" variant="outline" className="px-3 border-red-200">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-red-600">
                      GPS coordinates will be automatically included
                    </p>
                  </div>

                  {/* Emergency Description */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-red-800 font-semibold">
                      Emergency Description *
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe the emergency situation in detail..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                      className="border-red-200"
                      required
                    />
                    <p className="text-sm text-red-600">
                      Include any immediate dangers, number of people affected, etc.
                    </p>
                  </div>

                  {/* Contact Number - Optional */}
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-red-800 font-semibold">
                      Contact Number (Optional)
                    </Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="border-red-200"
                    />
                    <p className="text-sm text-red-600">
                      Authorities may contact you for additional information
                    </p>
                  </div>

                  {/* Media Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="media" className="text-red-800 font-semibold">
                      Photos/Videos
                    </Label>
                    <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center bg-red-50">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-red-400" />
                      <p className="text-sm text-red-600 mb-2">Upload photos or videos of the emergency</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="emergency-file-upload"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('emergency-file-upload')?.click()}
                        className="border-red-300 text-red-600 hover:bg-red-100"
                      >
                        Choose Files
                      </Button>
                    </div>
                    
                    {/* File Preview */}
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-red-100 rounded border border-red-200 flex items-center justify-center">
                              <span className="text-xs text-red-600 text-center p-2">{file.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Emergency Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
                    disabled={!hazardType || !notes}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Submit Emergency Report
                  </Button>
                  
                  <p className="text-xs text-red-600 text-center">
                    By submitting, you confirm this is a genuine emergency situation
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-800 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-red-800">National Emergency</p>
                      <p className="text-sm text-red-600">Fire, Police, Ambulance</p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      108
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-yellow-800">Coast Guard</p>
                      <p className="text-sm text-yellow-600">Marine Emergency</p>
                    </div>
                    <Button variant="outline" className="border-yellow-300 text-yellow-700">
                      1554
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-blue-800">Disaster Management</p>
                      <p className="text-sm text-blue-600">State Control Room</p>
                    </div>
                    <Button variant="outline" className="border-blue-300 text-blue-700">
                      1070
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-orange-800">Safety Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>Move to higher ground immediately if near water</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>Do not attempt to drive through flooded areas</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>Follow official evacuation orders</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p>Keep this report number for reference</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Status */}
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
                    <p>Report sent immediately to authorities</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
                    <p>Emergency response team notified</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
                    <p>Response coordinated based on severity</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs">4</div>
                    <p className="text-gray-600">Status updates if contact provided</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="border-green-200">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Emergency Report Submitted
            </DialogTitle>
            <DialogDescription>
              Your emergency report has been submitted successfully and authorities have been notified immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-center">
                <p className="font-semibold text-green-800">Report ID: ER-{Date.now().toString().slice(-6)}</p>
                <p className="text-sm text-green-600 mt-1">Save this number for reference</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Emergency response teams have been alerted. If this is a life-threatening emergency, 
                call 108 immediately.
              </p>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate('landing');
                }}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Continue
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="border-green-300 text-green-700"
              >
                Print Receipt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}