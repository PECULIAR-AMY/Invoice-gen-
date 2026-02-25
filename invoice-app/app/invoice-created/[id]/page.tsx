"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function InvoiceCreatedPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { data: inv, error: invoiceError } = await supabase
        .from("invoices")
        .select("*, customer(*)")
        .eq("id", id)
        .single();

      if (invoiceError) return console.error(invoiceError);
      setInvoice(inv);

      const { data: invoiceItems, error: itemsError } = await supabase
        .from("invoice_items")
        .select("*")
        .eq("invoice_id", id);

      if (itemsError) return console.error(itemsError);
      setItems(invoiceItems || []);
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Invoice Created</h1>
      <p>Invoice #: {invoice.invoice_number}</p>
      <p>Customer: {invoice.customer.name}</p>
      <p>Phone: {invoice.customer.phone}</p>
      <p>Total: ₦{invoice.total}</p>

      <h2 className="mt-4 font-semibold">Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.description} — {item.quantity} x {item.unit_price} — {item.remark}
          </li>
        ))}
      </ul>
    </div>
  );
}