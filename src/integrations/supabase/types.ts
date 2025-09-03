export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_generations: {
        Row: {
          completed_at: string | null
          cost_credits: number | null
          created_at: string | null
          error_message: string | null
          generation_type: string
          id: string
          model_used: string
          parameters: Json | null
          project_id: string | null
          prompt: string
          result_url: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          cost_credits?: number | null
          created_at?: string | null
          error_message?: string | null
          generation_type: string
          id?: string
          model_used: string
          parameters?: Json | null
          project_id?: string | null
          prompt: string
          result_url?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          cost_credits?: number | null
          created_at?: string | null
          error_message?: string | null
          generation_type?: string
          id?: string
          model_used?: string
          parameters?: Json | null
          project_id?: string | null
          prompt?: string
          result_url?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_generations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audio_clips: {
        Row: {
          audio_url: string
          clip_name: string
          clip_type: string
          created_at: string
          duration: number
          end_time: number
          fade_in: number | null
          fade_out: number | null
          generation_model: string | null
          generation_prompt: string | null
          id: string
          metadata: Json | null
          pitch: number | null
          speed: number | null
          start_time: number
          track_id: string
          updated_at: string
          user_id: string
          voice_profile_id: string | null
          volume: number | null
          waveform_data: Json | null
        }
        Insert: {
          audio_url: string
          clip_name: string
          clip_type: string
          created_at?: string
          duration: number
          end_time: number
          fade_in?: number | null
          fade_out?: number | null
          generation_model?: string | null
          generation_prompt?: string | null
          id?: string
          metadata?: Json | null
          pitch?: number | null
          speed?: number | null
          start_time?: number
          track_id: string
          updated_at?: string
          user_id: string
          voice_profile_id?: string | null
          volume?: number | null
          waveform_data?: Json | null
        }
        Update: {
          audio_url?: string
          clip_name?: string
          clip_type?: string
          created_at?: string
          duration?: number
          end_time?: number
          fade_in?: number | null
          fade_out?: number | null
          generation_model?: string | null
          generation_prompt?: string | null
          id?: string
          metadata?: Json | null
          pitch?: number | null
          speed?: number | null
          start_time?: number
          track_id?: string
          updated_at?: string
          user_id?: string
          voice_profile_id?: string | null
          volume?: number | null
          waveform_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_audio_clips_track"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "audio_tracks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_audio_clips_voice_profile"
            columns: ["voice_profile_id"]
            isOneToOne: false
            referencedRelation: "voice_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audio_processing_jobs: {
        Row: {
          completed_at: string | null
          cost_credits: number | null
          created_at: string
          error_message: string | null
          id: string
          input_data: Json
          job_type: string
          output_data: Json | null
          processing_time_seconds: number | null
          progress: number | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          cost_credits?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_data: Json
          job_type: string
          output_data?: Json | null
          processing_time_seconds?: number | null
          progress?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          cost_credits?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_data?: Json
          job_type?: string
          output_data?: Json | null
          processing_time_seconds?: number | null
          progress?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audio_projects: {
        Row: {
          bpm: number | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          key_signature: string | null
          metadata: Json | null
          status: string | null
          time_signature: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bpm?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          key_signature?: string | null
          metadata?: Json | null
          status?: string | null
          time_signature?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bpm?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          key_signature?: string | null
          metadata?: Json | null
          status?: string | null
          time_signature?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audio_tracks: {
        Row: {
          color: string | null
          created_at: string
          effects: Json | null
          id: string
          is_locked: boolean | null
          is_muted: boolean | null
          is_soloed: boolean | null
          pan: number | null
          project_id: string
          track_index: number
          track_name: string
          track_type: string
          updated_at: string
          volume: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          effects?: Json | null
          id?: string
          is_locked?: boolean | null
          is_muted?: boolean | null
          is_soloed?: boolean | null
          pan?: number | null
          project_id: string
          track_index: number
          track_name: string
          track_type: string
          updated_at?: string
          volume?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          effects?: Json | null
          id?: string
          is_locked?: boolean | null
          is_muted?: boolean | null
          is_soloed?: boolean | null
          pan?: number | null
          project_id?: string
          track_index?: number
          track_name?: string
          track_type?: string
          updated_at?: string
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_audio_tracks_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "audio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          ai_generated: boolean | null
          ai_model_used: string | null
          created_at: string | null
          dimensions: string | null
          duration_seconds: number | null
          file_size: number
          file_type: string
          filename: string
          id: string
          metadata: Json | null
          mime_type: string
          project_id: string | null
          storage_path: string
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          ai_model_used?: string | null
          created_at?: string | null
          dimensions?: string | null
          duration_seconds?: number | null
          file_size: number
          file_type: string
          filename: string
          id?: string
          metadata?: Json | null
          mime_type: string
          project_id?: string | null
          storage_path: string
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          ai_model_used?: string | null
          created_at?: string | null
          dimensions?: string | null
          duration_seconds?: number | null
          file_size?: number
          file_type?: string
          filename?: string
          id?: string
          metadata?: Json | null
          mime_type?: string
          project_id?: string | null
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_assets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      music_compositions: {
        Row: {
          adaptive_parameters: Json | null
          audio_url: string | null
          bpm: number | null
          created_at: string
          download_count: number | null
          duration_seconds: number | null
          generation_prompt: string
          genre: string | null
          id: string
          instruments: Json | null
          key_signature: string | null
          leitmotifs: Json | null
          mood: string | null
          quality_score: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          adaptive_parameters?: Json | null
          audio_url?: string | null
          bpm?: number | null
          created_at?: string
          download_count?: number | null
          duration_seconds?: number | null
          generation_prompt: string
          genre?: string | null
          id?: string
          instruments?: Json | null
          key_signature?: string | null
          leitmotifs?: Json | null
          mood?: string | null
          quality_score?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          adaptive_parameters?: Json | null
          audio_url?: string | null
          bpm?: number | null
          created_at?: string
          download_count?: number | null
          duration_seconds?: number | null
          generation_prompt?: string
          genre?: string | null
          id?: string
          instruments?: Json | null
          key_signature?: string | null
          leitmotifs?: Json | null
          mood?: string | null
          quality_score?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          credits_remaining: number | null
          email: string | null
          full_name: string | null
          id: string
          subscription_tier: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credits_remaining?: number | null
          email?: string | null
          full_name?: string | null
          id: string
          subscription_tier?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credits_remaining?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          subscription_tier?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          fps: number | null
          id: string
          resolution: string | null
          settings: Json | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          fps?: number | null
          id?: string
          resolution?: string | null
          settings?: Json | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          fps?: number | null
          id?: string
          resolution?: string | null
          settings?: Json | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_effects: {
        Row: {
          audio_url: string
          category: string
          created_at: string
          duration_seconds: number
          effect_name: string
          frequency_range: string | null
          generation_model: string | null
          generation_prompt: string | null
          id: string
          is_loopable: boolean | null
          quality_rating: number | null
          subcategory: string | null
          tags: string[] | null
          updated_at: string
          usage_count: number | null
          user_id: string
          volume_normalization: number | null
        }
        Insert: {
          audio_url: string
          category: string
          created_at?: string
          duration_seconds: number
          effect_name: string
          frequency_range?: string | null
          generation_model?: string | null
          generation_prompt?: string | null
          id?: string
          is_loopable?: boolean | null
          quality_rating?: number | null
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string
          usage_count?: number | null
          user_id: string
          volume_normalization?: number | null
        }
        Update: {
          audio_url?: string
          category?: string
          created_at?: string
          duration_seconds?: number
          effect_name?: string
          frequency_range?: string | null
          generation_model?: string | null
          generation_prompt?: string | null
          id?: string
          is_loopable?: boolean | null
          quality_rating?: number | null
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string
          usage_count?: number | null
          user_id?: string
          volume_normalization?: number | null
        }
        Relationships: []
      }
      timeline_clips: {
        Row: {
          clip_end: number | null
          clip_start: number | null
          created_at: string | null
          effects: Json | null
          end_time: number
          id: string
          media_asset_id: string | null
          metadata: Json | null
          position_x: number
          start_time: number
          track_id: string
          transitions: Json | null
        }
        Insert: {
          clip_end?: number | null
          clip_start?: number | null
          created_at?: string | null
          effects?: Json | null
          end_time: number
          id?: string
          media_asset_id?: string | null
          metadata?: Json | null
          position_x?: number
          start_time?: number
          track_id: string
          transitions?: Json | null
        }
        Update: {
          clip_end?: number | null
          clip_start?: number | null
          created_at?: string | null
          effects?: Json | null
          end_time?: number
          id?: string
          media_asset_id?: string | null
          metadata?: Json | null
          position_x?: number
          start_time?: number
          track_id?: string
          transitions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "timeline_clips_media_asset_id_fkey"
            columns: ["media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_clips_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "timeline_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_tracks: {
        Row: {
          created_at: string | null
          height: number | null
          id: string
          is_locked: boolean | null
          is_muted: boolean | null
          name: string
          project_id: string
          track_index: number
          track_type: string
        }
        Insert: {
          created_at?: string | null
          height?: number | null
          id?: string
          is_locked?: boolean | null
          is_muted?: boolean | null
          name: string
          project_id: string
          track_index: number
          track_type: string
        }
        Update: {
          created_at?: string | null
          height?: number | null
          id?: string
          is_locked?: boolean | null
          is_muted?: boolean | null
          name?: string
          project_id?: string
          track_index?: number
          track_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_tracks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_profiles: {
        Row: {
          character_name: string
          created_at: string
          emotional_variants: Json | null
          id: string
          is_cloned: boolean | null
          quality_score: number | null
          sample_text: string | null
          updated_at: string
          usage_count: number | null
          user_id: string
          voice_id: string | null
          voice_settings: Json | null
        }
        Insert: {
          character_name: string
          created_at?: string
          emotional_variants?: Json | null
          id?: string
          is_cloned?: boolean | null
          quality_score?: number | null
          sample_text?: string | null
          updated_at?: string
          usage_count?: number | null
          user_id: string
          voice_id?: string | null
          voice_settings?: Json | null
        }
        Update: {
          character_name?: string
          created_at?: string
          emotional_variants?: Json | null
          id?: string
          is_cloned?: boolean | null
          quality_score?: number | null
          sample_text?: string | null
          updated_at?: string
          usage_count?: number | null
          user_id?: string
          voice_id?: string | null
          voice_settings?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
