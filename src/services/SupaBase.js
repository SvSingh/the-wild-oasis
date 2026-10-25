import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ekoeeghdzutqawasjpxi.supabase.co";
export { supabaseUrl };

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrb2VlZ2hkenV0cWF3YXNqcHhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjI3NjgxMCwiZXhwIjoyMTA3ODUyODEwfQ.9RlT8JJR7lBdHYDrSUVZ2uRLB00v08DczuIxYu1bJ0g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
