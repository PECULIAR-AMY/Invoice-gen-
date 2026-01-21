"use client"

import Link from "next/link"

type Props = {
  outstandingAmount: number
  unpaidCount: number
  overdueCount: number
  revenueChange: number
  topClient: { name: string; amount: number } | null
}

export default function HomeInsightsClient({
  outstandingAmount,
  unpaidCount,
  overdueCount,
  revenueChange,
  topClient,
}: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Today at a glance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Outstanding */}
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Outstanding invoices</p>
          <p className="text-2xl font-bold mt-2">
            ₦{outstandingAmount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            {unpaidCount} unpaid invoices
          </p>
          <Link
            href="/invoices?status=pending"
            className="text-blue-600 text-sm mt-3 inline-block"
          >
            Send reminders →
          </Link>
        </div>

        {/* Revenue change */}
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Revenue trend</p>
          <p
            className={`text-2xl font-bold mt-2 ${
              revenueChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {revenueChange >= 0 ? "+" : ""}
            {revenueChange}%
          </p>
          <p className="text-sm text-gray-500">Compared to last month</p>
        </div>

        {/* Overdue */}
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Overdue invoices</p>
          <p className="text-2xl font-bold mt-2">{overdueCount}</p>
          <Link
            href="/invoices?filter=overdue"
            className="text-red-600 text-sm mt-3 inline-block"
          >
            Follow up now →
          </Link>
        </div>

        {/* Top client */}
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Top client this month</p>
          {topClient ? (
            <>
              <p className="text-xl font-bold mt-2">{topClient.name}</p>
              <p className="text-sm text-gray-500">
                ₦{topClient.amount.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              No payments yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
