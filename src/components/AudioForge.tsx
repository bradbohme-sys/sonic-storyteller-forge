import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Music, 
  Volume2, 
  AudioWaveform,
  Play, 
  Pause, 
  Square, 
  Settings,
  Layers,
  Sparkles,
  Headphones,
  Radio,
  FileAudio,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpeechSynthesisStudio } from './audioforge/SpeechSynthesisStudio';
import { MusicComposer } from './audioforge/MusicComposer';
import { SoundEffectsLibrary } from './audioforge/SoundEffectsLibrary';
import { AudioTimeline } from './audioforge/AudioTimeline';
import { MixingConsole } from './audioforge/MixingConsole';
import { VoiceProfileManager } from './audioforge/VoiceProfileManager';

interface AudioForgeProps {
  className?: string;
}

export function AudioForge({ className }: AudioForgeProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPlaying, setIsPlaying] = useState(false);

  const modules = [
    {
      id: 'speech',
      title: 'Speech Synthesis Studio',
      description: 'AI-powered voice generation with ElevenLabs',
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      component: SpeechSynthesisStudio
    },
    {
      id: 'music',
      title: 'Music Composer',
      description: 'Adaptive AI music generation & scoring',
      icon: Music,
      color: 'from-blue-500 to-cyan-500',
      component: MusicComposer
    },
    {
      id: 'sfx',
      title: 'Sound Effects Library',
      description: 'Foley generation & environmental audio',
      icon: Volume2,
      color: 'from-green-500 to-teal-500',
      component: SoundEffectsLibrary
    },
    {
      id: 'timeline',
      title: 'Audio Timeline',
      description: 'Multi-track editing & synchronization',
      icon: Waveform,
      color: 'from-orange-500 to-red-500',
      component: AudioTimeline
    },
    {
      id: 'mixing',
      title: 'Mixing Console',
      description: 'Professional audio mixing & mastering',
      icon: Settings,
      color: 'from-indigo-500 to-purple-500',
      component: MixingConsole
    },
    {
      id: 'voices',
      title: 'Voice Profiles',
      description: 'Character voice management & consistency',
      icon: Headphones,
      color: 'from-pink-500 to-rose-500',
      component: VoiceProfileManager
    }
  ];

  const stats = [
    { label: 'Audio Projects', value: '12', icon: FileAudio, trend: '+3' },
    { label: 'Voice Profiles', value: '8', icon: Mic, trend: '+2' },
    { label: 'Music Tracks', value: '24', icon: Music, trend: '+5' },
    { label: 'SFX Generated', value: '156', icon: Zap, trend: '+12' }
  ];

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* 🎵 AUDIOFORGE HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <AudioWaveform className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-audio-glow">AudioForge</h1>
                  <p className="text-sm text-muted-foreground">Revolutionary AI Audio Production</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={isPlaying ? "stop" : "play"}
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="animate-console-glow"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button variant="console" size="sm">
                <Square className="w-4 h-4" />
                Stop
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 🎛️ MAIN CONTENT */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* 🎵 NAVIGATION TABS */}
          <TabsList className="grid w-full grid-cols-7 bg-card/50 backdrop-blur-sm mb-8">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Layers className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <TabsTrigger 
                  key={module.id} 
                  value={module.id}
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {module.title.split(' ')[0]}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* 🎵 DASHBOARD TAB */}
          <TabsContent value="dashboard">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="console-inset hover-audio">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                              <div className="flex items-center space-x-2">
                                <p className="text-2xl font-bold text-audio-glow">{stat.value}</p>
                                <span className="text-xs text-console-led font-medium">
                                  {stat.trend}
                                </span>
                              </div>
                            </div>
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Module Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group cursor-pointer"
                      onClick={() => setActiveTab(module.id)}
                    >
                      <Card className="h-full hover-audio group-hover:shadow-audio-glow transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center group-hover:animate-audio-pulse`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{module.title}</CardTitle>
                              <CardDescription className="text-sm">
                                {module.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="audio" 
                            className="w-full group-hover:shadow-audio-glow"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Launch Module
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <Card className="console-inset">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Rapidly create audio content with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="waveform" className="h-20 flex-col">
                      <Mic className="w-6 h-6 mb-2" />
                      Generate Speech
                    </Button>
                    <Button variant="spectrum" className="h-20 flex-col">
                      <Music className="w-6 h-6 mb-2" />
                      Compose Music
                    </Button>
                    <Button variant="console" className="h-20 flex-col">
                      <Volume2 className="w-6 h-6 mb-2" />
                      Create SFX
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* 🎵 MODULE TABS */}
          {modules.map((module) => {
            const Component = module.component;
            return (
              <TabsContent key={module.id} value={module.id}>
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Component />
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}