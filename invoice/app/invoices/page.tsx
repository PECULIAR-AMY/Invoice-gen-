"use client"

import { useState } from "react"
import { saveInvoice } from "@/app/actions/invoiceAction"

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

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, price: 0 }])

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  const handleSubmit = async () => {
    try {
      await saveInvoice(clientName, clientEmail, items)
      alert("Invoice saved 🎉")

      setClientName("")
      setClientEmail("")
      setItems([{ description: "", quantity: 1, price: 0 }])
    } catch (error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message) 
  }
  throw new Error("Something went wrong")
}

  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      <input
        placeholder="Client Name"
        className="border p-2 w-full mb-3"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />

      <input
        placeholder="Client Email"
        className="border p-2 w-full mb-6"
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
      />

      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-3 gap-2 mb-3">
          <input
            placeholder="Description"
            className="border p-2"
            value={item.description}
            onChange={(e) =>
              updateItem(i, "description", e.target.value)
            }
          />
          <input
            type="number"
            className="border p-2"
            value={item.quantity}
            onChange={(e) =>
              updateItem(i, "quantity", Number(e.target.value))
            }
          />
          <input
            type="number"
            className="border p-2"
            value={item.price}
            onChange={(e) =>
              updateItem(i, "price", Number(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={addItem} className="text-blue-500 mb-4">
        + Add Item
      </button>

      <p className="font-bold mb-4">
        Total: ₦{total.toLocaleString()}
      </p>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2"
      >
        Create Invoice
      </button>
    </div>
  )
}
