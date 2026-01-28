import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { getCachedAIInsight } from "@/lib/getCachedAIInsight"
import { sendAIInsightEmail } from "@/lib/email/sendAIInsightEmail"


export async function GET() {
const supabase = createSupabaseServerClient()


const { data: users } = await supabase
.from("profiles")
.select("id, email")


for (const user of users ?? []) {
const insight = await getCachedAIInsight(user.id)
await sendAIInsightEmail(user.email, insight)
}


return Response.json({ success: true })
}