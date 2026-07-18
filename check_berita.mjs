import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://pmrowiyvuqnxgzmlbfzx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcm93aXl2dXFueGd6bWxiZnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1ODc5MjUsImV4cCI6MjA5OTE2MzkyNX0.biXbpbXH7WF5qkYtCMC-KBQfey5fQzusaKTQ875jrmQ"
);
async function run() {
  const { data, error } = await supabase.from("berita").select("*").limit(1);
  if (error) { console.log("Error:", error.message); return; }
  if (data && data.length > 0) { console.log("Columns:", Object.keys(data[0])); }
  else { console.log("Table is empty. Trying insert test..."); }
}
run();
