import { getUser } from "@/lib/getUsers"
import { getHomeInsights } from "@/lib/insights"
import { generateAIInsight } from "@/lib/aiInsights"

export default async function HomePage() {
  const user = await getUser()
  if (!user) return <p>Please log in</p>

  const analytics = await getHomeInsights(user.id)
  const aiInsight = await generateAIInsight(analytics)

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome back 👋
      </h1>

      {/* AI Insight */}
      <section className="rounded-xl border p-5 bg-white shadow-sm">
        <h2 className="font-medium mb-2">AI Business Insight</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {aiInsight}
        </p>
      </section>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Metric
          label="Outstanding Amount"
          value={`₦${analytics.outstandingAmount}`}
        />
        <Metric
          label="Overdue Invoices"
          value={analytics.overdueCount}
        />
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}
