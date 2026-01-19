"use client"

import { useEffect, useState } from "react"
import { getInvoiceById } from "@/app/invoiceaction/getInvoice"
import { useParams } from "next/navigation"

type InvoiceItem = {
  id: string
  description: string
  quantity: number
  price: number
}

type Invoice = {
  id: string
  client_name: string
  client_email: string
  total: number
  created_at: string
  invoice_items: InvoiceItem[]
}

export default function SingleInvoicePage() {
  const { invoiceId } = useParams()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!invoiceId) return
    const id = Array.isArray(invoiceId) ? invoiceId[0] : invoiceId
    getInvoiceById(id)
      .then((data) => {
        if (data && typeof data === 'object' && 'id' in data && 'client_name' in data && 'invoice_items' in data) {
          setInvoice(data as Invoice)
        } else {
          setInvoice(null)
        }
      })
      .catch(() => setInvoice(null))
      .finally(() => setLoading(false))
  }, [invoiceId])

  if (loading) return <p>Loading invoice...</p>
  if (!invoice) return <p>Invoice not found.</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Invoice: {invoice.client_name}
      </h1>
      <p>Email: {invoice.client_email}</p>
      <p>Date: {new Date(invoice.created_at).toLocaleDateString()}</p>
      <p className="font-bold my-3">
        Total: ₦{invoice.total.toLocaleString()}
      </p>

      <h2 className="text-lg font-semibold mt-4 mb-2">Items</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="border">
            <th className="border px-2 py-1 text-left">Description</th>
            <th className="border px-2 py-1 text-right">Quantity</th>
            <th className="border px-2 py-1 text-right">Price</th>
            <th className="border px-2 py-1 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoice.invoice_items.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.description}</td>
              <td className="border px-2 py-1 text-right">{item.quantity}</td>
              <td className="border px-2 py-1 text-right">{item.price}</td>
              <td className="border px-2 py-1 text-right">
                {item.quantity * item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
