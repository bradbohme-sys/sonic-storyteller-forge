import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Top ElevenLabs voices with their IDs
const AVAILABLE_VOICES = {
  'aria': '9BWtsMINqrJLrRacOk9x',
  'roger': 'CwhRBWXzGAHq8TQ4Fs17',
  'sarah': 'EXAVITQu4vr4xnSDxMaL',
  'laura': 'FGY2WhTYpPnrIDTdsKH5',
  'charlie': 'IKne3meq5aSn9XLyUdCD',
  'george': 'JBFqnCBsd6RMkjVDRZzb',
  'callum': 'N2lVS1w4EtoT3dr4eOWO',
  'river': 'SAz9YHcvj6GT2YYXdXww',
  'liam': 'TX3LPaxmHKxFdv7VOQHJ',
  'charlotte': 'XB0fDUnXU5powFXDhCwa',
  'alice': 'Xb7hH8MSUJpSbSDYk0k2',
  'matilda': 'XrExE9yKIg1WjnnlVkGX',
  'will': 'bIHbv24MWmeRgasZH58o',
  'jessica': 'cgSgspJ2msm6clMCkdW9',
  'eric': 'cjVigY5qzO86Huf0OWal',
  'chris': 'iP95p4xoKVk53GoZ742B',
  'brian': 'nPczCjzI2devNBz1zQrb',
  'daniel': 'onwK4e9ZLuTAKqWW03F9',
  'lily': 'pFZP5JQG7iQjIQuC4Bku',
  'bill': 'pqHfZKP75CvOlQylNhV4'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice = 'aria', voice_settings, model_id = 'eleven_multilingual_v2' } = await req.json();

    if (!text) {
      throw new Error('Text is required for speech synthesis');
    }

    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key not configured');
    }

    // Get voice ID from name or use direct ID
    const voiceId = AVAILABLE_VOICES[voice.toLowerCase()] || voice;

    console.log(`🎤 Generating speech with voice: ${voice} (${voiceId}), model: ${model_id}`);

    // Default voice settings optimized for storytelling
    const defaultSettings = {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.0,
      use_speaker_boost: true
    };

    const finalSettings = { ...defaultSettings, ...voice_settings };

    // Generate speech using ElevenLabs TTS API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: model_id,
        voice_settings: finalSettings,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('ElevenLabs API error:', error);
      throw new Error(error.detail?.message || `ElevenLabs API error: ${response.status}`);
    }

    // Convert audio to base64
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    console.log(`✅ Speech generated successfully. Audio size: ${audioBuffer.byteLength} bytes`);

    // Save the audio generation to database for tracking
    const { data: audioClip, error: dbError } = await supabase
      .from('audio_clips')
      .insert({
        user_id: req.headers.get('x-user-id') || 'anonymous',
        track_id: req.headers.get('x-track-id') || null,
        clip_name: `TTS: ${text.substring(0, 50)}...`,
        audio_url: '', // Will be updated when stored in storage
        clip_type: 'synthesized',
        start_time: 0,
        end_time: 0, // Will be calculated from audio duration
        duration: 0, // Will be calculated from audio duration
        generation_prompt: text,
        generation_model: `elevenlabs_${model_id}`,
        metadata: {
          voice: voice,
          voice_id: voiceId,
          voice_settings: finalSettings,
          audio_format: 'mp3',
          generated_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue anyway, don't fail the request
    }

    return new Response(
      JSON.stringify({
        success: true,
        audio_base64: base64Audio,
        voice_used: voice,
        voice_id: voiceId,
        model_used: model_id,
        voice_settings: finalSettings,
        clip_id: audioClip?.id,
        audio_length_bytes: audioBuffer.byteLength
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in elevenlabs-tts function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        available_voices: Object.keys(AVAILABLE_VOICES)
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});