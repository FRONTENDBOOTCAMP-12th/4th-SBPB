export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      comment: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          parent_comment_id: number | null;
          post_id: number | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          parent_comment_id?: number | null;
          post_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          parent_comment_id?: number | null;
          post_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_parent_comment_id_fkey';
            columns: ['parent_comment_id'];
            isOneToOne: false;
            referencedRelation: 'comment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['user_id'];
          },
        ];
      };
      follow: {
        Row: {
          follow_user_id: number | null;
          follow_user_uuid: string | null;
          following_user_id: number | null;
          following_user_uuid: string | null;
          Id: number;
        };
        Insert: {
          follow_user_id?: number | null;
          follow_user_uuid?: string | null;
          following_user_id?: number | null;
          following_user_uuid?: string | null;
          Id?: number;
        };
        Update: {
          follow_user_id?: number | null;
          follow_user_uuid?: string | null;
          following_user_id?: number | null;
          following_user_uuid?: string | null;
          Id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'follow_follow_user_id_fkey';
            columns: ['follow_user_id'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follow_follow_user_uuid_fkey';
            columns: ['follow_user_uuid'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'follow_following_user_id_fkey';
            columns: ['following_user_id'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follow_following_user_uuid_fkey';
            columns: ['following_user_uuid'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['user_id'];
          },
        ];
      };
      post: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image_url: string | null;
          location: string | null;
          other_images: string[] | null;
          tags: string | null;
          thumbs: number | null;
          title: string;
          user_id: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          location?: string | null;
          other_images?: string[] | null;
          tags?: string | null;
          thumbs?: number | null;
          title: string;
          user_id?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          location?: string | null;
          other_images?: string[] | null;
          tags?: string | null;
          thumbs?: number | null;
          title?: string;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'post_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['id'];
          },
        ];
      };
      userinfo: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          interested_area: string[] | null;
          nickname: string | null;
          profile_path: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          interested_area?: string[] | null;
          nickname?: string | null;
          profile_path?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          interested_area?: string[] | null;
          nickname?: string | null;
          profile_path?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
