import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag, 
  Bookmark,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  TrendingUp,
  Clock,
  Eye,
  MoreVertical
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type NavigateFunction = (screen: string) => void;

interface SocialFeedProps {
  user: any;
  onNavigate: NavigateFunction;
}

interface SocialPost {
  id: string;
  platform: 'Twitter' | 'Facebook' | 'Instagram' | 'YouTube';
  username: string;
  displayName: string;
  text: string;
  media?: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  timestamp: string;
  lat?: number;
  lng?: number;
  location?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  keywords: string[];
  verified: boolean;
}

export function SocialFeed({ user, onNavigate }: SocialFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Twitter', 'Facebook', 'Instagram', 'YouTube']);
  const [timeFilter, setTimeFilter] = useState('24h');
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock social media posts
  const mockPosts: SocialPost[] = [
    {
      id: 's_001',
      platform: 'Twitter',
      username: '@coastwatch_chennai',
      displayName: 'Chennai Coast Watch',
      text: 'Unusual high tides at Marina Beach today! Water levels higher than normal. Locals advised to stay cautious. #ChennaiBeach #HighTide #SafetyFirst',
      media: ['https://images.unsplash.com/photo-1570408002311-8ed18fa0a9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwZmxvb2RpbmclMjB3YXZlc3xlbnwxfHx8fDE3NTczMzAzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      sentiment: 'negative',
      timestamp: '2025-09-08T15:30:00Z',
      lat: 13.0827,
      lng: 80.2707,
      location: 'Marina Beach, Chennai',
      engagement: { likes: 245, comments: 67, shares: 89 },
      keywords: ['high tide', 'marina beach', 'safety'],
      verified: true
    },
    {
      id: 's_002',
      platform: 'Facebook',
      username: 'fishermen.association.chennai',
      displayName: 'Chennai Fishermen Association',
      text: 'Alert for all fishing boats: Strong currents and high waves reported near Royapuram coast. Boats advised to return to harbor immediately. Weather conditions deteriorating.',
      sentiment: 'negative',
      timestamp: '2025-09-08T14:45:00Z',
      lat: 13.1067,
      lng: 80.2969,
      location: 'Royapuram, Chennai',
      engagement: { likes: 156, comments: 34, shares: 67 },
      keywords: ['fishing boats', 'strong currents', 'weather alert'],
      verified: false
    },
    {
      id: 's_003',
      platform: 'Instagram',
      username: '@beach_photographer_chennai',
      displayName: 'Chennai Beach Photography',
      text: 'Captured these dramatic waves this morning at Elliot Beach! Nature showing its power 🌊 #ElliottBeach #Waves #Photography #Chennai',
      media: ['https://images.unsplash.com/photo-1612214827065-c16505567204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwZmxvb2RpbmclMjB3YXZlc3xlbnwxfHx8fDE3NTczMzAzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      sentiment: 'neutral',
      timestamp: '2025-09-08T12:20:00Z',
      lat: 13.0067,
      lng: 80.2206,
      location: 'Elliot Beach, Chennai',
      engagement: { likes: 1024, comments: 156, shares: 78, views: 5420 },
      keywords: ['elliott beach', 'waves', 'photography'],
      verified: false
    },
    {
      id: 's_004',
      platform: 'YouTube',
      username: 'TamilNaduWeatherUpdate',
      displayName: 'Tamil Nadu Weather Updates',
      text: 'LIVE: Coastal Weather Alert - High wave advisory for Chennai and surrounding areas. Expert analysis and safety recommendations.',
      sentiment: 'neutral',
      timestamp: '2025-09-08T13:15:00Z',
      engagement: { likes: 89, comments: 45, shares: 23, views: 2340 },
      keywords: ['weather alert', 'coastal warning', 'expert analysis'],
      verified: true
    },
    {
      id: 's_005',
      platform: 'Twitter',
      username: '@emergency_chennai',
      displayName: 'Chennai Emergency Services',
      text: '🚨 UPDATE: Coast Guard has rescued 3 fishermen stranded due to rough seas near Ennore. All safe. Public advised to avoid beach areas during high tide hours.',
      sentiment: 'positive',
      timestamp: '2025-09-08T16:00:00Z',
      lat: 13.2167,
      lng: 80.3167,
      location: 'Ennore, Chennai',
      engagement: { likes: 567, comments: 89, shares: 234 },
      keywords: ['coast guard', 'rescue', 'fishermen', 'ennore'],
      verified: true
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newPost: SocialPost = {
          id: `s_${Date.now()}`,
          platform: ['Twitter', 'Facebook', 'Instagram'][Math.floor(Math.random() * 3)] as any,
          username: '@new_user_' + Math.floor(Math.random() * 1000),
          displayName: 'New Observer',
          text: 'Just observed unusual wave patterns near the coast. Staying alert! #CoastalWatch',
          sentiment: 'neutral',
          timestamp: new Date().toISOString(),
          engagement: { 
            likes: Math.floor(Math.random() * 100), 
            comments: Math.floor(Math.random() * 50), 
            shares: Math.floor(Math.random() * 25) 
          },
          keywords: ['waves', 'coastal', 'observation'],
          verified: false
        };
        setPosts(prev => [newPost, ...prev]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="w-4 h-4 text-blue-500" />;
      case 'Facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'YouTube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800">Alert</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Neutral</Badge>;
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesPlatform = selectedPlatforms.includes(post.platform);
    const matchesSearch = !searchQuery || 
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Time filter
    const postTime = new Date(post.timestamp);
    const now = new Date();
    const hoursDiff = (now.getTime() - postTime.getTime()) / (1000 * 60 * 60);
    
    let matchesTime = true;
    switch (timeFilter) {
      case '1h':
        matchesTime = hoursDiff <= 1;
        break;
      case '6h':
        matchesTime = hoursDiff <= 6;
        break;
      case '24h':
        matchesTime = hoursDiff <= 24;
        break;
    }
    
    return matchesPlatform && matchesSearch && matchesTime;
  });

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
              <h1 className="text-xl font-semibold">Social Media Feed</h1>
              <p className="text-sm text-gray-600">Real-time coastal hazard mentions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Monitoring</span>
            </div>
            <Badge variant="outline" className="bg-blue-50">
              {filteredPosts.length} posts
            </Badge>
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
              placeholder="Search posts by keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Platform Toggles */}
          <div className="flex space-x-2">
            {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map(platform => (
              <Button
                key={platform}
                variant={selectedPlatforms.includes(platform) ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  if (selectedPlatforms.includes(platform)) {
                    setSelectedPlatforms(prev => prev.filter(p => p !== platform));
                  } else {
                    setSelectedPlatforms(prev => [...prev, platform]);
                  }
                }}
                className="flex items-center space-x-1"
              >
                {getPlatformIcon(platform)}
                <span>{platform}</span>
              </Button>
            ))}
          </div>
          
          {/* Time Filter */}
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <Clock className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1h</SelectItem>
              <SelectItem value="6h">Last 6h</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-4xl mx-auto p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6">
                <div className="animate-pulse">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{post.displayName}</h3>
                          {post.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                          <span className="text-gray-500 text-sm">{post.username}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {new Date(post.timestamp).toLocaleString()}
                          </span>
                          {post.location && (
                            <>
                              <span className="text-gray-300">•</span>
                              <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                {post.location}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getSentimentBadge(post.sentiment)}
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed mb-3">
                      {post.text}
                    </p>
                    
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.keywords.map(keyword => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          #{keyword}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Media */}
                    {post.media && post.media.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        {post.media.map((mediaUrl, index) => (
                          <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={mediaUrl}
                              alt="Social media post content"
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.engagement.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.engagement.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>{post.engagement.shares}</span>
                      </div>
                      {post.engagement.views && (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.engagement.views}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        View on Map
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredPosts.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </Card>
            )}
            
            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setLoading(true)}
                  className="px-8"
                >
                  Load More Posts
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}