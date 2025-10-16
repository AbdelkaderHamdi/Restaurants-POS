import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kluxbreyzzsccwvvlahf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdXhicmV5enpzY2N3dnZsYWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTQzMjYsImV4cCI6MjA3NjE5MDMyNn0.6izmZiqCjrWHdr3BmxCo2mAxKMxIe-nOtRaXGP6sqZQ';

// The createClient function is available on the window object
// because we included the Supabase library in index.html.
const { createClient: createSupabaseClient } = (window as any).supabase;

export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
