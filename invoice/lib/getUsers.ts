import { createSupabaseServerClient } from "./supabaseServer"

export async function getUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Error fetching User:", error.message)
  }
  return user
}
