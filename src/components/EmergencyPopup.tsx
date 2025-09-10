import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, X, Eye, MapPin, Clock } from 'lucide-react';

interface EmergencyAlert {
  id: string;
  areaName: string;
  alertLevel: 'high' | 'critical' | 'severe';
  description: string;
  timestamp: string;
  affectedPopulation: number;
  reportCount: number;
}

interface EmergencyPopupProps {
  userRole: 'analyst' | 'official';
  emergencyPopupsEnabled: boolean;
  onViewDetails: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

export function EmergencyPopup({ 
  userRole, 
  emergencyPopupsEnabled, 
  onViewDetails, 
  onDismiss 
}: EmergencyPopupProps) {
  const [activeAlerts, setActiveAlerts] = useState<EmergencyAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  // Mock emergency alerts data
  const mockAlerts: EmergencyAlert[] = [
    {
      id: 'alert_001',
      areaName: 'Marina Beach, Chennai',
      alertLevel: 'critical',
      description: 'Multiple reports of abnormally high waves and strong currents. Immediate evacuation recommended.',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      affectedPopulation: 15000,
      reportCount: 8
    },
    {
      id: 'alert_002', 
      areaName: 'Kochi Harbor',
      alertLevel: 'high',
      description: 'Oil spill detected with potential environmental impact. Emergency response teams dispatched.',
      timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
      affectedPopulation: 8500,
      reportCount: 5
    },
    {
      id: 'alert_003',
      areaName: 'Visakhapatnam Coast',
      alertLevel: 'severe',
      description: 'Tsunami warning issued following seismic activity. All coastal areas on high alert.',
      timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
      affectedPopulation: 45000,
      reportCount: 12
    }
  ];

  // Simulate real-time emergency alerts
  useEffect(() => {
    if (!emergencyPopupsEnabled) return;

    const interval = setInterval(() => {
      // Randomly trigger new emergency alerts
      if (Math.random() < 0.2) { // 20% chance every interval
        const newAlert: EmergencyAlert = {
          id: `alert_${Date.now()}`,
          areaName: ['Puducherry Beach', 'Goa Coastline', 'Mangalore Port'][Math.floor(Math.random() * 3)],
          alertLevel: ['high', 'critical', 'severe'][Math.floor(Math.random() * 3)] as any,
          description: 'New emergency situation detected requiring immediate attention.',
          timestamp: new Date().toISOString(),
          affectedPopulation: Math.floor(Math.random() * 20000) + 5000,
          reportCount: Math.floor(Math.random() * 8) + 3
        };
        
        setActiveAlerts(prev => [newAlert, ...prev.slice(0, 2)]); // Keep max 3 alerts
      }
    }, 30000); // Check every 30 seconds

    // Load initial alerts after a short delay to simulate login
    setTimeout(() => {
      setActiveAlerts(mockAlerts.slice(0, 2));
    }, 2000);

    return () => clearInterval(interval);
  }, [emergencyPopupsEnabled]);

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
    onDismiss(alertId);
  };

  const handleViewDetails = (alertId: string) => {
    onViewDetails(alertId);
    handleDismiss(alertId);
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600';
      case 'severe': return 'bg-red-700';
      case 'high': return 'bg-orange-500';
      default: return 'bg-yellow-500';
    }
  };

  const getAlertBadgeVariant = (level: string) => {
    switch (level) {
      case 'critical': return 'destructive';
      case 'severe': return 'destructive';
      case 'high': return 'secondary';
      default: return 'outline';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  if (!emergencyPopupsEnabled || activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 z-50 space-y-4 max-w-md">
      {activeAlerts
        .filter(alert => !dismissedAlerts.has(alert.id))
        .map((alert, index) => (
          <Card 
            key={alert.id} 
            className={`${getAlertColor(alert.alertLevel)} text-white border-none shadow-2xl animate-in slide-in-from-right-full duration-500`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                  <CardTitle className="text-lg">Emergency Alert</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismiss(alert.id)}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={getAlertBadgeVariant(alert.alertLevel)}
                  className="text-xs uppercase bg-white/20 text-white border-white/30"
                >
                  {alert.alertLevel}
                </Badge>
                <div className="flex items-center text-xs opacity-90">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimeAgo(alert.timestamp)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{alert.areaName}</span>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  {alert.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/10 rounded p-2">
                  <div className="opacity-75">Affected Population</div>
                  <div className="font-semibold">{alert.affectedPopulation.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded p-2">
                  <div className="opacity-75">Reports</div>
                  <div className="font-semibold">{alert.reportCount}</div>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleViewDetails(alert.id)}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDismiss(alert.id)}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}