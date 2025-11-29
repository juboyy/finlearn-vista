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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agenda_activities: {
        Row: {
          activity_type: string
          attachments: Json | null
          color: string
          completed_at: string | null
          created_at: string
          description: string | null
          end_time: string
          icon: string | null
          id: string
          location: string | null
          start_time: string
          status: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activity_type: string
          attachments?: Json | null
          color?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          icon?: string | null
          id?: string
          location?: string | null
          start_time: string
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          attachments?: Json | null
          color?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          icon?: string | null
          id?: string
          location?: string | null
          start_time?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      agenda_activity_invitations: {
        Row: {
          activity_id: string
          id: string
          invited_at: string
          invitee_email: string
          invitee_name: string | null
          responded_at: string | null
          status: string
        }
        Insert: {
          activity_id: string
          id?: string
          invited_at?: string
          invitee_email: string
          invitee_name?: string | null
          responded_at?: string | null
          status?: string
        }
        Update: {
          activity_id?: string
          id?: string
          invited_at?: string
          invitee_email?: string
          invitee_name?: string | null
          responded_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenda_activity_invitations_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "agenda_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_suggestions: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          metadata: Json | null
          priority: string
          suggestion_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          metadata?: Json | null
          priority?: string
          suggestion_type: string
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          metadata?: Json | null
          priority?: string
          suggestion_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chart_explanations: {
        Row: {
          attention_points: string[] | null
          chart_data: Json
          created_at: string
          explanation: string
          id: string
          recommendations: string[] | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          attention_points?: string[] | null
          chart_data: Json
          created_at?: string
          explanation: string
          id?: string
          recommendations?: string[] | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          attention_points?: string[] | null
          chart_data?: Json
          created_at?: string
          explanation?: string
          id?: string
          recommendations?: string[] | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contract_summaries: {
        Row: {
          agent_id: string
          agent_name: string
          created_at: string
          file_name: string
          file_size: number
          id: string
          last_accessed_at: string | null
          processing_time_seconds: number | null
          summary_content: string
          summary_length_type: string | null
          summary_type: string
        }
        Insert: {
          agent_id: string
          agent_name: string
          created_at?: string
          file_name: string
          file_size: number
          id?: string
          last_accessed_at?: string | null
          processing_time_seconds?: number | null
          summary_content: string
          summary_length_type?: string | null
          summary_type: string
        }
        Update: {
          agent_id?: string
          agent_name?: string
          created_at?: string
          file_name?: string
          file_size?: number
          id?: string
          last_accessed_at?: string | null
          processing_time_seconds?: number | null
          summary_content?: string
          summary_length_type?: string | null
          summary_type?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          fts: unknown
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          fts?: unknown
          id?: never
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          fts?: unknown
          id?: never
          metadata?: Json | null
        }
        Relationships: []
      }
      ebook_annotations: {
        Row: {
          annotation_content: string | null
          annotation_type: string
          chapter_name: string | null
          created_at: string
          ebook_id: string
          ebook_title: string
          highlight_color: string | null
          highlight_name: string | null
          id: string
          is_deleted: boolean | null
          page_number: number | null
          position_end: number
          position_start: number
          selected_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          annotation_content?: string | null
          annotation_type: string
          chapter_name?: string | null
          created_at?: string
          ebook_id: string
          ebook_title: string
          highlight_color?: string | null
          highlight_name?: string | null
          id?: string
          is_deleted?: boolean | null
          page_number?: number | null
          position_end: number
          position_start: number
          selected_text: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          annotation_content?: string | null
          annotation_type?: string
          chapter_name?: string | null
          created_at?: string
          ebook_id?: string
          ebook_title?: string
          highlight_color?: string | null
          highlight_name?: string | null
          id?: string
          is_deleted?: boolean | null
          page_number?: number | null
          position_end?: number
          position_start?: number
          selected_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ebook_bookmarks: {
        Row: {
          bookmark_name: string | null
          chapter_name: string | null
          created_at: string
          ebook_id: string
          ebook_title: string
          id: string
          page_number: number
          preview_text: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bookmark_name?: string | null
          chapter_name?: string | null
          created_at?: string
          ebook_id: string
          ebook_title: string
          id?: string
          page_number: number
          preview_text?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          bookmark_name?: string | null
          chapter_name?: string | null
          created_at?: string
          ebook_id?: string
          ebook_title?: string
          id?: string
          page_number?: number
          preview_text?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ebook_reading_conversations: {
        Row: {
          conversation_title: string | null
          created_at: string
          ebook_id: string
          ebook_title: string
          id: string
          last_page: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          conversation_title?: string | null
          created_at?: string
          ebook_id: string
          ebook_title: string
          id?: string
          last_page?: number | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          conversation_title?: string | null
          created_at?: string
          ebook_id?: string
          ebook_title?: string
          id?: string
          last_page?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ebook_reading_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          page_number: number | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          page_number?: number | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          page_number?: number | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ebook_reading_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ebook_reading_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      live_banned_users: {
        Row: {
          ban_expires_at: string | null
          ban_reason: string | null
          ban_type: string | null
          banned_at: string | null
          banned_by: string
          id: string
          live_id: string
          user_id: string
          user_name: string
        }
        Insert: {
          ban_expires_at?: string | null
          ban_reason?: string | null
          ban_type?: string | null
          banned_at?: string | null
          banned_by: string
          id?: string
          live_id: string
          user_id: string
          user_name: string
        }
        Update: {
          ban_expires_at?: string | null
          ban_reason?: string | null
          ban_type?: string | null
          banned_at?: string | null
          banned_by?: string
          id?: string
          live_id?: string
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      live_chat_deleted_messages: {
        Row: {
          deleted_at: string | null
          deleted_by: string
          deletion_reason: string | null
          id: string
          live_id: string
          message_content: string
          message_id: string
          user_id: string | null
          user_name: string
        }
        Insert: {
          deleted_at?: string | null
          deleted_by: string
          deletion_reason?: string | null
          id?: string
          live_id: string
          message_content: string
          message_id: string
          user_id?: string | null
          user_name: string
        }
        Update: {
          deleted_at?: string | null
          deleted_by?: string
          deletion_reason?: string | null
          id?: string
          live_id?: string
          message_content?: string
          message_id?: string
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      live_chat_filters: {
        Row: {
          action: string | null
          created_at: string | null
          created_by: string | null
          filter_type: string
          filter_value: string
          id: string
          is_global: boolean | null
          live_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by?: string | null
          filter_type: string
          filter_value: string
          id?: string
          is_global?: boolean | null
          live_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by?: string | null
          filter_type?: string
          filter_value?: string
          id?: string
          is_global?: boolean | null
          live_id?: string | null
        }
        Relationships: []
      }
      live_chat_messages: {
        Row: {
          created_at: string
          id: string
          live_id: string
          message: string
          user_avatar: string | null
          user_id: string | null
          user_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          live_id: string
          message: string
          user_avatar?: string | null
          user_id?: string | null
          user_name: string
        }
        Update: {
          created_at?: string
          id?: string
          live_id?: string
          message?: string
          user_avatar?: string | null
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      live_chat_reactions: {
        Row: {
          created_at: string | null
          id: string
          live_id: string
          reaction_type: string
          user_avatar: string | null
          user_id: string | null
          user_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          live_id: string
          reaction_type: string
          user_avatar?: string | null
          user_id?: string | null
          user_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          live_id?: string
          reaction_type?: string
          user_avatar?: string | null
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      live_moderators: {
        Row: {
          assigned_at: string | null
          assigned_by: string
          id: string
          live_id: string
          permissions: Json | null
          user_avatar: string | null
          user_id: string
          user_name: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by: string
          id?: string
          live_id: string
          permissions?: Json | null
          user_avatar?: string | null
          user_id: string
          user_name: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string
          id?: string
          live_id?: string
          permissions?: Json | null
          user_avatar?: string | null
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      live_notification_preferences: {
        Row: {
          created_at: string
          enabled: boolean
          id: string
          notify_minutes_before: number
          notify_on_start: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          id?: string
          notify_minutes_before?: number
          notify_on_start?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          id?: string
          notify_minutes_before?: number
          notify_on_start?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      live_notifications_sent: {
        Row: {
          id: string
          live_id: string
          notification_type: string
          sent_at: string
          user_id: string
        }
        Insert: {
          id?: string
          live_id: string
          notification_type: string
          sent_at?: string
          user_id: string
        }
        Update: {
          id?: string
          live_id?: string
          notification_type?: string
          sent_at?: string
          user_id?: string
        }
        Relationships: []
      }
      markdown_chapters: {
        Row: {
          content: string
          created_at: string
          document_id: string
          id: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          document_id: string
          id?: string
          position: number
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          document_id?: string
          id?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "markdown_chapters_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "markdown_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      markdown_documents: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      presentations: {
        Row: {
          author_name: string
          author_type: string
          cover_image: string | null
          created_at: string
          description: string | null
          id: string
          is_paid: boolean | null
          payment_methods: Json | null
          price: number | null
          rating: number | null
          slides: Json
          status: string
          target_audience: string | null
          title: string
          topic: string | null
          updated_at: string
          views: number
        }
        Insert: {
          author_name?: string
          author_type?: string
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_paid?: boolean | null
          payment_methods?: Json | null
          price?: number | null
          rating?: number | null
          slides?: Json
          status?: string
          target_audience?: string | null
          title: string
          topic?: string | null
          updated_at?: string
          views?: number
        }
        Update: {
          author_name?: string
          author_type?: string
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_paid?: boolean | null
          payment_methods?: Json | null
          price?: number | null
          rating?: number | null
          slides?: Json
          status?: string
          target_audience?: string | null
          title?: string
          topic?: string | null
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      product_promotions: {
        Row: {
          created_at: string
          discount_percentage: number
          ends_at: string
          id: string
          is_active: boolean | null
          original_price: number
          product_category: string | null
          product_id: string
          product_tags: string[] | null
          product_title: string
          product_type: string
          promotional_price: number
          starts_at: string
        }
        Insert: {
          created_at?: string
          discount_percentage: number
          ends_at: string
          id?: string
          is_active?: boolean | null
          original_price: number
          product_category?: string | null
          product_id: string
          product_tags?: string[] | null
          product_title: string
          product_type: string
          promotional_price: number
          starts_at?: string
        }
        Update: {
          created_at?: string
          discount_percentage?: number
          ends_at?: string
          id?: string
          is_active?: boolean | null
          original_price?: number
          product_category?: string | null
          product_id?: string
          product_tags?: string[] | null
          product_title?: string
          product_type?: string
          promotional_price?: number
          starts_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          additional_materials: Json | null
          allow_printing: boolean | null
          allow_text_copy: boolean | null
          author_name: string
          category: string
          co_authors: Json | null
          content_samples: Json | null
          cover_image: string | null
          cover_image_url: string | null
          created_at: string
          credentials: string
          digital_watermark: boolean | null
          drm_protection: boolean | null
          faqs: Json | null
          file_url: string | null
          id: string
          is_free: boolean | null
          language: string
          long_description: string | null
          main_file_url: string | null
          presentation_video_url: string | null
          preview_file_url: string | null
          price: number | null
          product_type: string
          short_description: string
          status: string
          subcategory: string | null
          subtitle: string | null
          tags: string[]
          target_audience: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_materials?: Json | null
          allow_printing?: boolean | null
          allow_text_copy?: boolean | null
          author_name: string
          category: string
          co_authors?: Json | null
          content_samples?: Json | null
          cover_image?: string | null
          cover_image_url?: string | null
          created_at?: string
          credentials: string
          digital_watermark?: boolean | null
          drm_protection?: boolean | null
          faqs?: Json | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          language?: string
          long_description?: string | null
          main_file_url?: string | null
          presentation_video_url?: string | null
          preview_file_url?: string | null
          price?: number | null
          product_type?: string
          short_description: string
          status?: string
          subcategory?: string | null
          subtitle?: string | null
          tags?: string[]
          target_audience?: string[]
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          additional_materials?: Json | null
          allow_printing?: boolean | null
          allow_text_copy?: boolean | null
          author_name?: string
          category?: string
          co_authors?: Json | null
          content_samples?: Json | null
          cover_image?: string | null
          cover_image_url?: string | null
          created_at?: string
          credentials?: string
          digital_watermark?: boolean | null
          drm_protection?: boolean | null
          faqs?: Json | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          language?: string
          long_description?: string | null
          main_file_url?: string | null
          presentation_video_url?: string | null
          preview_file_url?: string | null
          price?: number | null
          product_type?: string
          short_description?: string
          status?: string
          subcategory?: string | null
          subtitle?: string | null
          tags?: string[]
          target_audience?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_charts: {
        Row: {
          chart_data: Json
          chart_type: string
          created_at: string
          explanation_id: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          chart_data: Json
          chart_type: string
          created_at?: string
          explanation_id?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          chart_data?: Json
          chart_type?: string
          created_at?: string
          explanation_id?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_charts_explanation_id_fkey"
            columns: ["explanation_id"]
            isOneToOne: false
            referencedRelation: "chart_explanations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_browsing_history: {
        Row: {
          id: string
          product_category: string | null
          product_id: string
          product_tags: string[] | null
          product_title: string
          product_type: string
          time_spent_seconds: number | null
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          product_category?: string | null
          product_id: string
          product_tags?: string[] | null
          product_title: string
          product_type: string
          time_spent_seconds?: number | null
          user_id?: string
          viewed_at?: string
        }
        Update: {
          id?: string
          product_category?: string | null
          product_id?: string
          product_tags?: string[] | null
          product_title?: string
          product_type?: string
          time_spent_seconds?: number | null
          user_id?: string
          viewed_at?: string
        }
        Relationships: []
      }
      user_favorite_podcasts: {
        Row: {
          created_at: string
          id: string
          podcast_id: string
          podcast_image: string
          podcast_title: string
          podcast_topic: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          podcast_id: string
          podcast_image: string
          podcast_title: string
          podcast_topic: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          podcast_id?: string
          podcast_image?: string
          podcast_title?: string
          podcast_topic?: string
          user_id?: string
        }
        Relationships: []
      }
      user_followed_lives: {
        Row: {
          created_at: string
          id: string
          live_id: string
          live_scheduled_time: string
          live_title: string
          presenter_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          live_id: string
          live_scheduled_time: string
          live_title: string
          presenter_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          live_id?: string
          live_scheduled_time?: string
          live_title?: string
          presenter_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          read_at?: string | null
          title: string
          user_id?: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_podcast_history: {
        Row: {
          created_at: string
          current_time_seconds: number
          episode_number: number | null
          id: string
          last_played_at: string
          podcast_id: string
          podcast_image: string
          podcast_title: string
          podcast_topic: string
          progress_percentage: number
          total_duration_seconds: number
          user_id: string
        }
        Insert: {
          created_at?: string
          current_time_seconds?: number
          episode_number?: number | null
          id?: string
          last_played_at?: string
          podcast_id: string
          podcast_image: string
          podcast_title: string
          podcast_topic: string
          progress_percentage?: number
          total_duration_seconds: number
          user_id?: string
        }
        Update: {
          created_at?: string
          current_time_seconds?: number
          episode_number?: number | null
          id?: string
          last_played_at?: string
          podcast_id?: string
          podcast_image?: string
          podcast_title?: string
          podcast_topic?: string
          progress_percentage?: number
          total_duration_seconds?: number
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          interests: string[] | null
          preferred_categories: string[] | null
          preferred_content_types: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          skill_level: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interests?: string[] | null
          preferred_categories?: string[] | null
          preferred_content_types?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          skill_level?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          interests?: string[] | null
          preferred_categories?: string[] | null
          preferred_content_types?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          skill_level?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_purchases: {
        Row: {
          completed: boolean | null
          id: string
          price: number
          product_category: string | null
          product_id: string
          product_tags: string[] | null
          product_title: string
          product_type: string
          purchased_at: string
          rating: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          id?: string
          price: number
          product_category?: string | null
          product_id: string
          product_tags?: string[] | null
          product_title: string
          product_type: string
          purchased_at?: string
          rating?: number | null
          user_id?: string
        }
        Update: {
          completed?: boolean | null
          id?: string
          price?: number
          product_category?: string | null
          product_id?: string
          product_tags?: string[] | null
          product_title?: string
          product_type?: string
          purchased_at?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deactivate_expired_promotions: { Args: never; Returns: undefined }
      hybrid_search: {
        Args: {
          full_text_weight?: number
          match_count: number
          query_embedding: string
          query_text: string
          rrf_k?: number
          semantic_weight?: number
        }
        Returns: {
          content: string
          id: number
          rank: number
          score: number
        }[]
      }
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
