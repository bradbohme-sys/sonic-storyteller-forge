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
  Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const GENRES = [
  { id: 'cinematic', name: 'Cinematic', description: 'Epic orchestral scores' },
  { id: 'ambient', name: 'Ambient', description: 'Atmospheric soundscapes' },
  { id: 'electronic', name: 'Electronic', description: 'Synthesized modern beats' },
  { id: 'classical', name: 'Classical', description: 'Traditional orchestral' },
  { id: 'jazz', name: 'Jazz', description: 'Smooth improvisational' },
  { id: 'rock', name: 'Rock', description: 'Guitar-driven energy' },
  { id: 'folk', name: 'Folk', description: 'Acoustic storytelling' },
  { id: 'world', name: 'World', description: 'Global cultural sounds' }
];

const MOODS = [
  'Epic', 'Peaceful', 'Mysterious', 'Energetic', 'Melancholic', 
  'Uplifting', 'Dramatic', 'Romantic', 'Tense', 'Playful'
];

const INSTRUMENTS = [
  'Piano', 'Strings', 'Brass', 'Woodwinds', 'Guitar', 'Drums', 
  'Synthesizer', 'Harp', 'Choir', 'Percussion'
];

export function MusicComposer() {
  const [prompt, setPrompt] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('cinematic');
  const [selectedMood, setSelectedMood] = useState('Epic');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(['Piano', 'Strings']);
  const [duration, setDuration] = useState([30]);
  const [tempo, setTempo] = useState([120]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  const generateMusic = async () => {
    if (!prompt.trim()) {
      return;
    }
    
    setIsGenerating(true);
    // Simulate music generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
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
              <span>Music Composer</span>
            </CardTitle>
            <CardDescription>
              Create adaptive AI-generated music and soundtracks for your projects
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Composition Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Prompt Input */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="text-lg">Musical Prompt</CardTitle>
              <CardDescription>
                Describe the music you want to create
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your musical vision... e.g., 'An epic orchestral piece with soaring strings and heroic brass, building to a triumphant climax perfect for a movie trailer'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">
                  {prompt.length} characters
                </span>
                <Button
                  variant="audio"
                  onClick={generateMusic}
                  disabled={isGenerating || !prompt.trim()}
                  className="min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Composing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Compose Music
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Genre & Mood */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sliders className="w-5 h-5" />
                <span>Style & Mood</span>
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
                        <div>
                          <div className="font-medium">{genre.name}</div>
                          <div className="text-sm text-muted-foreground">{genre.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Mood</Label>
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Technical Settings */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Technical Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </Label>
                  <span className="text-sm text-muted-foreground">{duration[0]}s</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={10}
                  max={300}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Tempo (BPM)</Label>
                  <span className="text-sm text-muted-foreground">{tempo[0]}</span>
                </div>
                <Slider
                  value={tempo}
                  onValueChange={setTempo}
                  min={60}
                  max={180}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Instrumentation & Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Instruments */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="w-5 h-5" />
                <span>Instrumentation</span>
              </CardTitle>
              <CardDescription>
                Select instruments for your composition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {INSTRUMENTS.map((instrument) => (
                  <Badge
                    key={instrument}
                    variant={selectedInstruments.includes(instrument) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover-audio ${
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
              <p className="text-xs text-muted-foreground mt-3">
                Selected: {selectedInstruments.length} instruments
              </p>
            </CardContent>
          </Card>

          {/* Composition Preview */}
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
              </div>
            </CardContent>
          </Card>

          {/* Composition History */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle>Recent Compositions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Epic Battle Theme', genre: 'Cinematic', duration: '2:30' },
                  { title: 'Peaceful Forest', genre: 'Ambient', duration: '1:45' },
                  { title: 'Jazz Cafe Vibes', genre: 'Jazz', duration: '3:15' }
                ].map((composition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div>
                      <div className="font-medium">{composition.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {composition.genre} • {composition.duration}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}