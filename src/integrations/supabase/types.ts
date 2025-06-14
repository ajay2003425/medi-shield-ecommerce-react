export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          current_uses: number | null
          discount_percent: number
          expiry_date: string
          id: string
          max_uses: number | null
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number | null
          discount_percent: number
          expiry_date: string
          id?: string
          max_uses?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number | null
          discount_percent?: number
          expiry_date?: string
          id?: string
          max_uses?: number | null
        }
        Relationships: []
      }
      generated_reports: {
        Row: {
          abstract: string | null
          file_path: string
          file_size: number
          generated_at: string
          id: string
          project_id: string
          report_type: string
          title: string
        }
        Insert: {
          abstract?: string | null
          file_path: string
          file_size: number
          generated_at?: string
          id?: string
          project_id: string
          report_type: string
          title: string
        }
        Update: {
          abstract?: string | null
          file_path?: string
          file_size?: number
          generated_at?: string
          id?: string
          project_id?: string
          report_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          shipping_address: Json | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          admin_notes: string | null
          approved: boolean | null
          file_url: string
          id: string
          reviewed_at: string | null
          submitted_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          approved?: boolean | null
          file_url: string
          id?: string
          reviewed_at?: string | null
          submitted_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          approved?: boolean | null
          file_url?: string
          id?: string
          reviewed_at?: string | null
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bestseller: boolean | null
          brand: string | null
          category_id: string | null
          created_at: string
          description: string | null
          discount: number | null
          dosage: string | null
          id: string
          image_url: string | null
          manufacturer: string | null
          name: string
          original_price: number | null
          price: number
          rating: number | null
          requires_prescription: boolean | null
          reviews: Json | null
          side_effects: string | null
          stock: number | null
          updated_at: string
        }
        Insert: {
          bestseller?: boolean | null
          brand?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount?: number | null
          dosage?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          name: string
          original_price?: number | null
          price: number
          rating?: number | null
          requires_prescription?: boolean | null
          reviews?: Json | null
          side_effects?: string | null
          stock?: number | null
          updated_at?: string
        }
        Update: {
          bestseller?: boolean | null
          brand?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount?: number | null
          dosage?: string | null
          id?: string
          image_url?: string | null
          manufacturer?: string | null
          name?: string
          original_price?: number | null
          price?: number
          rating?: number | null
          requires_prescription?: boolean | null
          reviews?: Json | null
          side_effects?: string | null
          stock?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      project_analysis: {
        Row: {
          created_at: string
          database_schema: string | null
          file_structure: Json
          has_backend: boolean
          has_database: boolean
          has_frontend: boolean
          id: string
          languages: Json
          lines_of_code: number
          package_info: Json | null
          project_id: string
          readme_content: string | null
          technologies: Json
          total_files: number
        }
        Insert: {
          created_at?: string
          database_schema?: string | null
          file_structure?: Json
          has_backend?: boolean
          has_database?: boolean
          has_frontend?: boolean
          id?: string
          languages?: Json
          lines_of_code?: number
          package_info?: Json | null
          project_id: string
          readme_content?: string | null
          technologies?: Json
          total_files?: number
        }
        Update: {
          created_at?: string
          database_schema?: string | null
          file_structure?: Json
          has_backend?: boolean
          has_database?: boolean
          has_frontend?: boolean
          id?: string
          languages?: Json
          lines_of_code?: number
          package_info?: Json | null
          project_id?: string
          readme_content?: string | null
          technologies?: Json
          total_files?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_analysis_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          file_size: number
          id: string
          name: string
          original_filename: string
          status: string
          updated_at: string
          upload_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size: number
          id?: string
          name: string
          original_filename: string
          status?: string
          updated_at?: string
          upload_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number
          id?: string
          name?: string
          original_filename?: string
          status?: string
          updated_at?: string
          upload_path?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      order_status:
        | "pending"
        | "confirmed"
        | "packed"
        | "shipped"
        | "delivered"
        | "cancelled"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "pending",
        "confirmed",
        "packed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      user_role: ["user", "admin"],
    },
  },
} as const
