"use server"

import { createSupabaseServerClient } from "@/lib/supabaseServer"
import { error } from "console"

export async function getInvoice (){
    const supabase = await createSupabaseServerClient()

    const{ data : invoices, error } = await supabase 
    .from("invoices")
    .select("id, client_name, client_email, total, created_at")
    .order("created_at", { ascending : false })
    
    if (error) throw error
    return invoices
}

export async function getInvoiceById(invoiceId : string) {
    const supabase = await createSupabaseServerClient()

    const { data: invoice, error } = await supabase 
    .from ("invoices")
    .select(`
        id,
        client_name,
        client_email,
        total,
        created_at
        invoice_items (
           id,
           description,
           quantity,
           price
        )
        `)
        .eq("id", invoiceId)
        .single()

        if (error) throw error
        return invoice
}

