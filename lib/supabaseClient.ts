import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tmqlevtmuirsjykvudiv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcWxldnRtdWlyc2p5a3Z1ZGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1OTM1MzgsImV4cCI6MjA2NzE2OTUzOH0.W-gb0TstbLU1bZufA-5QmoPPCkHjQskVNd1NJZE60_I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)