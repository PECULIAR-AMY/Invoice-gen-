import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function Post(req: Request) {
const supabase = createServerClient (
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
);

const { rows } = await req.json();

const { 
    data: { user }, 
} = await supabase.auth.getUser();

if (!user) {
    return new Response ("Unauthorized", { status: 401});
}

const total = rows.reduce(
    (sum: number, row: any) =>
        sum + row.quantity * row.amount,
    0
);

const invoiceNumber = `INV-${Date.now()}`;

const { data: invoice, error } = await supabase
.from("invoices")
.insert({
    user_id: user.id,
    invoice_number: invoiceNumber,
    total,
})
.select()
.single();

if (error) {
    return new Response(error.message, { status: 500});
}

const items = rows.map((row: any) => ({
    invoice_id: invoice.id,
    ...row,
}))

await supabase.from("invoice_items").insert(items):

return response.json(invoice);
}