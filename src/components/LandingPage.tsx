import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Waves, Shield, Users, AlertTriangle } from 'lucide-react';

type NavigateFunction = (screen: string) => void;

interface LandingPageProps {
  onNavigate: NavigateFunction;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1612214827065-c16505567204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwY29hc3RsaW5lJTIwYmx1ZXxlbnwxfHx8fDE3NTczMzAzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Ocean waves and coastline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/50"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Waves className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-white text-4xl font-bold mb-2">CoastalWatch</h1>
              <div className="text-blue-200 text-lg">Real-time Coastal Hazard Platform</div>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-white text-5xl font-bold mb-6 leading-tight">
            Real-time Coastal Hazard
            <br />
            Reporting and Monitoring
          </h2>

          {/* Subtitle */}
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
            Citizens can report ocean hazards quickly, officials monitor and verify incidents in real-time 
            to protect coastal communities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => onNavigate('auth', undefined, 'citizen')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              I am a Citizen
            </Button>
            
            <Button 
              onClick={() => onNavigate('auth', undefined, 'official')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Shield className="w-5 h-5 mr-2" />
              I am an Official
            </Button>
            
            <Button 
              onClick={() => onNavigate('auth', undefined, 'analyst')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              I am an Analyst
            </Button>
          </div>

          {/* Emergency Report Button */}
          <div className="mb-8">
            <Button 
              onClick={() => onNavigate('emergency-report')}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg rounded-xl shadow-lg border-2 border-red-400 transform hover:scale-105 transition-all duration-200"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              Emergency Report
            </Button>
            <p className="text-blue-200 text-sm mt-2">
              Use for urgent reports, no login required
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Users className="w-10 h-10 mx-auto mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold mb-2">Citizen Reporting</h3>
              <p className="text-blue-100">Quick and easy hazard reporting with photos and location data</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Shield className="w-10 h-10 mx-auto mb-4 text-green-300" />
              <h3 className="text-xl font-semibold mb-2">Official Verification</h3>
              <p className="text-blue-100">Real-time monitoring and verification by coastal authorities</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Waves className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Live Updates</h3>
              <p className="text-blue-100">Continuous monitoring with satellite and social media data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Waves className="w-8 h-8 mr-2 text-blue-400" />
            <span className="text-xl font-semibold">CoastalWatch</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}