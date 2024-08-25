export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      business: {
        Row: {
          address: string
          contact_number: string
          country: string
          created_at: string
          document_number: string
          document_type: string
          id: string
          is_active: boolean
          name: string
          postal_code: string
          province: string
          town: string
          user_id: string
        }
        Insert: {
          address: string
          contact_number: string
          country: string
          created_at?: string
          document_number: string
          document_type: string
          id?: string
          is_active?: boolean
          name: string
          postal_code: string
          province: string
          town: string
          user_id: string
        }
        Update: {
          address?: string
          contact_number?: string
          country?: string
          created_at?: string
          document_number?: string
          document_type?: string
          id?: string
          is_active?: boolean
          name?: string
          postal_code?: string
          province?: string
          town?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      business_establishments: {
        Row: {
          address: string
          business_id: string
          contact_phone: string
          country: string
          created_at: string
          gmt: string | null
          icon_image: string | null
          id: string
          latitude: string | null
          longitude: string | null
          name_abbreviation: string | null
          postal_code: string
          province: string
          town: string
        }
        Insert: {
          address: string
          business_id: string
          contact_phone: string
          country: string
          created_at?: string
          gmt?: string | null
          icon_image?: string | null
          id?: string
          latitude?: string | null
          longitude?: string | null
          name_abbreviation?: string | null
          postal_code: string
          province: string
          town: string
        }
        Update: {
          address?: string
          business_id?: string
          contact_phone?: string
          country?: string
          created_at?: string
          gmt?: string | null
          icon_image?: string | null
          id?: string
          latitude?: string | null
          longitude?: string | null
          name_abbreviation?: string | null
          postal_code?: string
          province?: string
          town?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_establishments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      business_user_assignments: {
        Row: {
          assignment_date: string
          business_establishments_id: string
          id: number
          role: Database["public"]["Enums"]["user_account_roles"]
          user_id: string
        }
        Insert: {
          assignment_date?: string
          business_establishments_id: string
          id?: number
          role: Database["public"]["Enums"]["user_account_roles"]
          user_id: string
        }
        Update: {
          assignment_date?: string
          business_establishments_id?: string
          id?: number
          role?: Database["public"]["Enums"]["user_account_roles"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_user_assignments_business_establishments_id_fkey"
            columns: ["business_establishments_id"]
            isOneToOne: false
            referencedRelation: "business_establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_user_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customer: {
        Row: {
          id: string
          stripe_customer_id: string
        }
        Insert: {
          id: string
          stripe_customer_id: string
        }
        Update: {
          id?: string
          stripe_customer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customer_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_prices: {
        Row: {
          active: boolean
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"]
          unit_amount: number | null
        }
        Insert: {
          active: boolean
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          product_id?: string | null
          trial_period_days?: number | null
          type: Database["public"]["Enums"]["pricing_type"]
          unit_amount?: number | null
        }
        Update: {
          active?: boolean
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"]
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "stripe_products"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string
        }
        Insert: {
          active: boolean
          created_at?: string
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "stripe_prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          name: Database["public"]["Enums"]["user_account_roles"]
        }
        Insert: {
          created_at?: string
          id?: number
          name: Database["public"]["Enums"]["user_account_roles"]
        }
        Update: {
          created_at?: string
          id?: number
          name?: Database["public"]["Enums"]["user_account_roles"]
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          custom_avatar_url: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          custom_avatar_url?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          custom_avatar_url?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      users_session: {
        Row: {
          action: Database["public"]["Enums"]["user_session_actions"]
          business_establishment_id: string
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["user_session_actions"]
          business_establishment_id: string
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["user_session_actions"]
          business_establishment_id?: string
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_session_business_establishment_id_fkey"
            columns: ["business_establishment_id"]
            isOneToOne: false
            referencedRelation: "business_establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_session_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      category_status: "DRAFT" | "PUBLISHED" | "DISCONTINUED"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      product_status: "DRAFT" | "PUBLISHED" | "DISCONTINUED"
      subscription_status:
          | "trialing"
          | "active"
          | "canceled"
          | "incomplete"
          | "incomplete_expired"
          | "past_due"
          | "unpaid"
          | "paused"
      user_account_roles:
          | "ROOT"
          | "OWNER"
          | "ADMIN"
          | "EMPLOYEE"
          | "TPV"
          | "CHEF"
      user_session_actions: "LOGIN" | "LOGOUT" | "SWITCH"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
            | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
            Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R
        }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
        ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
              Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends
            | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I
        }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
              Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
            | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U
        }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
              Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends
            | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
        ? PublicSchema["Enums"][PublicEnumNameOrOptions]
        : never
