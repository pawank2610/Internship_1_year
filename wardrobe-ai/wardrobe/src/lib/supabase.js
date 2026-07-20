import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const MENS_CATEGORIES = [
  'T-Shirts', 'Shirts', 'Pants', 'Jeans', 'Shorts',
  'Suits', 'Jackets', 'Sweaters', 'Hoodies', 'Kurta',
  'Ethnic Wear', 'Activewear', 'Underwear', 'Socks',
  'Shoes', 'Accessories', 'Other'
];

export const WOMENS_CATEGORIES = [
  'Tops', 'T-Shirts', 'Shirts', 'Blouses', 'Dresses',
  'Skirts', 'Pants', 'Jeans', 'Shorts', 'Saree',
  'Kurta', 'Lehenga', 'Ethnic Wear', 'Jackets',
  'Sweaters', 'Hoodies', 'Activewear', 'Innerwear',
  'Socks', 'Shoes', 'Accessories', 'Other'
];

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
];