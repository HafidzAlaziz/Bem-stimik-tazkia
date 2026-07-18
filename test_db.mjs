import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pmrowiyvuqnxgzmlbfzx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcm93aXl2dXFueGd6bWxiZnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1ODc5MjUsImV4cCI6MjA5OTE2MzkyNX0.biXbpbXH7WF5qkYtCMC-KBQfey5fQzusaKTQ875jrmQ";
const supabase = createClient(supabaseUrl, supabaseKey);
async function run() {
  const { data, error } = await supabase.from("agendas").select("id, title, image_url, gallery").eq("title", "Nyoba lagi");
  console.log(JSON.stringify(data, null, 2));
}
run();
