import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type Analytics = {
  outstandingAmount: number
  overdueCount: number
  totalInvoices: number
  bestClient: string | null
}

export async function generateAIInsight(data: Analytics) {
  const prompt = `
You are a SaaS financial analyst.

Invoice analytics:
- Outstanding amount: ₦${data.outstandingAmount}
- Overdue invoices: ${data.overdueCount}
- Total invoices: ${data.totalInvoices}
- Best paying client: ${data.bestClient ?? "None"}

Generate:
1. One clear business insight (max 2 sentences)
2. One recommended action

Do NOT use emojis.
Be direct and professional.
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  })

  return completion.choices[0].message.content
}
