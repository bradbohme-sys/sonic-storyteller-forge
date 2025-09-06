import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Play, 
  Download, 
  Settings, 
  Sliders,
  Clock,
  Headphones,
  Sparkles,
  Loader2,
  Volume2,
  Bot,
  Layers,
  Zap,
  Wand2,
  RotateCcw,
  Save,
  Upload,
  FileMusic,
  Mic,
  Target,
  Brain,
  Heart,
  Gauge,
  Activity,
  Palette,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const GENRES = [
  { id: 'cinematic', name: 'Cinematic', description: 'Epic orchestral scores', icon: '🎬' },
  { id: 'ambient', name: 'Ambient', description: 'Atmospheric soundscapes', icon: '🌙' },
  { id: 'electronic', name: 'Electronic', description: 'Synthesized modern beats', icon: '🎛️' },
  { id: 'classical', name: 'Classical', description: 'Traditional orchestral', icon: '🎼' },
  { id: 'jazz', name: 'Jazz', description: 'Smooth improvisational', icon: '🎷' },
  { id: 'rock', name: 'Rock', description: 'Guitar-driven energy', icon: '🎸' },
  { id: 'folk', name: 'Folk', description: 'Acoustic storytelling', icon: '🪕' },
  { id: 'world', name: 'World', description: 'Global cultural sounds', icon: '🌍' },
  { id: 'trap', name: 'Trap', description: 'Modern hip-hop beats', icon: '🔥' },
  { id: 'dubstep', name: 'Dubstep', description: 'Heavy bass drops', icon: '⚡' },
  { id: 'house', name: 'House', description: 'Danceable four-on-floor', icon: '🕺' },
  { id: 'trance', name: 'Trance', description: 'Hypnotic progressive', icon: '🌀' }
];

const MOODS = [
  { id: 'epic', name: 'Epic', description: 'Grand and heroic', color: 'from-red-500 to-orange-500' },
  { id: 'peaceful', name: 'Peaceful', description: 'Calm and serene', color: 'from-blue-500 to-cyan-500' },
  { id: 'mysterious', name: 'Mysterious', description: 'Enigmatic and dark', color: 'from-purple-500 to-indigo-500' },
  { id: 'energetic', name: 'Energetic', description: 'High energy and driving', color: 'from-yellow-500 to-red-500' },
  { id: 'melancholic', name: 'Melancholic', description: 'Sad and reflective', color: 'from-gray-500 to-blue-500' },
  { id: 'uplifting', name: 'Uplifting', description: 'Positive and inspiring', color: 'from-green-500 to-yellow-500' },
  { id: 'dramatic', name: 'Dramatic', description: 'Intense and theatrical', color: 'from-purple-500 to-red-500' },
  { id: 'romantic', name: 'Romantic', description: 'Love and passion', color: 'from-pink-500 to-red-500' },
  { id: 'tense', name: 'Tense', description: 'Suspenseful and anxious', color: 'from-orange-500 to-red-500' },
  { id: 'playful', name: 'Playful', description: 'Fun and lighthearted', color: 'from-cyan-500 to-blue-500' }
];

const INSTRUMENTS = [
  { category: 'Strings', items: ['Piano', 'Violin', 'Cello', 'Guitar', 'Harp', 'Double Bass'] },
  { category: 'Brass', items: ['Trumpet', 'Horn', 'Trombone', 'Tuba'] },
  { category: 'Woodwinds', items: ['Flute', 'Clarinet', 'Oboe', 'Saxophone', 'Bassoon'] },
  { category: 'Percussion', items: ['Drums', 'Timpani', 'Cymbals', 'Xylophone', 'Marimba'] },
  { category: 'Electronic', items: ['Synthesizer', 'Drum Machine', 'Bass Synth', 'Pad', 'Lead Synth'] },
  { category: 'Ethnic', items: ['Sitar', 'Didgeridoo', 'Tabla', 'Shakuhachi', 'Duduk'] }
];

const MUSICAL_STRUCTURES = [
  { id: 'verse_chorus', name: 'Verse-Chorus', description: 'Classic pop structure' },
  { id: 'aaba', name: 'AABA', description: 'Traditional 32-bar form' },
  { id: 'through_composed', name: 'Through-Composed', description: 'Continuous development' },
  { id: 'rondo', name: 'Rondo', description: 'Recurring main theme' },
  { id: 'sonata', name: 'Sonata Form', description: 'Exposition-Development-Recapitulation' },
  { id: 'ambient_flow', name: 'Ambient Flow', description: 'Gradual evolution' }
];

const HARMONIC_PROGRESSIONS = [
  { id: 'i_v_vi_iv', name: 'I-V-vi-IV', description: 'Pop progression' },
  { id: 'ii_v_i', name: 'ii-V-I', description: 'Jazz standard' },
  { id: 'i_vi_iv_v', name: 'I-vi-IV-V', description: '50s progression' },
  { id: 'vi_iv_i_v', name: 'vi-IV-I-V', description: 'Emotional pop' },
  { id: 'modal_minor', name: 'Modal Minor', description: 'Ancient scales' },
  { id: 'chromatic', name: 'Chromatic', description: 'Complex harmony' }
];

export function MusicComposer() {
  const [prompt, setPrompt] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('cinematic');
  const [selectedMood, setSelectedMood] = useState('epic');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(['Piano', 'Strings']);
  const [duration, setDuration] = useState([120]);
  const [tempo, setTempo] = useState([120]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Advanced composition settings
  const [musicalStructure, setMusicalStructure] = useState('verse_chorus');
  const [harmonicProgression, setHarmonicProgression] = useState('i_v_vi_iv');
  const [keySignature, setKeySignature] = useState('C Major');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [complexity, setComplexity] = useState([5]);
  const [dynamics, setDynamics] = useState([5]);
  const [arrangement, setArrangement] = useState([5]);
  
  // AI Enhancement settings
  const [aiFeatures, setAiFeatures] = useState({
    adaptive_orchestration: true,
    emotional_arc: true,
    harmonic_innovation: false,
    rhythmic_complexity: true,
    melodic_development: true,
    timbral_evolution: false
  });
  
  // Audio processing settings
  const [mixingSettings, setMixingSettings] = useState({
    stereo_width: [70],
    reverb_amount: [30],
    compression: [40],
    eq_presence: [50],
    spatial_depth: [60]
  });

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  const toggleAiFeature = (feature: keyof typeof aiFeatures) => {
    setAiFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const generateMusic = async () => {
    if (!prompt.trim()) {
      return;
    }
    
    setIsGenerating(true);
    // Simulate advanced music generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 5000);
  };

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
              <Music className="w-6 h-6" />
              <span>Advanced Music Composer</span>
            </CardTitle>
            <CardDescription>
              Professional AI music composition with adaptive orchestration and advanced harmonic control
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Music className="w-4 h-4 mr-2" />
            Composition
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Brain className="w-4 h-4 mr-2" />
            AI Features
          </TabsTrigger>
          <TabsTrigger value="structure" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Layers className="w-4 h-4 mr-2" />
            Structure
          </TabsTrigger>
          <TabsTrigger value="mixing" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Sliders className="w-4 h-4 mr-2" />
            Mixing
          </TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <FileMusic className="w-4 h-4 mr-2" />
            Library
          </TabsTrigger>
        </TabsList>

        {/* Basic Composition Tab */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Musical Prompt */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Wand2 className="w-5 h-5" />
                    <span>Musical Vision</span>
                  </CardTitle>
                  <CardDescription>
                    Describe your musical concept in detail
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Describe your musical vision... e.g., 'An epic orchestral piece that starts with a haunting solo violin, building to a triumphant crescendo with full brass and choir, perfect for a heroic movie scene with rising action and emotional peaks'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px]"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Reference
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mic className="w-4 h-4 mr-2" />
                        Hum Melody
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {prompt.length} characters
                    </span>
                  </div>

                  <Button
                    variant="audio"
                    onClick={generateMusic}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Composing... (Advanced AI Processing)
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Compose with AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Genre & Mood */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Style & Emotion</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Genre</Label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre.id} value={genre.id}>
                            <div className="flex items-center space-x-2">
                              <span>{genre.icon}</span>
                              <div>
                                <div className="font-medium">{genre.name}</div>
                                <div className="text-sm text-muted-foreground">{genre.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Emotional Mood</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {MOODS.map((mood) => (
                        <Button
                          key={mood.id}
                          variant={selectedMood === mood.id ? "default" : "outline"}
                          className={`h-12 text-left ${selectedMood === mood.id ? `bg-gradient-to-r ${mood.color}` : ''}`}
                          onClick={() => setSelectedMood(mood.id)}
                        >
                          <div>
                            <div className="font-medium text-sm">{mood.name}</div>
                            <div className="text-xs opacity-80">{mood.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Settings */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Musical Parameters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Key Signature</Label>
                      <Select value={keySignature} onValueChange={setKeySignature}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="C Major">C Major</SelectItem>
                          <SelectItem value="G Major">G Major</SelectItem>
                          <SelectItem value="D Major">D Major</SelectItem>
                          <SelectItem value="A Major">A Major</SelectItem>
                          <SelectItem value="E Major">E Major</SelectItem>
                          <SelectItem value="F Major">F Major</SelectItem>
                          <SelectItem value="Bb Major">Bb Major</SelectItem>
                          <SelectItem value="A Minor">A Minor</SelectItem>
                          <SelectItem value="E Minor">E Minor</SelectItem>
                          <SelectItem value="D Minor">D Minor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Time Signature</Label>
                      <Select value={timeSignature} onValueChange={setTimeSignature}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4/4">4/4 (Common)</SelectItem>
                          <SelectItem value="3/4">3/4 (Waltz)</SelectItem>
                          <SelectItem value="2/4">2/4 (March)</SelectItem>
                          <SelectItem value="6/8">6/8 (Compound)</SelectItem>
                          <SelectItem value="5/4">5/4 (Irregular)</SelectItem>
                          <SelectItem value="7/8">7/8 (Complex)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{Math.floor(duration[0] / 60)}:{(duration[0] % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <Slider
                      value={duration}
                      onValueChange={setDuration}
                      min={15}
                      max={600}
                      step={15}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4" />
                        <span>Tempo (BPM)</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{tempo[0]}</span>
                    </div>
                    <Slider
                      value={tempo}
                      onValueChange={setTempo}
                      min={40}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Instrumentation */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Headphones className="w-5 h-5" />
                    <span>Advanced Orchestration</span>
                  </CardTitle>
                  <CardDescription>
                    Select instruments by category for professional arrangement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {INSTRUMENTS.map((category) => (
                      <div key={category.category}>
                        <Label className="text-sm font-medium mb-2 block">{category.category}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {category.items.map((instrument) => (
                            <Badge
                              key={instrument}
                              variant={selectedInstruments.includes(instrument) ? "default" : "outline"}
                              className={`cursor-pointer transition-all hover-audio text-center py-2 ${
                                selectedInstruments.includes(instrument) 
                                  ? 'bg-gradient-primary text-white hover:shadow-audio-glow' 
                                  : 'hover:bg-primary/10'
                              }`}
                              onClick={() => toggleInstrument(instrument)}
                            >
                              {instrument}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Selected: {selectedInstruments.length} instruments
                  </p>
                </CardContent>
              </Card>

              {/* Complexity Controls */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Composition Complexity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Harmonic Complexity</Label>
                      <span className="text-sm text-muted-foreground">{complexity[0]}/10</span>
                    </div>
                    <Slider
                      value={complexity}
                      onValueChange={setComplexity}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Controls chord complexity and harmonic sophistication</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Dynamic Range</Label>
                      <span className="text-sm text-muted-foreground">{dynamics[0]}/10</span>
                    </div>
                    <Slider
                      value={dynamics}
                      onValueChange={setDynamics}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Range from quiet intimate moments to powerful climaxes</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Arrangement Density</Label>
                      <span className="text-sm text-muted-foreground">{arrangement[0]}/10</span>
                    </div>
                    <Slider
                      value={arrangement}
                      onValueChange={setArrangement}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">How many instruments play simultaneously</p>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <span>Composition Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Compose music to preview your track</p>
                    <p className="text-xs mt-2">Advanced AI will generate a full orchestral arrangement</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* AI Features Tab */}
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>AI Composition Features</span>
                </CardTitle>
                <CardDescription>
                  Advanced AI capabilities for professional music composition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(aiFeatures).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium capitalize">{key.replace(/_/g, ' ')}</div>
                      <div className="text-sm text-muted-foreground">
                        {key === 'adaptive_orchestration' && 'AI automatically adjusts instrumentation based on emotion'}
                        {key === 'emotional_arc' && 'Creates dynamic emotional journey throughout the piece'}
                        {key === 'harmonic_innovation' && 'Generates unique chord progressions and harmonies'}
                        {key === 'rhythmic_complexity' && 'Adds sophisticated rhythmic patterns and polyrhythms'}
                        {key === 'melodic_development' && 'Develops and varies melodic themes throughout'}
                        {key === 'timbral_evolution' && 'Evolves sound textures and instrument timbres over time'}
                      </div>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={() => toggleAiFeature(key as keyof typeof aiFeatures)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>AI Training Presets</span>
                </CardTitle>
                <CardDescription>
                  Pre-trained models for specific musical styles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Hans Zimmer Style', description: 'Epic cinematic orchestration' },
                  { name: 'John Williams Mode', description: 'Classic film scoring' },
                  { name: 'Trent Reznor Digital', description: 'Industrial electronic fusion' },
                  { name: 'Max Richter Minimal', description: 'Contemporary classical minimalism' },
                  { name: 'Skrillex Electronic', description: 'Modern dubstep and EDM' },
                  { name: 'Ólafur Arnalds Ambient', description: 'Atmospheric neoclassical' }
                ].map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-4 text-left justify-start"
                  >
                    <div>
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-sm text-muted-foreground">{preset.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Structure Tab */}
        <TabsContent value="structure">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Musical Structure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Song Structure</Label>
                  <Select value={musicalStructure} onValueChange={setMusicalStructure}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MUSICAL_STRUCTURES.map((structure) => (
                        <SelectItem key={structure.id} value={structure.id}>
                          <div>
                            <div className="font-medium">{structure.name}</div>
                            <div className="text-sm text-muted-foreground">{structure.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Harmonic Progression</Label>
                  <Select value={harmonicProgression} onValueChange={setHarmonicProgression}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HARMONIC_PROGRESSIONS.map((progression) => (
                        <SelectItem key={progression.id} value={progression.id}>
                          <div>
                            <div className="font-medium">{progression.name}</div>
                            <div className="text-sm text-muted-foreground">{progression.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-audio">
              <CardHeader>
                <CardTitle>Visual Structure Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Intro', 'Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Chorus', 'Outro'].map((section, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-gradient-primary rounded flex items-center justify-center text-white text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">{section}</div>
                      <div className="text-sm text-muted-foreground">0:30</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mixing Tab */}
        <TabsContent value="mixing">
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sliders className="w-5 h-5" />
                <span>Advanced Mixing & Mastering</span>
              </CardTitle>
              <CardDescription>
                Professional audio processing and spatial positioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Stereo Width</Label>
                      <span className="text-sm text-muted-foreground">{mixingSettings.stereo_width[0]}%</span>
                    </div>
                    <Slider
                      value={mixingSettings.stereo_width}
                      onValueChange={(value) => setMixingSettings(prev => ({ ...prev, stereo_width: value }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Reverb Amount</Label>
                      <span className="text-sm text-muted-foreground">{mixingSettings.reverb_amount[0]}%</span>
                    </div>
                    <Slider
                      value={mixingSettings.reverb_amount}
                      onValueChange={(value) => setMixingSettings(prev => ({ ...prev, reverb_amount: value }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Compression</Label>
                      <span className="text-sm text-muted-foreground">{mixingSettings.compression[0]}%</span>
                    </div>
                    <Slider
                      value={mixingSettings.compression}
                      onValueChange={(value) => setMixingSettings(prev => ({ ...prev, compression: value }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>EQ Presence</Label>
                      <span className="text-sm text-muted-foreground">{mixingSettings.eq_presence[0]}%</span>
                    </div>
                    <Slider
                      value={mixingSettings.eq_presence}
                      onValueChange={(value) => setMixingSettings(prev => ({ ...prev, eq_presence: value }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Spatial Depth</Label>
                      <span className="text-sm text-muted-foreground">{mixingSettings.spatial_depth[0]}%</span>
                    </div>
                    <Slider
                      value={mixingSettings.spatial_depth}
                      onValueChange={(value) => setMixingSettings(prev => ({ ...prev, spatial_depth: value }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button variant="audio" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preset
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Library Tab */}
        <TabsContent value="library">
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileMusic className="w-5 h-5" />
                <span>Composition Library</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Epic Battle Symphony', genre: 'Cinematic', duration: '4:30', complexity: 'High', mood: 'Epic' },
                  { title: 'Peaceful Forest Dawn', genre: 'Ambient', duration: '6:45', complexity: 'Medium', mood: 'Peaceful' },
                  { title: 'Electronic Dreams', genre: 'Electronic', duration: '3:15', complexity: 'High', mood: 'Mysterious' },
                  { title: 'Jazz Cafe Romance', genre: 'Jazz', duration: '4:20', complexity: 'Medium', mood: 'Romantic' },
                  { title: 'Orchestral Fantasy Quest', genre: 'Classical', duration: '8:30', complexity: 'Very High', mood: 'Epic' }
                ].map((composition, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium">{composition.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-4">
                        <span>{composition.genre}</span>
                        <span>•</span>
                        <span>{composition.duration}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">{composition.complexity}</Badge>
                        <Badge variant="outline" className="text-xs">{composition.mood}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="play">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}