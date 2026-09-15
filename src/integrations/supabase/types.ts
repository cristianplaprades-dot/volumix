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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      campaign_metrics: {
        Row: {
          campaign_id: string
          created_at: string
          event: string
          id: string
          referral_code: string | null
          session_id: string | null
          traffic_source: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          event: string
          id?: string
          referral_code?: string | null
          session_id?: string | null
          traffic_source?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          event?: string
          id?: string
          referral_code?: string | null
          session_id?: string | null
          traffic_source?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          created_at: string
          currency: string
          goal_leads: number
          id: string
          is_active: boolean
          market: string
          notes: string | null
          potential_saving: number | null
          product_id: string
          reference_price: number | null
          slug: string
          status: string
          target_price_max: number | null
          target_price_min: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          goal_leads?: number
          id?: string
          is_active?: boolean
          market?: string
          notes?: string | null
          potential_saving?: number | null
          product_id: string
          reference_price?: number | null
          slug: string
          status?: string
          target_price_max?: number | null
          target_price_min?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          goal_leads?: number
          id?: string
          is_active?: boolean
          market?: string
          notes?: string | null
          potential_saving?: number | null
          product_id?: string
          reference_price?: number | null
          slug?: string
          status?: string
          target_price_max?: number | null
          target_price_min?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          campaign_id: string
          consent: boolean
          country: string
          created_at: string
          email: string
          id: string
          name: string
          notify_on_price: boolean
          postal_code: string
          price_bucket: string
          referral_code: string | null
          referred_by_code: string | null
          traffic_source: string
          units: number
          updated_at: string
        }
        Insert: {
          campaign_id: string
          consent?: boolean
          country: string
          created_at?: string
          email: string
          id?: string
          name: string
          notify_on_price?: boolean
          postal_code: string
          price_bucket: string
          referral_code?: string | null
          referred_by_code?: string | null
          traffic_source?: string
          units?: number
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          consent?: boolean
          country?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          notify_on_price?: boolean
          postal_code?: string
          price_bucket?: string
          referral_code?: string | null
          referred_by_code?: string | null
          traffic_source?: string
          units?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      price_preferences: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          lead_id: string
          max_price: number | null
          price_bucket: string
          units: number
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          lead_id: string
          max_price?: number | null
          price_bucket: string
          units?: number
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          lead_id?: string
          max_price?: number | null
          price_bucket?: string
          units?: number
        }
        Relationships: [
          {
            foreignKeyName: "price_preferences_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_preferences_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string
          created_at: string
          description: string | null
          gallery: Json
          highlights: Json
          id: string
          image_url: string | null
          name: string
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category: string
          created_at?: string
          description?: string | null
          gallery?: Json
          highlights?: Json
          id?: string
          image_url?: string | null
          name: string
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category?: string
          created_at?: string
          description?: string | null
          gallery?: Json
          highlights?: Json
          id?: string
          image_url?: string | null
          name?: string
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          campaign_id: string
          clicks: number
          code: string
          created_at: string
          id: string
          referrer_lead_id: string | null
          signups: number
          updated_at: string
        }
        Insert: {
          campaign_id: string
          clicks?: number
          code: string
          created_at?: string
          id?: string
          referrer_lead_id?: string | null
          signups?: number
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          clicks?: number
          code?: string
          created_at?: string
          id?: string
          referrer_lead_id?: string | null
          signups?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_lead_id_fkey"
            columns: ["referrer_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      traffic_sources: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          medium: string | null
          source: string
          updated_at: string
          utm_campaign: string | null
          visits: number
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          medium?: string | null
          source: string
          updated_at?: string
          utm_campaign?: string | null
          visits?: number
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          medium?: string | null
          source?: string
          updated_at?: string
          utm_campaign?: string | null
          visits?: number
        }
        Relationships: [
          {
            foreignKeyName: "traffic_sources_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      campaign_public_stats: {
        Args: { _slug: string }
        Returns: {
          goal: number
          interested: number
          units: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const

