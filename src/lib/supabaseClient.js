// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zdxicltlssupfycmtoyz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkeGljbHRsc3N1cGZ5Y210b3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2NTI1NTksImV4cCI6MjA4MjIyODU1OX0.prfbghfbQmrdV4vKWyXUJlmbnbUKMeQYnztI_EdHRLg';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key loaded:', supabaseAnonKey ? 'Yes' : 'No');
console.log('Using env vars:', import.meta.env.VITE_SUPABASE_URL ? 'Yes' : 'No (using fallback)');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);