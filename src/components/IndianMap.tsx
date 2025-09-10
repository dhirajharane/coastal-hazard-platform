import React, { useEffect, useState, useRef } from "react";
import exampleImage from "figma:asset/919dd2f774e20062ad996383bcb38694adde0b1d.png";

interface IndianMapProps {
  reports: any[];
  heatmapOpacity: number;
  onClusterClick: (clusterId: string) => void;
}

interface StateData {
  id: string;
  name: string;
  path: string;
  x: number;
  y: number;
}

interface HeatmapZone {
  id: string;
  x: number;
  y: number;
  radius: number;
  intensity: number;
  alertLevel: 'high' | 'medium' | 'low';
}

export function IndianMap({
  reports,
  heatmapOpacity,
  onClusterClick,
}: IndianMapProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedLighthouse, setSelectedLighthouse] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Enhanced Indian states with more accurate paths
  const indianStates: StateData[] = [
    {
      id: "jammu-kashmir",
      name: "Jammu Kashmir",
      path: "M240,45 L280,40 L310,50 L340,45 L350,65 L330,85 L300,90 L270,85 L240,70 Z",
      x: 295,
      y: 67,
    },
    {
      id: "himachal-pradesh",
      name: "Himachal Pradesh",
      path: "M300,90 L340,85 L360,100 L350,120 L320,125 L300,115 Z",
      x: 330,
      y: 107,
    },
    {
      id: "punjab",
      name: "Punjab",
      path: "M270,85 L300,90 L300,115 L285,130 L270,125 L260,110 Z",
      x: 280,
      y: 107,
    },
    {
      id: "haryana",
      name: "Haryana",
      path: "M285,130 L300,115 L320,125 L330,140 L315,155 L300,150 L285,145 Z",
      x: 307,
      y: 137,
    },
    {
      id: "uttarakhand",
      name: "Uttarakhand",
      path: "M320,125 L350,120 L370,135 L360,155 L340,160 L320,150 Z",
      x: 345,
      y: 140,
    },
    {
      id: "uttar-pradesh",
      name: "Uttar Pradesh",
      path: "M300,150 L330,140 L360,155 L400,150 L420,170 L410,190 L380,195 L350,190 L320,185 L300,175 Z",
      x: 360,
      y: 170,
    },
    {
      id: "bihar",
      name: "Bihar",
      path: "M410,190 L450,185 L470,200 L460,220 L440,225 L420,215 L410,200 Z",
      x: 440,
      y: 205,
    },
    {
      id: "sikkim",
      name: "Sikkim",
      path: "M470,200 L485,195 L490,205 L485,215 L470,210 Z",
      x: 477,
      y: 205,
    },
    {
      id: "arunachal-pradesh",
      name: "Arunachal Pradesh",
      path: "M490,150 L540,145 L570,160 L565,185 L530,190 L500,185 L485,170 Z",
      x: 527,
      y: 167,
    },
    {
      id: "nagaland",
      name: "Nagaland",
      path: "M530,190 L565,185 L575,200 L570,215 L545,220 L530,205 Z",
      x: 552,
      y: 202,
    },
    {
      id: "manipur",
      name: "Manipur",
      path: "M545,220 L570,215 L580,230 L575,245 L550,250 L545,235 Z",
      x: 562,
      y: 232,
    },
    {
      id: "mizoram",
      name: "Mizoram",
      path: "M530,250 L550,245 L560,260 L555,275 L535,280 L530,265 Z",
      x: 545,
      y: 262,
    },
    {
      id: "tripura",
      name: "Tripura",
      path: "M500,240 L530,235 L540,250 L535,265 L505,270 L500,255 Z",
      x: 520,
      y: 252,
    },
    {
      id: "assam",
      name: "Assam",
      path: "M470,200 L500,185 L530,190 L530,235 L500,240 L480,235 L470,220 Z",
      x: 500,
      y: 217,
    },
    {
      id: "west-bengal",
      name: "West Bengal",
      path: "M440,225 L470,220 L480,235 L500,240 L505,270 L485,290 L460,285 L440,270 L430,250 Z",
      x: 470,
      y: 250,
    },
    {
      id: "jharkhand",
      name: "Jharkhand",
      path: "M380,225 L420,215 L440,225 L440,250 L420,265 L395,260 L380,245 Z",
      x: 410,
      y: 242,
    },
    {
      id: "odisha",
      name: "Odisha",
      path: "M420,265 L440,250 L460,270 L470,295 L450,320 L425,315 L410,295 L415,280 Z",
      x: 440,
      y: 285,
    },
    {
      id: "rajasthan",
      name: "Rajasthan",
      path: "M200,120 L270,110 L285,130 L285,180 L270,220 L240,240 L200,235 L170,210 L160,180 L170,150 Z",
      x: 225,
      y: 180,
    },
    {
      id: "gujarat",
      name: "Gujarat",
      path: "M170,210 L240,240 L250,280 L230,320 L190,340 L150,330 L130,300 L140,270 L160,250 Z",
      x: 190,
      y: 285,
    },
    {
      id: "madhya-pradesh",
      name: "Madhya Pradesh",
      path: "M270,220 L350,190 L380,195 L380,225 L395,260 L380,290 L350,310 L320,315 L290,310 L270,285 L250,260 Z",
      x: 325,
      y: 252,
    },
    {
      id: "chhattisgarh",
      name: "Chhattisgarh",
      path: "M380,290 L395,260 L420,265 L415,295 L395,320 L375,325 L360,315 L365,300 Z",
      x: 387,
      y: 292,
    },
    {
      id: "maharashtra",
      name: "Maharashtra",
      path: "M230,320 L290,310 L320,315 L350,310 L365,340 L350,380 L320,400 L280,395 L250,380 L220,360 Z",
      x: 295,
      y: 355,
    },
    {
      id: "goa",
      name: "Goa",
      path: "M220,380 L250,375 L255,390 L250,405 L225,410 L220,395 Z",
      x: 237,
      y: 392,
    },
    {
      id: "karnataka",
      name: "Karnataka",
      path: "M250,380 L320,400 L340,430 L320,470 L290,490 L260,485 L240,460 L230,430 Z",
      x: 285,
      y: 440,
    },
    {
      id: "andhra-pradesh",
      name: "Andhra Pradesh",
      path: "M340,430 L395,320 L425,315 L450,340 L460,380 L440,420 L410,450 L380,460 L350,455 Z",
      x: 400,
      y: 390,
    },
    {
      id: "telangana",
      name: "Telangana",
      path: "M350,310 L395,320 L410,340 L395,365 L375,370 L355,365 L345,345 Z",
      x: 377,
      y: 345,
    },
    {
      id: "kerala",
      name: "Kerala",
      path: "M240,460 L290,490 L295,530 L275,570 L245,575 L225,555 L215,515 Z",
      x: 255,
      y: 517,
    },
    {
      id: "tamil-nadu",
      name: "Tamil Nadu",
      path: "M290,490 L380,460 L410,480 L420,520 L400,560 L370,590 L340,595 L310,590 L285,570 L275,530 Z",
      x: 350,
      y: 527,
    },
    {
      id: "delhi",
      name: "Delhi",
      path: "M300,150 L310,145 L315,155 L310,165 L300,170 L295,160 Z",
      x: 305,
      y: 157,
    },
  ];

  // Dynamic heatmap zones based on reports
  const heatmapZones: HeatmapZone[] = [
    { id: 'zone1', x: 380, y: 540, radius: 60, intensity: 85, alertLevel: 'high' },
    { id: 'zone2', x: 255, y: 500, radius: 45, intensity: 65, alertLevel: 'medium' },
    { id: 'zone3', x: 190, y: 320, radius: 35, intensity: 40, alertLevel: 'low' },
    { id: 'zone4', x: 440, y: 285, radius: 40, intensity: 70, alertLevel: 'medium' },
    { id: 'zone5', x: 470, y: 250, radius: 30, intensity: 45, alertLevel: 'low' },
  ];

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 80) return "#DC2626"; // Alert red
    if (urgency >= 60) return "#FACC15"; // Warning yellow
    return "#16A34A"; // Safe green
  };

  const getHeatmapColor = (alertLevel: 'high' | 'medium' | 'low') => {
    switch (alertLevel) {
      case 'high': return '#DC2626';
      case 'medium': return '#D97706';
      case 'low': return '#059669';
    }
  };

  const getHeatmapAnimation = (alertLevel: 'high' | 'medium' | 'low') => {
    switch (alertLevel) {
      case 'high': return 'animate-ping';
      case 'medium': return 'animate-pulse';
      case 'low': return '';
    }
  };

  const getLighthouseAnimation = (report: any) => {
    if (report.status === 'verified') return 'lighthouse-steady';
    if (report.urgency >= 80) return 'lighthouse-urgent';
    return 'lighthouse-flicker';
  };

  const handleLighthouseClick = (reportId: string, position: { x: number, y: number }) => {
    setSelectedLighthouse(reportId);
    
    // Smooth zoom to lighthouse
    const targetZoom = 2;
    const targetX = -(position.x * targetZoom - 300);
    const targetY = -(position.y * targetZoom - 325);
    
    // Animate zoom
    const animateZoom = (start: number) => {
      const duration = 800;
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setZoomLevel(1 + (targetZoom - 1) * easeOut);
      setPanX(targetX * easeOut);
      setPanY(targetY * easeOut);
      
      if (progress < 1) {
        requestAnimationFrame(() => animateZoom(start));
      } else {
        // Open report details panel after zoom completes
        setTimeout(() => onClusterClick(reportId), 200);
      }
    };
    
    requestAnimationFrame(() => animateZoom(Date.now()));
  };

  const resetZoom = () => {
    const animateReset = (start: number) => {
      const duration = 600;
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setZoomLevel(zoomLevel * (1 - easeOut) + 1 * easeOut);
      setPanX(panX * (1 - easeOut));
      setPanY(panY * (1 - easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(() => animateReset(start));
      }
    };
    
    setSelectedLighthouse(null);
    requestAnimationFrame(() => animateReset(Date.now()));
  };

  return (
    <div className="w-full h-full relative bg-gray-900 overflow-hidden">
      {/* Custom CSS for lighthouse animations */}
      <style>{`
        @keyframes lighthouse-flicker {
          0%, 100% { opacity: 0.8; }
          25% { opacity: 0.3; }
          50% { opacity: 0.9; }
          75% { opacity: 0.2; }
        }
        @keyframes lighthouse-steady {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes lighthouse-urgent {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes heatmap-blink-fast {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.2; }
        }
        @keyframes heatmap-blink-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.1; }
        }
        .lighthouse-flicker { animation: lighthouse-flicker 2s infinite; }
        .lighthouse-steady { animation: lighthouse-steady 3s infinite; }
        .lighthouse-urgent { animation: lighthouse-urgent 1s infinite; }
        .heatmap-blink-fast { animation: heatmap-blink-fast 0.8s infinite; }
        .heatmap-blink-slow { animation: heatmap-blink-slow 1.5s infinite; }
      `}</style>

      {/* Reference Image - Hidden but imported */}
      <div className="hidden">
        <img src={exampleImage} alt="India Map Reference" />
      </div>

      {/* Reset Zoom Button */}
      {zoomLevel > 1.1 && (
        <button
          onClick={resetZoom}
          className="absolute top-4 left-4 z-20 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg"
        >
          Reset View
        </button>
      )}

      {/* SVG Map Container with smooth transform */}
      <svg
        ref={svgRef}
        viewBox="0 0 600 650"
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          filter: "drop-shadow(0 0 10px rgba(29, 78, 216, 0.3))",
          transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`,
        }}
      >
        {/* Dark background */}
        <rect width="600" height="650" fill="#0f172a" />

        {/* Animated Heatmap Zones */}
        <defs>
          <radialGradient id="heatmapHigh" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity={heatmapOpacity * 0.8} />
            <stop offset="50%" stopColor="#DC2626" stopOpacity={heatmapOpacity * 0.4} />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatmapMedium" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D97706" stopOpacity={heatmapOpacity * 0.7} />
            <stop offset="50%" stopColor="#D97706" stopOpacity={heatmapOpacity * 0.3} />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatmapLow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#059669" stopOpacity={heatmapOpacity * 0.5} />
            <stop offset="50%" stopColor="#059669" stopOpacity={heatmapOpacity * 0.2} />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Heatmap Layer */}
        <g className="heatmap-layer">
          {heatmapZones.map((zone) => (
            <circle
              key={zone.id}
              cx={zone.x}
              cy={zone.y}
              r={zone.radius}
              fill={`url(#heatmap${zone.alertLevel.charAt(0).toUpperCase() + zone.alertLevel.slice(1)})`}
              className={
                zone.alertLevel === 'high' ? 'heatmap-blink-fast' :
                zone.alertLevel === 'medium' ? 'heatmap-blink-slow' : ''
              }
            />
          ))}
        </g>

        {/* Indian States */}
        <g>
          {indianStates.map((state) => (
            <g key={state.id}>
              {/* State Path */}
              <path
                d={state.path}
                fill={
                  hoveredState === state.id
                    ? "rgba(59, 130, 246, 0.4)"
                    : selectedState === state.id
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(30, 41, 59, 0.8)"
                }
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.9"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredState(state.id)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => setSelectedState(state.id)}
              />

              {/* State Label */}
              <text
                x={state.x}
                y={state.y}
                fill="white"
                fontSize="8"
                fontWeight="500"
                textAnchor="middle"
                className="pointer-events-none select-none opacity-80"
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {state.name}
              </text>
            </g>
          ))}
        </g>

        {/* Enhanced Coastal Boundaries */}
        <g stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none">
          <path d="M150,330 L190,340 L230,380 L220,410 L240,460 L290,490 L410,480 L450,340 L470,295 L440,270 L485,290 L505,270" />
        </g>

        {/* Enhanced Lighthouse Markers */}
        {reports.slice(0, 12).map((report, index) => {
          const basePositions = [
            { x: 350, y: 527 }, // Tamil Nadu
            { x: 255, y: 517 }, // Kerala
            { x: 400, y: 390 }, // Andhra Pradesh
            { x: 285, y: 440 }, // Karnataka
            { x: 295, y: 355 }, // Maharashtra
            { x: 190, y: 285 }, // Gujarat
            { x: 440, y: 285 }, // Odisha
            { x: 470, y: 250 }, // West Bengal
          ];

          const position = basePositions[index % basePositions.length];
          const offset = {
            x: position.x + ((index % 3) - 1) * 18,
            y: position.y + ((Math.floor(index / 3) % 3) - 1) * 18,
          };

          const urgencyColor = getUrgencyColor(report.urgency);
          const animationClass = getLighthouseAnimation(report);

          return (
            <g key={report.id} className="lighthouse-group">
              {/* Lighthouse Base */}
              <circle
                cx={offset.x}
                cy={offset.y}
                r="3"
                fill="#374151"
                stroke="white"
                strokeWidth="1"
              />

              {/* Main Lighthouse Beam */}
              <circle
                cx={offset.x}
                cy={offset.y}
                r={report.urgency >= 80 ? "35" : report.status === 'verified' ? "25" : "20"}
                fill="none"
                stroke={urgencyColor}
                strokeWidth="2"
                opacity="0.6"
                className={animationClass}
              />

              {/* Secondary Beam */}
              <circle
                cx={offset.x}
                cy={offset.y}
                r={report.urgency >= 80 ? "20" : "15"}
                fill="none"
                stroke={urgencyColor}
                strokeWidth="1"
                opacity="0.8"
                className={animationClass}
              />

              {/* Lighthouse Marker */}
              <circle
                cx={offset.x}
                cy={offset.y}
                r="10"
                fill={urgencyColor}
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => handleLighthouseClick(report.id, offset)}
                style={{
                  filter: `drop-shadow(0 0 12px ${urgencyColor})`,
                }}
              />

              {/* Status Indicator */}
              <circle
                cx={offset.x + 8}
                cy={offset.y - 8}
                r="4"
                fill={
                  report.status === 'verified' ? '#16A34A' :
                  report.status === 'dismissed' ? '#DC2626' : '#FACC15'
                }
                stroke="white"
                strokeWidth="1"
                className="pointer-events-none"
              />

              {/* Urgent Alert Ring */}
              {report.urgency >= 80 && (
                <circle
                  cx={offset.x}
                  cy={offset.y}
                  r="45"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="1"
                  opacity="0.3"
                  className="animate-ping"
                  style={{ animationDuration: "2s" }}
                />
              )}
            </g>
          );
        })}

        {/* Enhanced Report Clusters */}
        <g>
          {/* High-density cluster near Chennai */}
          <circle
            cx="380"
            cy="540"
            r="32"
            fill="#DC2626"
            fillOpacity="0.8"
            stroke="white"
            strokeWidth="3"
            className="cursor-pointer hover:scale-110 transition-all duration-200 animate-pulse"
            onClick={() => onClusterClick("cluster_chennai")}
            style={{ filter: "drop-shadow(0 0 15px #DC2626)" }}
          />
          <text
            x="380"
            y="546"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            className="pointer-events-none"
          >
            8
          </text>

          {/* Medium cluster near Kochi */}
          <circle
            cx="255"
            cy="500"
            r="24"
            fill="#D97706"
            fillOpacity="0.8"
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer hover:scale-110 transition-all duration-200 heatmap-blink-slow"
            onClick={() => onClusterClick("cluster_kochi")}
            style={{ filter: "drop-shadow(0 0 12px #D97706)" }}
          />
          <text
            x="255"
            y="506"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            className="pointer-events-none"
          >
            3
          </text>

          {/* Low priority cluster near Gujarat */}
          <circle
            cx="190"
            cy="320"
            r="18"
            fill="#059669"
            fillOpacity="0.8"
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => onClusterClick("cluster_gujarat")}
            style={{ filter: "drop-shadow(0 0 8px #059669)" }}
          />
          <text
            x="190"
            y="326"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            className="pointer-events-none"
          >
            2
          </text>
        </g>
      </svg>

      {/* Enhanced Map Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 text-sm border border-gray-600 shadow-xl">
        <h4 className="font-semibold mb-3 text-white">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gray-700 border-2 border-white rounded"></div>
            <span className="text-gray-200">Indian States</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-gray-200">High Alert (80+)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
            <span className="text-gray-200">Medium Alert (60-79)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <span className="text-gray-200">Low Alert (0-59)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-200 text-xs">Verified</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-200 text-xs">Unverified</span>
          </div>
        </div>
      </div>

      {/* State Info Panel */}
      {selectedState && (
        <div className="absolute top-4 right-4 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 max-w-xs border border-gray-600 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white">
              {indianStates.find((s) => s.id === selectedState)?.name}
            </h4>
            <button
              onClick={() => setSelectedState(null)}
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              ×
            </button>
          </div>
          <div className="text-sm text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span>Active Reports:</span>
              <span className="text-white font-medium">
                {Math.floor(Math.random() * 8) + 1}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Last Update:</span>
              <span className="text-white font-medium">
                {Math.floor(Math.random() * 30) + 1} min ago
              </span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Urgency:</span>
              <span className="text-yellow-400 font-medium">
                {Math.floor(Math.random() * 40) + 40}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hovered State Tooltip */}
      {hoveredState && !selectedState && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded px-3 py-2 border border-gray-600">
          <span className="text-white text-sm font-medium">
            {indianStates.find((s) => s.id === hoveredState)?.name}
          </span>
        </div>
      )}
    </div>
  );
}