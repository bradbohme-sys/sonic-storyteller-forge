import { motion } from 'framer-motion';
import { 
  AudioWaveform, 
  Play, 
  Pause, 
  Square, 
  Plus,
  Layers,
  Volume2,
  Lock,
  Eye,
  Settings,
  Scissors
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AudioTimeline() {
  const tracks = [
    { id: 1, name: 'Character Dialogue', type: 'dialogue', color: 'bg-purple-500', clips: 3, muted: false, locked: false },
    { id: 2, name: 'Background Music', type: 'music', color: 'bg-blue-500', clips: 1, muted: false, locked: false },
    { id: 3, name: 'Sound Effects', type: 'sfx', color: 'bg-green-500', clips: 5, muted: false, locked: false },
    { id: 4, name: 'Ambient Sounds', type: 'ambient', color: 'bg-teal-500', clips: 2, muted: true, locked: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="console-inset">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-audio-glow">
              <AudioWaveform className="w-6 h-6" />
              <span>Audio Timeline</span>
            </CardTitle>
            <CardDescription>
              Multi-track audio editing and synchronization workspace
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Transport Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="hover-audio">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="play" size="lg">
                  <Play className="w-5 h-5" />
                </Button>
                <Button variant="stop" size="lg">
                  <Pause className="w-5 h-5" />
                </Button>
                <Button variant="stop" size="lg">
                  <Square className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">00:00:12 / 02:30:45</span>
                <div className="text-sm text-audio-glow font-mono">120 BPM</div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="console" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Track
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="hover-audio">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5" />
              <span>Multi-Track Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Time Ruler */}
            <div className="mb-4 bg-console-track rounded border p-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0:00</span>
                <span>0:30</span>
                <span>1:00</span>
                <span>1:30</span>
                <span>2:00</span>
                <span>2:30</span>
              </div>
              <div className="mt-2 h-1 bg-border rounded">
                <div className="w-1/4 h-full bg-gradient-primary rounded"></div>
              </div>
            </div>

            {/* Audio Tracks */}
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex border rounded-lg overflow-hidden hover-audio"
                >
                  {/* Track Controls */}
                  <div className="w-48 bg-console-track p-4 border-r">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{track.name}</h4>
                      <div className={`w-3 h-3 ${track.color} rounded-full`}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={track.muted ? "mute" : "ghost"}
                        className="p-1 h-6 w-6"
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant={track.locked ? "destructive" : "ghost"}
                        className="p-1 h-6 w-6"
                      >
                        <Lock className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {track.clips} clips
                    </div>
                  </div>

                  {/* Track Timeline */}
                  <div className="flex-1 p-4 bg-waveform-background relative">
                    <div className="h-12 relative">
                      {/* Sample Audio Clips */}
                      {Array.from({ length: track.clips }).map((_, clipIndex) => (
                        <div
                          key={clipIndex}
                          className={`absolute h-10 ${track.color} opacity-80 rounded border border-white/20 flex items-center justify-center cursor-pointer hover:opacity-100 transition-opacity`}
                          style={{
                            left: `${clipIndex * 150 + 10}px`,
                            width: `${100 + clipIndex * 20}px`
                          }}
                        >
                          <Waveform className="w-4 h-4 text-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="hover-audio">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scissors className="w-5 h-5" />
              <span>Timeline Tools</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="console" className="h-16 flex-col">
                <Scissors className="w-5 h-5 mb-2" />
                Split Clip
              </Button>
              <Button variant="waveform" className="h-16 flex-col">
                <Layers className="w-5 h-5 mb-2" />
                Duplicate
              </Button>
              <Button variant="spectrum" className="h-16 flex-col">
                <Volume2 className="w-5 h-5 mb-2" />
                Fade In/Out
              </Button>
              <Button variant="audio" className="h-16 flex-col">
                <Settings className="w-5 h-5 mb-2" />
                Effects
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}