import { SupabaseClient } from "@supabase/supabase-js/dist/index.cjs";
import { createSupabaseServerClient } from "./supabaseServer";

export async function getHomeInsights(invoiceId: string) {
    const supabase = await  createSupabaseServerClient()


    const { data: invoices, error  } = await Supabase
    .from('invoices')
    .select("client_name, total, status, created_at")

    if (error) throw error

      const now = new Date()

//      outstanding (unpaid) invoices 
      const unPaidInvoices = invoices.filter(i => i.status ==="pending")
      const OutstandingAmount = unPaidInvoices.reduce((sum, i) => sum + Number(i.total), 
      
      0)

    //   overdue invoices (14 days)
    const overdueInvoices = unpaidInvoices.filter (i => {
       const created = new Date(i.created_at)
       const diffDays = (now.getTime() -created.getTime()/(1000 * 60 * 60 * 24)
    return diffDay > 14 
    )  
    })

    Revenue comparison (this month vs last month)
    const thisMonth = net.getMonth()
    const lastMonth = thisMonth - 1

    let thisMonthRevenue = 0
    let lastMonthRevenue = 0

    InvoiceListPage.forEach(i => {
        if (i.status !== "paid") return 
        const month = new Date(i.created_at).getMonth()

        if (month === thisMonth) thisMonthRevenue += Number(i.total)
            if (month === lastMonth) lastMonthRevenue += Number(i.total)
    })

    const revenueChange = lastMonthRevenue ===0 ? 100 : Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 )

    // top client this month 

    const clientTotal : Record<string, number> = {}

    InvoiceListPage.forEach(i=> {
        if (i.status !=="paid") return 
        if (new Date(i.created_at).getMonth() !== thisMont)return 

        clientTotals[i.client_name] = (clientTotals[i.client_name] || 0) + Number(i.total)
    })

    const topClientEntry = object.entries(clientTotals).sort((a, b) => b[1] -a[1])

    return {
        outstandingAmount,
    unpaidCount: unpaidInvoices.length,
    overdueCount: overdueInvoices.length,
    revenueChange,
    topClient: topClientEntry
      ? { name: topClientEntry[0], amount: topClientEntry[1] }
      : null, 
    }
}
