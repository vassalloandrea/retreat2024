import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qusyburebqehgqaidhfp.supabase.co'
export const supabase = createClient(
  supabaseUrl,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1c3lidXJlYnFlaGdxYWlkaGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTc0MTksImV4cCI6MjAyNzE5MzQxOX0.lJZ-tZ95igKTxYt7MNbRUDhfTbgHvS9CD-50COD63Pk'
)
