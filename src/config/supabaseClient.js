import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://usybutbrvjohotcqfpaa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeWJ1dGJydmpvaG90Y3FmcGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMTAwNDEsImV4cCI6MjAyNjc4NjA0MX0.Xzjh49w6H45SrippDX_cuP_2DVzKV5TIY2l_1NNkK-E";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
