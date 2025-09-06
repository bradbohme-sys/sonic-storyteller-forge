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
  AudioWaveform,
  Upload,
  Paperclip,
  ListOrdered,
  Brain,
  Heart,
  Zap,
  Music,
  Timer,
  Target,
  Sliders,
  MicIcon,
  StopCircle,
  FileAudio,
  RotateCcw,
  Save,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  { id: 'eleven_turbo_v2', name: 'Turbo v2', description: 'Fast, English only' },
  { id: 'eleven_multilingual_sts_v2', name: 'Speech-to-Speech v2', description: 'Advanced prosody control' },
  { id: 'eleven_english_sts_v2', name: 'English STS v2', description: 'Maximum emotional control' }
];

const EMOTION_PRESETS = [
  { id: 'neutral', name: 'Neutral', icon: Target, color: 'from-gray-500 to-gray-600' },
  { id: 'joyful', name: 'Joyful', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'serious', name: 'Serious', icon: Settings, color: 'from-blue-500 to-indigo-500' },
  { id: 'dramatic', name: 'Dramatic', icon: Zap, color: 'from-red-500 to-orange-500' },
  { id: 'whisper', name: 'Whisper', icon: Volume2, color: 'from-purple-500 to-pink-500' },
  { id: 'excited', name: 'Excited', icon: Sparkles, color: 'from-yellow-500 to-orange-500' }
];

const AI_ENHANCEMENT_OPTIONS = [
  { id: 'auto_pacing', name: 'Auto Pacing', description: 'AI adjusts speech rhythm' },
  { id: 'emotion_detection', name: 'Emotion Detection', description: 'Detects emotions from text' },
  { id: 'prosody_enhance', name: 'Prosody Enhancement', description: 'Natural speech patterns' },
  { id: 'clarity_boost', name: 'Clarity Boost', description: 'Enhance articulation' },
  { id: 'tone_matching', name: 'Tone Matching', description: 'Match reference audio tone' }
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
  
  // Advanced controls
  const [textSegments, setTextSegments] = useState<Array<{id: string, text: string, voice?: string, emotion?: string}>>([]);
  const [selectedEmotion, setSelectedEmotion] = useState('neutral');
  const [aiEnhancements, setAiEnhancements] = useState<string[]>(['auto_pacing']);
  const [prosodySettings, setProsodySettings] = useState({
    pitch: [0],
    speed: [1],
    emphasis: [0.5],
    pause_length: [1],
    breath_frequency: [0.3]
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVoiceUrl, setRecordedVoiceUrl] = useState<string | null>(null);
  const [emotionalCadence, setEmotionalCadence] = useState({
    intensity: [0.5],
    variation: [0.3],
    progression: [0.5]
  });
  const [activeTab, setActiveTab] = useState('basic');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
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
          },
          prosody_settings: prosodySettings,
          emotion: selectedEmotion,
          ai_enhancements: aiEnhancements
        }
      });

      if (error) throw error;

      if (data.success) {
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVoiceUrl(url);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleAiEnhancement = (option: string) => {
    setAiEnhancements(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const addTextSegment = () => {
    const newSegment = {
      id: Date.now().toString(),
      text: text,
      voice: selectedVoice,
      emotion: selectedEmotion
    };
    setTextSegments(prev => [...prev, newSegment]);
    setText('');
  };

  const removeTextSegment = (id: string) => {
    setTextSegments(prev => prev.filter(seg => seg.id !== id));
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
              <span>Advanced Speech Synthesis Studio</span>
            </CardTitle>
            <CardDescription>
              Professional AI voice generation with advanced emotional control and prosody manipulation
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Basic Controls
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Brain className="w-4 h-4 mr-2" />
            AI Enhanced
          </TabsTrigger>
          <TabsTrigger value="prosody" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <Music className="w-4 h-4 mr-2" />
            Prosody Control
          </TabsTrigger>
          <TabsTrigger value="sequence" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
            <ListOrdered className="w-4 h-4 mr-2" />
            Sequence Builder
          </TabsTrigger>
        </TabsList>

        {/* Basic Controls Tab */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Text Input & Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Text Input */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FileAudio className="w-5 h-5" />
                    <span>Text to Synthesize</span>
                  </CardTitle>
                  <CardDescription>
                    Enter text or upload files for voice synthesis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter your text here... You can write dialogue, narration, or any content you want to bring to life with AI voices."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[150px] resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Text
                      </Button>
                      <Button size="sm" variant="outline">
                        <Paperclip className="w-4 h-4 mr-2" />
                        From Assets
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {text.length} characters
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="audio"
                      onClick={generateSpeech}
                      disabled={isGenerating || !text.trim()}
                      className="flex-1"
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
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addTextSegment}
                      disabled={!text.trim()}
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Voice Selection */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Voice & Model Selection</span>
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

                  {/* Voice Recording */}
                  <div className="border rounded-lg p-4 bg-accent/20">
                    <Label className="mb-2 block">Record Reference Voice</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={isRecording ? stopRecording : startRecording}
                        className="flex-1"
                      >
                        {isRecording ? (
                          <>
                            <StopCircle className="w-4 h-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <MicIcon className="w-4 h-4 mr-2" />
                            Record Voice
                          </>
                        )}
                      </Button>
                      {recordedVoiceUrl && (
                        <Button size="sm" variant="play">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Voice Settings & Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Voice Settings */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Voice Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Stability</Label>
                      <span className="text-sm text-muted-foreground">{stability[0].toFixed(1)}</span>
                    </div>
                    <Slider
                      value={stability}
                      onValueChange={setStability}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Similarity Boost</Label>
                      <span className="text-sm text-muted-foreground">{similarityBoost[0].toFixed(1)}</span>
                    </div>
                    <Slider
                      value={similarityBoost}
                      onValueChange={setSimilarityBoost}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Style Exaggeration</Label>
                      <span className="text-sm text-muted-foreground">{style[0].toFixed(1)}</span>
                    </div>
                    <Slider
                      value={style}
                      onValueChange={setStyle}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Emotion Presets */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Emotion Presets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {EMOTION_PRESETS.map((emotion) => {
                      const Icon = emotion.icon;
                      return (
                        <Button
                          key={emotion.id}
                          variant={selectedEmotion === emotion.id ? "default" : "outline"}
                          className={`h-12 ${selectedEmotion === emotion.id ? `bg-gradient-to-r ${emotion.color}` : ''}`}
                          onClick={() => setSelectedEmotion(emotion.id)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {emotion.name}
                        </Button>
                      );
                    })}
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
                        <Button variant="console" onClick={downloadAudio}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>

                      <div className="bg-waveform-background rounded-lg p-4 border">
                        <div className="flex items-center justify-center space-x-2 text-waveform-primary">
                          <AudioWaveform className="w-5 h-5 animate-audio-pulse" />
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
                      <AudioWaveform className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generate speech to preview audio</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* AI Enhanced Tab */}
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>AI Enhancement Options</span>
                </CardTitle>
                <CardDescription>
                  Advanced AI features for natural speech generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {AI_ENHANCEMENT_OPTIONS.map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                    <Switch
                      checked={aiEnhancements.includes(option.id)}
                      onCheckedChange={() => toggleAiEnhancement(option.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Emotional Cadence Control</span>
                </CardTitle>
                <CardDescription>
                  Fine-tune emotional expression throughout speech
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Emotional Intensity</Label>
                    <span className="text-sm text-muted-foreground">{emotionalCadence.intensity[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    value={emotionalCadence.intensity}
                    onValueChange={(value) => setEmotionalCadence(prev => ({ ...prev, intensity: value }))}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Emotional Variation</Label>
                    <span className="text-sm text-muted-foreground">{emotionalCadence.variation[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    value={emotionalCadence.variation}
                    onValueChange={(value) => setEmotionalCadence(prev => ({ ...prev, variation: value }))}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Emotional Progression</Label>
                    <span className="text-sm text-muted-foreground">{emotionalCadence.progression[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    value={emotionalCadence.progression}
                    onValueChange={(value) => setEmotionalCadence(prev => ({ ...prev, progression: value }))}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prosody Control Tab */}
        <TabsContent value="prosody">
          <Card className="hover-audio">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sliders className="w-5 h-5" />
                <span>Advanced Prosody Controls</span>
              </CardTitle>
              <CardDescription>
                Professional-grade speech timing, pitch, and emphasis controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Music className="w-4 h-4" />
                        <span>Pitch Adjustment</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{prosodySettings.pitch[0] > 0 ? '+' : ''}{prosodySettings.pitch[0]}</span>
                    </div>
                    <Slider
                      value={prosodySettings.pitch}
                      onValueChange={(value) => setProsodySettings(prev => ({ ...prev, pitch: value }))}
                      min={-12}
                      max={12}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Adjust voice pitch in semitones</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Timer className="w-4 h-4" />
                        <span>Speech Speed</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{prosodySettings.speed[0].toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={prosodySettings.speed}
                      onValueChange={(value) => setProsodySettings(prev => ({ ...prev, speed: value }))}
                      min={0.25}
                      max={4.0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Control speaking rate</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Emphasis Strength</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{prosodySettings.emphasis[0].toFixed(1)}</span>
                    </div>
                    <Slider
                      value={prosodySettings.emphasis}
                      onValueChange={(value) => setProsodySettings(prev => ({ ...prev, emphasis: value }))}
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">How strongly to emphasize stressed syllables</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Timer className="w-4 h-4" />
                        <span>Pause Length</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{prosodySettings.pause_length[0].toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={prosodySettings.pause_length}
                      onValueChange={(value) => setProsodySettings(prev => ({ ...prev, pause_length: value }))}
                      min={0.1}
                      max={3.0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Control length of pauses between sentences</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4" />
                        <span>Breath Frequency</span>
                      </Label>
                      <span className="text-sm text-muted-foreground">{prosodySettings.breath_frequency[0].toFixed(1)}</span>
                    </div>
                    <Slider
                      value={prosodySettings.breath_frequency}
                      onValueChange={(value) => setProsodySettings(prev => ({ ...prev, breath_frequency: value }))}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Add natural breathing sounds</p>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset All
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

        {/* Sequence Builder Tab */}
        <TabsContent value="sequence">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ListOrdered className="w-5 h-5" />
                  <span>Text Segments</span>
                </CardTitle>
                <CardDescription>
                  Build complex audio sequences with different voices and emotions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {textSegments.length > 0 ? (
                  <div className="space-y-3">
                    {textSegments.map((segment, index) => (
                      <div key={segment.id} className="border rounded-lg p-3 bg-accent/20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary">{index + 1}</Badge>
                              <Badge variant="outline">{segment.voice}</Badge>
                              <Badge variant="outline">{segment.emotion}</Badge>
                            </div>
                            <p className="text-sm">{segment.text.substring(0, 100)}...</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTextSegment(segment.id)}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ListOrdered className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No segments added yet. Add text segments from the Basic Controls tab.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="hover-audio">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Sequence Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="audio" className="w-full" disabled={textSegments.length === 0}>
                  <Play className="w-4 h-4 mr-2" />
                  Generate Full Sequence
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Sequence
                </Button>
                
                <Button variant="outline" className="w-full" disabled={textSegments.length === 0}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Sequence
                </Button>
                
                <Button variant="outline" className="w-full" disabled={textSegments.length === 0}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All Segments
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}