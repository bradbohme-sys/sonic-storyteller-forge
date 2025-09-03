import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Play, 
  Download, 
  Settings, 
  Volume2, 
  User, 
  Sparkles,
  Loader2,
  AudioWaveform
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VOICES = [
  { id: 'aria', name: 'Aria', description: 'Warm, expressive female voice' },
  { id: 'roger', name: 'Roger', description: 'Professional male narrator' },
  { id: 'sarah', name: 'Sarah', description: 'Clear, articulate female voice' },
  { id: 'laura', name: 'Laura', description: 'Friendly, conversational female voice' },
  { id: 'charlie', name: 'Charlie', description: 'Young, energetic male voice' },
  { id: 'george', name: 'George', description: 'Mature, authoritative male voice' },
  { id: 'charlotte', name: 'Charlotte', description: 'Elegant, sophisticated female voice' },
  { id: 'liam', name: 'Liam', description: 'Deep, resonant male voice' },
  { id: 'daniel', name: 'Daniel', description: 'Smooth, professional male voice' },
  { id: 'lily', name: 'Lily', description: 'Sweet, youthful female voice' }
];

const MODELS = [
  { id: 'eleven_multilingual_v2', name: 'Multilingual v2', description: 'Highest quality, 29 languages' },
  { id: 'eleven_turbo_v2_5', name: 'Turbo v2.5', description: 'Fast, high quality, 32 languages' },
  { id: 'eleven_turbo_v2', name: 'Turbo v2', description: 'Fast, English only' }
];

export function SpeechSynthesisStudio() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('aria');
  const [selectedModel, setSelectedModel] = useState('eleven_multilingual_v2');
  const [stability, setStability] = useState([0.5]);
  const [similarityBoost, setSimilarityBoost] = useState([0.75]);
  const [style, setStyle] = useState([0.0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const generateSpeech = async () => {
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text to synthesize.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
        body: {
          text: text.trim(),
          voice: selectedVoice,
          model_id: selectedModel,
          voice_settings: {
            stability: stability[0],
            similarity_boost: similarityBoost[0],
            style: style[0],
            use_speaker_boost: true
          }
        }
      });

      if (error) throw error;

      if (data.success) {
        // Create audio blob from base64
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio_base64), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        toast({
          title: "Speech Generated! 🎤",
          description: `Using ${data.voice_used} voice with ${data.model_used}`
        });
      } else {
        throw new Error(data.error || 'Failed to generate speech');
      }
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate speech. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `speech-${selectedVoice}-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
              <Mic className="w-6 h-6" />
              <span>Speech Synthesis Studio</span>
            </CardTitle>
            <CardDescription>
              Transform text into lifelike speech using advanced AI voice models
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Text Input & Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Text Input */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="text-lg">Text to Synthesize</CardTitle>
              <CardDescription>
                Enter the text you want to convert to speech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your text here... You can write dialogue, narration, or any content you want to bring to life with AI voices."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">
                  {text.length} characters
                </span>
                <Button
                  variant="audio"
                  onClick={generateSpeech}
                  disabled={isGenerating || !text.trim()}
                  className="min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Speech
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Voice Selection */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Voice Selection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Voice Character</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICES.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        <div>
                          <div className="font-medium">{voice.name}</div>
                          <div className="text-sm text-muted-foreground">{voice.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-muted-foreground">{model.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voice Settings & Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Voice Settings */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Voice Settings</span>
              </CardTitle>
              <CardDescription>
                Fine-tune the voice characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Stability</Label>
                  <span className="text-sm text-muted-foreground">{stability[0]}</span>
                </div>
                <Slider
                  value={stability}
                  onValueChange={setStability}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Controls voice consistency and predictability
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Similarity Boost</Label>
                  <span className="text-sm text-muted-foreground">{similarityBoost[0]}</span>
                </div>
                <Slider
                  value={similarityBoost}
                  onValueChange={setSimilarityBoost}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enhances similarity to the original voice
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Style Exaggeration</Label>
                  <span className="text-sm text-muted-foreground">{style[0]}</span>
                </div>
                <Slider
                  value={style}
                  onValueChange={setStyle}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Amplifies the speaking style and emotions
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Audio Preview */}
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Audio Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {audioUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant={isPlaying ? "stop" : "play"}
                      onClick={playAudio}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isPlaying ? 'Playing...' : 'Play Audio'}
                    </Button>
                    <Button
                      variant="console"
                      onClick={downloadAudio}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-waveform-background rounded-lg p-4 border">
                    <div className="flex items-center justify-center space-x-2 text-waveform-primary">
                      <Waveform className="w-5 h-5 animate-audio-pulse" />
                      <span className="text-sm">Audio ready for playback</span>
                    </div>
                  </div>

                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Waveform className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generate speech to preview audio</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}