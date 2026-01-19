"use server"

import { createSupabaseServerClient } from "@/lib/supabaseServer"

type InvoiceItem = {
  description: string
  quantity: number
  price: number
}

export async function saveInvoice(
  clientName: string,
  clientEmail: string,
  items: InvoiceItem[]
) {
  // 1️⃣ Create server Supabase client
  const supabase = await createSupabaseServerClient()

  // 2️⃣ Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // 3️⃣ Calculate total correctly
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )

  // 4️⃣ Insert invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      client_name: clientName,
      client_email: clientEmail,
      total,
      user_id: user.id,
    })
    .select()
    .single()

  if (invoiceError) throw invoiceError

  // 5️⃣ Insert invoice items
  const itemsData = items.map((item) => ({
    invoice_id: invoice.id,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase
    .from("invoice_items")
    .insert(itemsData)

  if (itemsError) throw itemsError

  return invoice.id
}
