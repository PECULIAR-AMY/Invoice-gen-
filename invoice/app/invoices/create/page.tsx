"use client"

import { useState, FormEvent } from "react"
import { supabase } from "@/lib/supabaseClient"

type InvoiceItem = {
  description: string
  quantity: number
  price: number
}

export default function CreateInvoicePage() {
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, price: 0 },
  ])

  // ✅ Auto-calculate total
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }])
  }

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setItems(updatedItems)
  }

  // ✅ SUBMIT HANDLER (ALL DATABASE LOGIC LIVES HERE)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // 1️⃣ Create invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert([
        {
          client_name: clientName,
          client_email: clientEmail,
          total,
        },
      ])
      .select()
      .single()

    if (invoiceError || !invoice) {
      console.error(invoiceError)
      alert("Failed to create invoice")
      return
    }

    // 2️⃣ Create invoice items
    const itemsData = items.map((item) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(itemsData)

    if (itemsError) {
      console.error(itemsError)
      alert("Invoice created, but items failed")
      return
    }

    // 3️⃣ Success
    alert("Invoice saved successfully 🎉")

    // Reset form
    setClientName("")
    setClientEmail("")
    setItems([{ description: "", quantity: 1, price: 0 }])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Client Name"
            className="border p-2 w-full"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Client Email"
            className="border p-2 w-full"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>

        {/* Invoice Items */}
        <div>
          <h2 className="font-semibold mb-2">Invoice Items</h2>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Description"
                  className="border p-2 md:col-span-2"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                  required
                />

                <input
                  type="number"
                  className="border p-2"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", Number(e.target.value))
                  }
                  required
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="border p-2"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", Number(e.target.value))
                  }
                  required
                />

                <button
                  type="button"
                  onClick={addItem}
                  className="text-blue-500"
                >
                  + Add Item
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-right mt-4">
            <p className="text-lg font-bold">
              Total: ₦{total.toLocaleString()}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 mt-4"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  )
}
