import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Headphones,
  Volume2,
  RotateCcw,
  Settings,
  Target,
  Compass,
  Orbit,
  Radio,
  Waves,
  Circle,
  Box,
  Maximize,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCw,
  Move3D,
  Zap,
  Activity,
  Gauge,
  Eye,
  EyeOff,
  Link,
  Unlink,
  Monitor,
  Smartphone,
  Tv,
  Speaker,
  Mic
} from 'lucide-react';

interface SpatialAudioStudioProps {
  className?: string;
}

export function SpatialAudioStudio({ className }: SpatialAudioStudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [spatialMode, setSpatialMode] = useState('binaural');
  const [roomSize, setRoomSize] = useState([50]);
  const [reverbAmount, setReverbAmount] = useState([30]);
  const [listenerPosition, setListenerPosition] = useState({ x: 0, y: 0, z: 0 });
  const [cpuUsage, setCpuUsage] = useState(23);

  const audioObjects = [
    {
      id: 1,
      name: 'Voice Character',
      type: 'mono',
      position: { x: 0, y: 0, z: -2 },
      distance: 2.0,
      azimuth: 0,
      elevation: 0,
      volume: [85],
      spread: [30],
      doppler: true,
      occlusion: [0],
      reflection: [40],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Background Music',
      type: 'stereo',
      position: { x: 0, y: 1, z: -1 },
      distance: 1.5,
      azimuth: 0,
      elevation: 30,
      volume: [60],
      spread: [90],
      doppler: false,
      occlusion: [0],
      reflection: [60],
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Ambient Forest',
      type: 'ambisonics',
      position: { x: 0, y: 0, z: 0 },
      distance: 10.0,
      azimuth: 0,
      elevation: 0,
      volume: [40],
      spread: [180],
      doppler: false,
      occlusion: [0],
      reflection: [80],
      color: 'bg-green-600'
    },
    {
      id: 4,
      name: 'Footsteps',
      type: 'mono',
      position: { x: -1, y: -0.5, z: -1 },
      distance: 1.2,
      azimuth: -45,
      elevation: -15,
      volume: [70],
      spread: [15],
      doppler: true,
      occlusion: [20],
      reflection: [25],
      color: 'bg-orange-500'
    }
  ];

  const presets = [
    { name: 'Headphones', type: 'binaural', icon: Headphones },
    { name: '5.1 Surround', type: 'surround_51', icon: Speaker },
    { name: '7.1 Surround', type: 'surround_71', icon: Speaker },
    { name: 'Dolby Atmos', type: 'atmos', icon: Circle },
    { name: 'VR/AR', type: 'vr', icon: Box },
    { name: 'Mobile', type: 'mobile', icon: Smartphone }
  ];

  const environments = [
    { name: 'Concert Hall', size: 'Large', reverb: 80, absorption: 20, diffusion: 90 },
    { name: 'Studio Room', size: 'Medium', reverb: 40, absorption: 60, diffusion: 70 },
    { name: 'Cathedral', size: 'Very Large', reverb: 95, absorption: 10, diffusion: 95 },
    { name: 'Outdoor', size: 'Infinite', reverb: 5, absorption: 95, diffusion: 30 },
    { name: 'Small Room', size: 'Small', reverb: 25, absorption: 70, diffusion: 50 },
    { name: 'Anechoic Chamber', size: 'Medium', reverb: 0, absorption: 100, diffusion: 0 }
  ];

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-200/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sphere className="h-6 w-6 text-purple-500" />
            Spatial Audio Studio - 3D Edition
          </CardTitle>
          <p className="text-muted-foreground">
            Professional 3D spatial audio with binaural rendering, surround sound, and immersive VR/AR support
          </p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-green-500" />
              <span>Real-time 3D Processing</span>
            </div>
            <div className="flex items-center gap-1">
              <Headphones className="h-4 w-4 text-blue-500" />
              <span>Binaural Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <Sphere className="h-4 w-4 text-purple-500" />
              <span>360° Ambisonics</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="spatial" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="spatial">3D Positioning</TabsTrigger>
          <TabsTrigger value="binaural">Binaural</TabsTrigger>
          <TabsTrigger value="surround">Surround</TabsTrigger>
          <TabsTrigger value="ambisonics">Ambisonics</TabsTrigger>
          <TabsTrigger value="vr">VR/AR</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* 3D Positioning Tab */}
        <TabsContent value="spatial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3D Visualizer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Move3D className="h-5 w-5 text-blue-500" />
                  3D Audio Scene Visualizer
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Top View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Orbit className="h-4 w-4 mr-1" />
                    Orbit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Target className="h-4 w-4 mr-1" />
                    First Person
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  {/* Listener Position (Center) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="text-xs mt-1 text-center font-medium">Listener</div>
                  </div>

                  {/* Audio Objects */}
                  {audioObjects.map((obj) => {
                    const x = 50 + (obj.position.x * 20); // Convert to percentage
                    const y = 50 + (obj.position.z * 20); // Z becomes Y in top view
                    return (
                      <div
                        key={obj.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <div className={`w-3 h-3 ${obj.color} rounded-full border border-white shadow-md`}></div>
                        <div className="text-xs mt-1 text-center whitespace-nowrap">{obj.name}</div>
                      </div>
                    );
                  })}

                  {/* Distance Circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border border-muted-foreground/20 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-muted-foreground/10 rounded-full"></div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-muted-foreground">X: Left/Right</div>
                    <div className="font-medium">{listenerPosition.x.toFixed(1)}m</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Y: Up/Down</div>
                    <div className="font-medium">{listenerPosition.y.toFixed(1)}m</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Z: Front/Back</div>
                    <div className="font-medium">{listenerPosition.z.toFixed(1)}m</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Object Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Audio Object Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Selected Audio Object</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {audioObjects.map((obj) => (
                        <SelectItem key={obj.id} value={obj.id.toString()}>
                          {obj.name} ({obj.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">X Position</Label>
                    <Slider
                      defaultValue={[0]}
                      min={-10}
                      max={10}
                      step={0.1}
                    />
                    <div className="text-xs text-center">0.0m</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Y Position</Label>
                    <Slider
                      defaultValue={[0]}
                      min={-5}
                      max={5}
                      step={0.1}
                    />
                    <div className="text-xs text-center">0.0m</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Z Position</Label>
                    <Slider
                      defaultValue={[-2]}
                      min={-10}
                      max={10}
                      step={0.1}
                    />
                    <div className="text-xs text-center">-2.0m</div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Distance</Label>
                    <div className="text-lg font-bold">2.0m</div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Azimuth</Label>
                    <div className="text-lg font-bold">0°</div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Elevation</Label>
                    <div className="text-lg font-bold">0°</div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Volume</Label>
                    <Slider defaultValue={[85]} min={0} max={100} />
                    <div className="text-xs text-center">85%</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Doppler Effect</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Sound Spread</Label>
                    <Slider defaultValue={[30]} min={0} max={180} />
                    <div className="text-xs text-center">30° spread</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Occlusion</Label>
                    <Slider defaultValue={[0]} min={0} max={100} />
                    <div className="text-xs text-center">0% occluded</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Object List */}
          <Card>
            <CardHeader>
              <CardTitle>Audio Objects in Scene</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {audioObjects.map((obj) => (
                  <div key={obj.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${obj.color} rounded-full`}></div>
                      <div>
                        <div className="font-medium">{obj.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {obj.type} • {obj.distance.toFixed(1)}m • {obj.azimuth}°
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{obj.volume[0]}%</Badge>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Binaural Tab */}
        <TabsContent value="binaural" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-blue-500" />
                Binaural Audio Processing
              </CardTitle>
              <p className="text-muted-foreground">
                HRTF-based binaural rendering for realistic 3D audio on headphones
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>HRTF Database</Label>
                    <Select defaultValue="kemar">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kemar">KEMAR (Default)</SelectItem>
                        <SelectItem value="ircam">IRCAM Listen</SelectItem>
                        <SelectItem value="mit">MIT KEMAR</SelectItem>
                        <SelectItem value="cipic">CIPIC Database</SelectItem>
                        <SelectItem value="custom">Custom HRTF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Head Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Crossfeed Amount</Label>
                    <Slider defaultValue={[15]} min={0} max={50} />
                    <div className="text-xs text-center">15% crossfeed</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Room Simulation</Label>
                    <Slider defaultValue={[25]} min={0} max={100} />
                    <div className="text-xs text-center">25% room effect</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Processing Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">High Quality Mode</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Distance Attenuation</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Air Absorption</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Head Tracking</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Processing Quality</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Fast)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra (Slow)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Latency</Label>
                    <div className="text-lg font-bold">12ms</div>
                    <Progress value={24} className="h-2" />
                    <div className="text-xs text-muted-foreground">Low latency for real-time</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Surround Tab */}
        <TabsContent value="surround" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Speaker className="h-5 w-5 text-green-500" />
                Surround Sound Configuration
              </CardTitle>
              <p className="text-muted-foreground">
                Multi-channel surround sound setup with speaker configuration and bass management
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {presets.filter(p => p.type.includes('surround') || p.type === 'atmos').map((preset) => (
                  <Button
                    key={preset.type}
                    variant={spatialMode === preset.type ? "default" : "outline"}
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => setSpatialMode(preset.type)}
                  >
                    <preset.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm">{preset.name}</span>
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base">Speaker Configuration</Label>
                  
                  {/* 5.1 Speaker Layout Visualization */}
                  <div className="aspect-square border rounded-lg relative bg-muted/20 p-4">
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="text-xs mt-1">Front L</div>
                    </div>
                    <div className="absolute top-4 right-1/2 transform translate-x-1/2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="text-xs mt-1">Front R</div>
                    </div>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 translate-y-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="text-xs mt-1">Center</div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="text-xs mt-1">Rear L</div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="text-xs mt-1">Rear R</div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <div className="text-xs mt-1">Sub</div>
                    </div>
                    
                    {/* Listener */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Channel Settings</Label>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Front L/R Level</Label>
                      <Slider defaultValue={[100]} min={0} max={120} />
                      <div className="text-xs text-center">100%</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Center Level</Label>
                      <Slider defaultValue={[95]} min={0} max={120} />
                      <div className="text-xs text-center">95%</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Surround Level</Label>
                      <Slider defaultValue={[90]} min={0} max={120} />
                      <div className="text-xs text-center">90%</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">LFE Level</Label>
                      <Slider defaultValue={[80]} min={0} max={120} />
                      <div className="text-xs text-center">80%</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-sm">Bass Management</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">LFE Crossover</span>
                        <span className="text-sm">80Hz</span>
                      </div>
                      <Slider defaultValue={[80]} min={40} max={200} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ambisonics Tab */}
        <TabsContent value="ambisonics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sphere className="h-5 w-5 text-purple-500" />
                Ambisonics 360° Audio
              </CardTitle>
              <p className="text-muted-foreground">
                Full-sphere surround sound with first and higher-order ambisonics encoding/decoding
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Ambisonics Order</Label>
                    <Select defaultValue="1">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Order (4 channels)</SelectItem>
                        <SelectItem value="2">Second Order (9 channels)</SelectItem>
                        <SelectItem value="3">Third Order (16 channels)</SelectItem>
                        <SelectItem value="4">Fourth Order (25 channels)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Encoding Format</Label>
                    <Select defaultValue="acn_sn3d">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acn_sn3d">ACN/SN3D (Recommended)</SelectItem>
                        <SelectItem value="acn_n3d">ACN/N3D</SelectItem>
                        <SelectItem value="fuma">FuMa (Legacy)</SelectItem>
                        <SelectItem value="ambix">AmbiX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Decoder Type</Label>
                    <Select defaultValue="energy">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy">Energy Preserving</SelectItem>
                        <SelectItem value="velocity">Velocity Preserving</SelectItem>
                        <SelectItem value="mixed">Mixed Order</SelectItem>
                        <SelectItem value="allrad">AllRAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Near Field Compensation</Label>
                    <Slider defaultValue={[50]} min={0} max={100} />
                    <div className="text-xs text-center">50% compensation</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Rotation Control</Label>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Yaw (Y-axis)</Label>
                      <Slider defaultValue={[0]} min={-180} max={180} />
                      <div className="text-xs text-center">0°</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Pitch (X-axis)</Label>
                      <Slider defaultValue={[0]} min={-90} max={90} />
                      <div className="text-xs text-center">0°</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Roll (Z-axis)</Label>
                      <Slider defaultValue={[0]} min={-180} max={180} />
                      <div className="text-xs text-center">0°</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-base">Analysis</Label>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Intensity</div>
                        <div className="font-bold">-12.3 dB</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Width</div>
                        <div className="font-bold">0.82</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Direction</div>
                        <div className="font-bold">45° / 15°</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Spread</div>
                        <div className="font-bold">127°</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Real-time Ambisonics Processor</div>
                      <div className="text-sm text-muted-foreground">Processing 16-channel 3rd order ambisonics</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">48kHz</Badge>
                      <Badge variant="outline">24-bit</Badge>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VR/AR Tab */}
        <TabsContent value="vr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5 text-orange-500" />
                VR/AR Immersive Audio
              </CardTitle>
              <p className="text-muted-foreground">
                Immersive spatial audio for virtual and augmented reality experiences
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>VR Platform</Label>
                    <Select defaultValue="oculus">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oculus">Meta Quest</SelectItem>
                        <SelectItem value="steamvr">SteamVR</SelectItem>
                        <SelectItem value="psvr">PlayStation VR</SelectItem>
                        <SelectItem value="hololens">HoloLens</SelectItem>
                        <SelectItem value="magic_leap">Magic Leap</SelectItem>
                        <SelectItem value="generic">Generic VR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Head Tracking</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">6DOF Tracking</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Predictive Tracking</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Motion Compensation</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tracking Latency</Label>
                    <div className="text-lg font-bold">8ms</div>
                    <Progress value={16} className="h-2" />
                    <div className="text-xs text-muted-foreground">Ultra-low latency</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Room Scale Audio</Label>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Room Boundaries</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Width (m)" defaultValue="4.0" />
                      <Input placeholder="Depth (m)" defaultValue="3.0" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Wall Material</Label>
                    <Select defaultValue="plaster">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="plaster">Plaster</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="carpet">Carpet</SelectItem>
                        <SelectItem value="glass">Glass</SelectItem>
                        <SelectItem value="absorber">Sound Absorber</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Occlusion Accuracy</Label>
                    <Slider defaultValue={[75]} min={0} max={100} />
                    <div className="text-xs text-center">75% accuracy</div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Haptic Feedback</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audio-to-haptic conversion</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <Card className="bg-gradient-to-r from-orange-500/10 to-purple-500/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Immersive Audio Engine</div>
                      <div className="text-sm text-muted-foreground">
                        Real-time 3D audio with room-scale tracking and physics simulation
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500" />
                Spatial Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base">Audio Engine</Label>
                  
                  <div>
                    <Label>Processing Engine</Label>
                    <Select defaultValue="custom">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Engine</SelectItem>
                        <SelectItem value="steam_audio">Steam Audio</SelectItem>
                        <SelectItem value="oculus_audio">Oculus Audio SDK</SelectItem>
                        <SelectItem value="resonance">Google Resonance</SelectItem>
                        <SelectItem value="wwise">Wwise Spatial Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Sample Rate</Label>
                    <Select defaultValue="48000">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="44100">44.1 kHz</SelectItem>
                        <SelectItem value="48000">48 kHz</SelectItem>
                        <SelectItem value="96000">96 kHz</SelectItem>
                        <SelectItem value="192000">192 kHz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Buffer Size</Label>
                    <Select defaultValue="128">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="64">64 samples</SelectItem>
                        <SelectItem value="128">128 samples</SelectItem>
                        <SelectItem value="256">256 samples</SelectItem>
                        <SelectItem value="512">512 samples</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Performance</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Multi-threading</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">GPU Acceleration</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SIMD Optimization</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time Priority</span>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>CPU Usage Target</Label>
                    <Slider defaultValue={[60]} min={20} max={95} />
                    <div className="text-xs text-center">60% max CPU usage</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quality vs Performance</Label>
                    <Slider defaultValue={[75]} min={0} max={100} />
                    <div className="text-xs text-center">75% quality bias</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{cpuUsage}%</div>
                    <div className="text-sm text-muted-foreground">CPU Usage</div>
                    <Progress value={cpuUsage} className="mt-2" />
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">12ms</div>
                    <div className="text-sm text-muted-foreground">Total Latency</div>
                    <Progress value={24} className="mt-2" />
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">64</div>
                    <div className="text-sm text-muted-foreground">Active Objects</div>
                    <Progress value={25} className="mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}