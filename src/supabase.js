import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbrkhmbhthgewikychfx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmtobWJodGhnZXdpa3ljaGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMTg2MTQsImV4cCI6MjA2Njc5NDYxNH0.ADkJ_a1rU52F7nMKP2bKXwykawf_5oDwY3akGFpZRVY";

export const supabase = createClient(supabaseUrl, supabaseKey);
