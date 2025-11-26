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
