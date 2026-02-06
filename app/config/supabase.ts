// import { createClient } from '@supabase/supabase-js';

// const EXPO_PUBLIC_SUPABASE_URL="https://cxaftxbsmvophucmcjpd.supabase.co"

// const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YWZ0eGJzbXZvcGh1Y21janBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODQzODMsImV4cCI6MjA4MzQ2MDM4M30.mOcqaTE-8cvwXs8zmUf-E1vETbdf8cFpYKzDIzWAYTw"
//  const supabase = createClient(
// EXPO_PUBLIC_SUPABASE_URL,
// SUPABASE_ANON_KEY
// );

// export default supabase;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://cxaftxbsmvophucmcjpd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YWZ0eGJzbXZvcGh1Y21janBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODQzODMsImV4cCI6MjA4MzQ2MDM4M30.mOcqaTE-8cvwXs8zmUf-E1vETbdf8cFpYKzDIzWAYTw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});