import { createClient } from "./server"

export default async function() {
  const supabase = await createClient();
  const { data: table_name } = await supabase.from("table_name").select();
  return <pre>{JSON.stringify(table_name, null, 2)}</pre>
}