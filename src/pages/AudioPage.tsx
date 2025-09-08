import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, Music, Volume2, AudioWaveform, AudioLines, 
  Play, Edit, Copy, Search, Filter, SortAsc,
  Plus, BarChart3, Settings, Upload, Download
} from 'lucide-react';
import { AudioForge } from '@/components/AudioForge';

// Audio Library Grid Component
const AudioLibraryGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const audioFiles = [
    { id: 1, name: 'Hero Voice', type: 'voice', category: 'Character', duration: '0:45', quality: 'High' },
    { id: 2, name: 'Villain Voice', type: 'voice', category: 'Character', duration: '1:12', quality: 'High' },
    { id: 3, name: 'Epic Music', type: 'music', category: 'Background', duration: '3:24', quality: 'High' },
    { id: 4, name: 'Explosion SFX', type: 'sfx', category: 'Action', duration: '0:08', quality: 'High' },
    { id: 5, name: 'Ambient Forest', type: 'ambient', category: 'Environment', duration: '2:15', quality: 'High' },
    { id: 6, name: 'Dialogue Sample', type: 'dialogue', category: 'Conversation', duration: '0:32', quality: 'High' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Mic className="h-4 w-4" />;
      case 'music': return <Music className="h-4 w-4" />;
      case 'sfx': return <Volume2 className="h-4 w-4" />;
      case 'ambient': return <AudioLines className="h-4 w-4" />;
      case 'dialogue': return <AudioWaveform className="h-4 w-4" />;
      default: return <AudioLines className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'voice': return 'bg-primary/20 text-primary border-primary/30';
      case 'music': return 'bg-audio-treble/20 text-audio-treble border-audio-treble/30';
      case 'sfx': return 'bg-audio-peak/20 text-audio-peak border-audio-peak/30';
      case 'ambient': return 'bg-audio-mid/20 text-audio-mid border-audio-mid/30';
      case 'dialogue': return 'bg-audio-bass/20 text-audio-bass border-audio-bass/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audio files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <SortAsc className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Audio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {audioFiles.map((audio) => (
          <Card key={audio.id} className="hover-audio group cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(audio.type)}
                  <span className="font-medium text-sm">{audio.name}</span>
                </div>
                <Badge variant="outline" className={getTypeColor(audio.type)}>
                  {audio.type}
                </Badge>
              </div>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{audio.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{audio.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="text-console-led">{audio.quality}</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Play className="h-3 w-3 mr-1" />
                  Play
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Audio Card */}
        <Card className="hover-audio group cursor-pointer border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="p-4 flex flex-col items-center justify-center min-h-[200px]">
            <Plus className="h-8 w-8 text-primary mb-2" />
            <span className="text-primary font-medium">Add New Audio</span>
            <span className="text-xs text-muted-foreground text-center mt-1">
              Record, generate, or upload audio content
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Audio Statistics Component
const AudioStatistics = () => {
  const stats = [
    { label: 'Total Audio Files', value: '18', color: 'text-primary' },
    { label: 'Voice Samples', value: '6', color: 'text-primary' },
    { label: 'Music Tracks', value: '4', color: 'text-audio-treble' },
    { label: 'Sound Effects', value: '5', color: 'text-audio-peak' },
    { label: 'Dialogue', value: '2', color: 'text-audio-bass' },
    { label: 'Ambient Sounds', value: '1', color: 'text-audio-mid' },
    { label: 'AI Generated', value: '12', color: 'text-accent' },
    { label: 'Audio Quality', value: '98% High', color: 'text-console-led' },
    { label: 'Voice Cloning', value: '4 Characters', color: 'text-primary' },
    { label: 'Music Generation', value: '3 Tracks', color: 'text-audio-treble' },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Audio Statistics</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}:</span>
              <span className={`text-sm font-medium ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { icon: Mic, label: 'Record Voice Sample', color: 'bg-primary/20 hover:bg-primary/30 text-primary' },
    { icon: Music, label: 'Generate Music Track', color: 'bg-audio-treble/20 hover:bg-audio-treble/30 text-audio-treble' },
    { icon: Copy, label: 'Clone Character Voice', color: 'bg-primary/20 hover:bg-primary/30 text-primary' },
    { icon: Volume2, label: 'Create Sound Effect', color: 'bg-audio-peak/20 hover:bg-audio-peak/30 text-audio-peak' },
    { icon: Edit, label: 'Edit Audio Track', color: 'bg-muted/20 hover:bg-muted/30 text-foreground' },
    { icon: Music, label: 'Compose Music', color: 'bg-audio-treble/20 hover:bg-audio-treble/30 text-audio-treble' },
    { icon: BarChart3, label: 'Analyze Audio Quality', color: 'bg-console-led/20 hover:bg-console-led/30 text-console-led' },
    { icon: Settings, label: 'Batch Process Audio', color: 'bg-accent/20 hover:bg-accent/30 text-accent' },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className={`justify-start h-auto p-3 ${action.color}`}
            >
              <action.icon className="h-4 w-4 mr-2" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Audio Workflow Component
const AudioWorkflow = () => {
  const workflow = [
    '1. Create/Select Audio',
    '2. Record/Generate Audio Content',
    '3. Process & Edit Audio',
    '4. Apply Effects & Mixing',
    '5. Optimize Audio Quality',
    '6. Drag to Diagram Audio Column',
    '7. Connect to Characters & Video',
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AudioWaveform className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Audio Workflow</h3>
        </div>
        <div className="space-y-2">
          {workflow.map((step, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                {index + 1}
              </div>
              <span className="text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Audio Sidebar Component
const AudioSidebar = () => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-audio-glow flex items-center gap-2">
          <AudioLines className="h-5 w-5" />
          Audio Hub
        </h2>
        
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Mic className="h-4 w-4 mr-2" />
            Voice Processing
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Music className="h-4 w-4 mr-2" />
            Music Generation
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Volume2 className="h-4 w-4 mr-2" />
            Sound Effects
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <AudioLines className="h-4 w-4 mr-2" />
            Audio Library
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Edit className="h-4 w-4 mr-2" />
            Audio Editing
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Settings className="h-4 w-4 mr-2" />
            Mixing Console
          </Button>
        </div>
      </div>

      <Separator className="border-sidebar-border" />

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-sidebar-foreground">Active Audio Nodes</h3>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground p-2 rounded bg-sidebar-accent/50">
            <div className="flex justify-between">
              <span>Current Project:</span>
              <span className="text-console-led">Active</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground p-2 rounded bg-sidebar-accent/50">
            <div className="flex justify-between">
              <span>Processing Status:</span>
              <span className="text-console-led">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Audio Page Component
const AudioPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Clapper Bar */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-primary">🎬 LUCID CLAPPER BAR</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">🎭 Characters</Button>
            <Button variant="ghost" size="sm">🎪 Props/Scenes</Button>
            <Button variant="ghost" size="sm">✨ Effects</Button>
            <Button variant="ghost" size="sm">🖼 Images</Button>
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
              🎵 Audio
            </Button>
            <Button variant="ghost" size="sm">📽 Video</Button>
            <Button variant="ghost" size="sm">🎨 Storyboard</Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <AudioSidebar />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="library" className="h-full">
            <div className="p-6 border-b border-border">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="library">Audio Library</TabsTrigger>
                <TabsTrigger value="production">Audio Production</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="library" className="p-6 space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <AudioLibraryGrid />
                </div>
                <div className="space-y-6">
                  <AudioStatistics />
                  <QuickActions />
                  <AudioWorkflow />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="production" className="p-6">
              <AudioForge />
            </TabsContent>

            <TabsContent value="analytics" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AudioStatistics />
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Audio Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Audio Quality Score</span>
                          <span className="text-console-led">98%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-console-led h-2 rounded-full" style={{width: '98%'}}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Voice Cloning Accuracy</span>
                          <span className="text-primary">94%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{width: '94%'}}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AI Generation Quality</span>
                          <span className="text-audio-treble">96%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-audio-treble h-2 rounded-full" style={{width: '96%'}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Toolbar */}
        <div className="w-64 bg-sidebar border-l border-sidebar-border p-4 space-y-4">
          <h3 className="font-semibold text-sidebar-foreground">AI Tools</h3>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              💬 AI Chat
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              🧠 Context
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              🗄️ Memories
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              🔑 AI Providers
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              👥 Team
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              👤 Account
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              📊 Analytics
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground">
              🆘 Help
            </Button>
          </div>
          
          <Separator className="border-sidebar-border" />
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-console-led animate-audio-pulse"></div>
            <span className="text-xs text-console-led">System Online</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">🌐 Community</Button>
            <Button variant="ghost" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">👤 Profile</Button>
            <Button variant="ghost" size="sm">⚙️ Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPage;