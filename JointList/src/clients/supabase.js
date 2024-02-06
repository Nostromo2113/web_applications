import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPAURL;
const supabaseAnonKey = import.meta.env.VITE_SUPAKEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// const supabaseUrl = 'https://spufrvrmoztnshefdiyh.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdWZydnJtb3p0bnNoZWZkaXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMDkxMDcsImV4cCI6MjAyMTg4NTEwN30.ItYTGYaWPgAH3eFFWW3gsk7JkZtiJpmvUhLzvaZZAA8';
