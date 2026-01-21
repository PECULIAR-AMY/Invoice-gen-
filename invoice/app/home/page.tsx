import { getHomeInsights } from "@/lib/insights"
import HomeInsightsClient from "./HomeInsightsClient"

export default async function HomePage() {
  const insights = await getHomeInsights()
  return <HomeInsightsClient {...insights} />
}
