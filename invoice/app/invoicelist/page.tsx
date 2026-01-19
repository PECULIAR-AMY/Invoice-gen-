"use client"

import { useState, useEffect } from "react"
import { getInvoice } from "@/app/invoiceaction/getInvoice"
import Link from 'next/link'

type Invoice = {
    id: string
    client_name: string
    client_email:string
    total: number
    created_at: string
}

 export default function InvoiceListPage(){
    const [invoice, setInvoice] = useState<Invoice[]>([])
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        getInvoice()
        .then((data: Invoice[]) => setInvoice(data))
        .finally(() => setLoading(false))
    }, [])

    if  (loading) return <p>Loading invoices...</p>
    if (InvoiceListPage.length === 0) return <p>No invoice found.</p>

    return (
         <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Invoices</h1>
      <ul className="space-y-3">
        {invoice.map((inv: Invoice) => (
          <li
            key={inv.id}
            className="border p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{inv.client_name}</p>
              <p className="text-sm">{inv.client_email}</p>
              <p className="text-sm">
                Total: ₦{inv.total.toLocaleString()}
              </p>
            </div>
            <Link
              href={`/invoices/${inv.id}`}
              className="text-blue-500"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
    )

 

}