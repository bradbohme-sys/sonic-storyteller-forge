-- 🎵 AUDIOFORGE DATABASE SCHEMA
-- Revolutionary AI-Powered Audio Production System

-- Audio Projects Table
CREATE TABLE IF NOT EXISTS public.audio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  bpm INTEGER DEFAULT 120,
  key_signature TEXT DEFAULT 'C major',
  time_signature TEXT DEFAULT '4/4',
  duration_seconds NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voice Profiles Table for Character Voices
CREATE TABLE IF NOT EXISTS public.voice_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  character_name TEXT NOT NULL,
  voice_id TEXT, -- ElevenLabs Voice ID
  voice_settings JSONB DEFAULT '{}', -- Stability, clarity, style settings
  emotional_variants JSONB DEFAULT '{}', -- Happy, sad, angry, etc. variations
  sample_text TEXT DEFAULT 'Hello, this is a voice sample for character consistency.',
  is_cloned BOOLEAN DEFAULT false,
  quality_score NUMERIC DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audio Tracks Table for Multi-Track Production
CREATE TABLE IF NOT EXISTS public.audio_tracks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  track_name TEXT NOT NULL,
  track_type TEXT NOT NULL CHECK (track_type IN ('dialogue', 'music', 'sfx', 'ambient', 'foley')),
  track_index INTEGER NOT NULL,
  is_muted BOOLEAN DEFAULT false,
  is_soloed BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  volume NUMERIC DEFAULT 1.0 CHECK (volume >= 0 AND volume <= 2.0),
  pan NUMERIC DEFAULT 0.0 CHECK (pan >= -1.0 AND pan <= 1.0),
  effects JSONB DEFAULT '[]', -- Array of audio effects
  color TEXT DEFAULT '#8B5CF6', -- Track color for UI
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audio Clips Table for Individual Audio Elements
CREATE TABLE IF NOT EXISTS public.audio_clips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  track_id UUID NOT NULL,
  user_id UUID NOT NULL,
  clip_name TEXT NOT NULL,
  audio_url TEXT NOT NULL, -- URL to stored audio file
  clip_type TEXT NOT NULL CHECK (clip_type IN ('generated', 'uploaded', 'synthesized')),
  start_time NUMERIC NOT NULL DEFAULT 0,
  end_time NUMERIC NOT NULL,
  duration NUMERIC NOT NULL,
  fade_in NUMERIC DEFAULT 0,
  fade_out NUMERIC DEFAULT 0,
  volume NUMERIC DEFAULT 1.0,
  pitch NUMERIC DEFAULT 1.0,
  speed NUMERIC DEFAULT 1.0,
  generation_prompt TEXT, -- Original prompt for AI-generated content
  generation_model TEXT, -- AI model used (elevenlabs, musicgen, etc.)
  voice_profile_id UUID, -- For dialogue clips
  metadata JSONB DEFAULT '{}',
  waveform_data JSONB, -- Waveform visualization data
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Music Compositions Table for AI-Generated Music
CREATE TABLE IF NOT EXISTS public.music_compositions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  genre TEXT,
  mood TEXT,
  instruments JSONB DEFAULT '[]', -- Array of instruments
  bpm INTEGER DEFAULT 120,
  key_signature TEXT DEFAULT 'C major',
  duration_seconds NUMERIC,
  generation_prompt TEXT NOT NULL,
  audio_url TEXT,
  leitmotifs JSONB DEFAULT '[]', -- Character/theme motifs
  adaptive_parameters JSONB DEFAULT '{}', -- For dynamic music
  quality_score NUMERIC DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sound Effects Library
CREATE TABLE IF NOT EXISTS public.sound_effects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  effect_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('environmental', 'mechanical', 'organic', 'fantasy', 'action')),
  subcategory TEXT,
  tags TEXT[], -- Searchable tags
  audio_url TEXT NOT NULL,
  duration_seconds NUMERIC NOT NULL,
  generation_prompt TEXT,
  generation_model TEXT,
  is_loopable BOOLEAN DEFAULT false,
  volume_normalization NUMERIC DEFAULT 1.0,
  frequency_range TEXT, -- "20Hz-20kHz" etc.
  quality_rating NUMERIC DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audio Processing Jobs for Background Tasks
CREATE TABLE IF NOT EXISTS public.audio_processing_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('speech_synthesis', 'music_generation', 'sfx_generation', 'audio_enhancement', 'mixing', 'mastering')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  progress NUMERIC DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  input_data JSONB NOT NULL,
  output_data JSONB,
  error_message TEXT,
  processing_time_seconds NUMERIC,
  cost_credits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.audio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_compositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sound_effects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_processing_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Audio Projects
CREATE POLICY "Users can view own audio projects" ON public.audio_projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own audio projects" ON public.audio_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own audio projects" ON public.audio_projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own audio projects" ON public.audio_projects
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Voice Profiles
CREATE POLICY "Users can view own voice profiles" ON public.voice_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own voice profiles" ON public.voice_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own voice profiles" ON public.voice_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own voice profiles" ON public.voice_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Audio Tracks
CREATE POLICY "Users can view own audio tracks" ON public.audio_tracks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audio_projects 
      WHERE audio_projects.id = audio_tracks.project_id 
      AND audio_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create audio tracks for own projects" ON public.audio_tracks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audio_projects 
      WHERE audio_projects.id = audio_tracks.project_id 
      AND audio_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own audio tracks" ON public.audio_tracks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.audio_projects 
      WHERE audio_projects.id = audio_tracks.project_id 
      AND audio_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own audio tracks" ON public.audio_tracks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.audio_projects 
      WHERE audio_projects.id = audio_tracks.project_id 
      AND audio_projects.user_id = auth.uid()
    )
  );

-- RLS Policies for Audio Clips
CREATE POLICY "Users can view own audio clips" ON public.audio_clips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own audio clips" ON public.audio_clips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own audio clips" ON public.audio_clips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own audio clips" ON public.audio_clips
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Music Compositions
CREATE POLICY "Users can view own music compositions" ON public.music_compositions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own music compositions" ON public.music_compositions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own music compositions" ON public.music_compositions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own music compositions" ON public.music_compositions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Sound Effects
CREATE POLICY "Users can view own sound effects" ON public.sound_effects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sound effects" ON public.sound_effects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sound effects" ON public.sound_effects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sound effects" ON public.sound_effects
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Processing Jobs
CREATE POLICY "Users can view own processing jobs" ON public.audio_processing_jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own processing jobs" ON public.audio_processing_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own processing jobs" ON public.audio_processing_jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Foreign Key Constraints
ALTER TABLE public.audio_tracks 
  ADD CONSTRAINT fk_audio_tracks_project 
  FOREIGN KEY (project_id) REFERENCES public.audio_projects(id) ON DELETE CASCADE;

ALTER TABLE public.audio_clips 
  ADD CONSTRAINT fk_audio_clips_track 
  FOREIGN KEY (track_id) REFERENCES public.audio_tracks(id) ON DELETE CASCADE;

ALTER TABLE public.audio_clips 
  ADD CONSTRAINT fk_audio_clips_voice_profile 
  FOREIGN KEY (voice_profile_id) REFERENCES public.voice_profiles(id) ON DELETE SET NULL;

-- Indexes for Performance
CREATE INDEX idx_audio_projects_user_id ON public.audio_projects(user_id);
CREATE INDEX idx_audio_projects_status ON public.audio_projects(status);
CREATE INDEX idx_voice_profiles_user_id ON public.voice_profiles(user_id);
CREATE INDEX idx_audio_tracks_project_id ON public.audio_tracks(project_id);
CREATE INDEX idx_audio_tracks_type ON public.audio_tracks(track_type);
CREATE INDEX idx_audio_clips_track_id ON public.audio_clips(track_id);
CREATE INDEX idx_audio_clips_user_id ON public.audio_clips(user_id);
CREATE INDEX idx_audio_clips_type ON public.audio_clips(clip_type);
CREATE INDEX idx_music_compositions_user_id ON public.music_compositions(user_id);
CREATE INDEX idx_music_compositions_genre ON public.music_compositions(genre);
CREATE INDEX idx_sound_effects_user_id ON public.sound_effects(user_id);
CREATE INDEX idx_sound_effects_category ON public.sound_effects(category);
CREATE INDEX idx_processing_jobs_user_id ON public.audio_processing_jobs(user_id);
CREATE INDEX idx_processing_jobs_status ON public.audio_processing_jobs(status);

-- Trigger for updating timestamps
CREATE TRIGGER update_audio_projects_updated_at
  BEFORE UPDATE ON public.audio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_voice_profiles_updated_at
  BEFORE UPDATE ON public.voice_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audio_tracks_updated_at
  BEFORE UPDATE ON public.audio_tracks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audio_clips_updated_at
  BEFORE UPDATE ON public.audio_clips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_music_compositions_updated_at
  BEFORE UPDATE ON public.music_compositions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sound_effects_updated_at
  BEFORE UPDATE ON public.sound_effects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_processing_jobs_updated_at
  BEFORE UPDATE ON public.audio_processing_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();