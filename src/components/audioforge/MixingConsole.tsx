import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sliders, 
  Volume2, 
  Headphones, 
  Settings, 
  RotateCcw,
  Zap,
  Play,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function MixingConsole() {
  const [masterVolume, setMasterVolume] = useState([75]);
  
  const channels = [
    { id: 1, name: 'Dialogue', volume: [65], pan: [0], solo: false, mute: false },
    { id: 2, name: 'Music', volume: [45], pan: [-20], solo: false, mute: false },
    { id: 3, name: 'SFX', volume: [55], pan: [10], solo: false, mute: false },
    { id: 4, name: 'Ambient', volume: [35], pan: [0], solo: false, mute: true }
  ];

  const eqBands = [
    { name: 'Low', frequency: '80Hz', gain: [0] },
    { name: 'Low-Mid', frequency: '400Hz', gain: [2] },
    { name: 'Mid', frequency: '2.5kHz', gain: [-1] },
    { name: 'High-Mid', frequency: '6kHz', gain: [1] },
    { name: 'High', frequency: '12kHz', gain: [0] }
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
              <Sliders className="w-6 h-6" />
              <span>Mixing Console</span>
            </CardTitle>
            <CardDescription>
              Professional audio mixing and mastering workspace
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Strips */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Channel Strips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                {channels.map((channel, index) => (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-console-track rounded-lg p-4 space-y-4"
                  >
                    {/* Channel Name */}
                    <div className="text-center">
                      <h4 className="font-medium text-sm">{channel.name}</h4>
                    </div>

                    {/* EQ Section */}
                    <div className="space-y-2">
                      <Label className="text-xs">EQ</Label>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">H</div>
                          <div className="w-8 h-16 bg-console-fader/20 rounded-full mx-auto relative">
                            <div className="w-2 h-2 bg-console-fader rounded-full absolute left-1/2 transform -translate-x-1/2 top-1/2"></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">M</div>
                          <div className="w-8 h-16 bg-console-fader/20 rounded-full mx-auto relative">
                            <div className="w-2 h-2 bg-console-fader rounded-full absolute left-1/2 transform -translate-x-1/2 top-1/3"></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">L</div>
                          <div className="w-8 h-16 bg-console-fader/20 rounded-full mx-auto relative">
                            <div className="w-2 h-2 bg-console-fader rounded-full absolute left-1/2 transform -translate-x-1/2 top-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pan Control */}
                    <div>
                      <Label className="text-xs">Pan</Label>
                      <div className="w-12 h-12 bg-console-fader/20 rounded-full mx-auto mt-2 relative">
                        <div className="w-3 h-3 bg-console-fader rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>

                    {/* Volume Fader */}
                    <div className="h-32 flex justify-center">
                      <div className="w-8 bg-console-fader/20 rounded-full relative">
                        <div 
                          className="w-6 h-6 bg-console-fader rounded-full absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
                          style={{ bottom: `${channel.volume[0]}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Solo/Mute Buttons */}
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant={channel.solo ? "play" : "ghost"}
                        className="flex-1 text-xs h-6"
                      >
                        S
                      </Button>
                      <Button 
                        size="sm" 
                        variant={channel.mute ? "mute" : "ghost"}
                        className="flex-1 text-xs h-6"
                      >
                        M
                      </Button>
                    </div>

                    {/* Volume Display */}
                    <div className="text-center text-xs text-muted-foreground">
                      {channel.volume[0]}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Master Section & Effects */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Master Section */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="w-5 h-5" />
                <span>Master Section</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Master Volume */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Master Volume</Label>
                  <span className="text-sm text-muted-foreground">{masterVolume[0]}%</span>
                </div>
                <Slider
                  value={masterVolume}
                  onValueChange={setMasterVolume}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Transport Controls */}
              <div className="flex space-x-2">
                <Button variant="play" className="flex-1">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="stop" className="flex-1">
                  <Square className="w-4 h-4" />
                </Button>
              </div>

              {/* Level Meters */}
              <div>
                <Label className="text-sm mb-2 block">Output Levels</Label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="text-xs text-center mb-1">L</div>
                    <div className="h-24 w-4 bg-border rounded-full overflow-hidden">
                      <div className="w-full bg-gradient-to-t from-console-led via-console-fader to-audio-peak h-3/4 mt-auto"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-center mb-1">R</div>
                    <div className="h-24 w-4 bg-border rounded-full overflow-hidden">
                      <div className="w-full bg-gradient-to-t from-console-led via-console-fader to-audio-peak h-2/3 mt-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Master EQ */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Master EQ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eqBands.map((band, index) => (
                  <div key={band.name}>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm">{band.name}</Label>
                      <span className="text-xs text-muted-foreground">{band.frequency}</span>
                    </div>
                    <Slider
                      value={band.gain}
                      min={-12}
                      max={12}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      {band.gain[0] > 0 ? '+' : ''}{band.gain[0]}dB
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="audio" className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Auto Mix
                </Button>
                <Button variant="console" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}