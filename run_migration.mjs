import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://pmrowiyvuqnxgzmlbfzx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcm93aXl2dXFueGd6bWxiZnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1ODc5MjUsImV4cCI6MjA5OTE2MzkyNX0.biXbpbXH7WF5qkYtCMC-KBQfey5fQzusaKTQ875jrmQ"
);
async function run() {
  // Test by upserting a test row to see if is_published is recognized
  const { data, error } = await supabase.rpc('exec_sql', { sql: 'ALTER TABLE berita ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;' });
  if (error) console.log("RPC Error:", error.message, "- Will try direct approach");
  
  // Try updating to see if column works
  const { error: e2 } = await supabase.from("berita").update({ is_published: true }).neq("id", "00000000-0000-0000-0000-000000000000");
  if (e2) {
    console.log("Column does not exist yet:", e2.message);
    console.log("Please run this SQL in Supabase Dashboard > SQL Editor:");
    console.log("ALTER TABLE berita ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;");
  } else {
    console.log("SUCCESS: is_published column exists and updated!");
  }
}
run();
