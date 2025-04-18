import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}