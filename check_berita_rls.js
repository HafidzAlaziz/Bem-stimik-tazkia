const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const { data, error } = await supabase.rpc('get_policies', { table_name: 'berita' }).catch(() => ({}));
  if (error || !data) {
    // let's just query pg_policies directly
    const { data: policies, error: pErr } = await supabase.from('pg_policies').select('*').eq('tablename', 'berita').catch((e)=>({error:e}));
    console.log("Policies:", policies || pErr);
  } else {
    console.log("Policies:", data);
  }
}
main();
