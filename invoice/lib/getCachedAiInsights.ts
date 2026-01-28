import { createSupabaseServerClient } from "./supabaseServer"
import { generateAIInsight } from "./aiInsights"
import { getInvoiceAnalytics } from "./invoiceAnalytics"


export async function getCachedAIInsight(userId: string) {
const supabase = createSupabaseServerClient()
const today = new Date().toISOString().split("T")[0]


const { data: cached } = await supabase
.from("ai_insights")
.select("insight")
.eq("user_id", userId)
.eq("generated_for_date", today)
.single()


if (cached) return cached.insight


const analytics = await getInvoiceAnalytics(userId)
const insight = await generateAIInsight(analytics)


await supabase.from("ai_insights").insert({
user_id: userId,
insight,
generated_for_date: today,
})


return insight
}