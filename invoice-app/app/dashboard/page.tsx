"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type InvoiceRow = {
  description: string;
  quantity: number;
  unit_price: number;
  remark: string;
};

export default function InvoiceFormPage() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [rows, setRows] = useState<InvoiceRow[]>([
    { description: "", quantity: 1, unit_price: 0, remark: "" },
  ]);

  // Add a new line item
  const addRow = () =>
    setRows([
      ...rows,
      { description: "", quantity: 1, unit_price: 0, remark: "" },
    ]);

  // Remove a line item
  const removeRow = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  // Update a specific field of a line item
  const updateRow = (
    index: number,
    field: keyof InvoiceRow,
    value: string | number
  ) => {
    const updated = [...rows];
    updated[index] = {
      ...updated[index],
      [field]: field === "quantity" || field === "unit_price" ? Number(value) : value,
    };
    setRows(updated);
  };

  // Calculate grand total
  const total = rows.reduce((sum, row) => sum + row.quantity * row.unit_price, 0);

  // Submit invoice to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return alert("Please log in to create invoice.");

    try {
      // 1️⃣ Insert or get customer
      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .upsert(
          { name: customerName, phone, user_id: user.id },
          { onConflict: "user_id,name" }
        )
        .select("*")
        .single();

      if (customerError) throw customerError;

      // 2️⃣ Insert invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert([
          {
            user_id: user.id,
            customer_id: customer.id,
            invoice_number: `INV-${Date.now()}`,
            total,
          },
        ])
        .select("*")
        .single();

      if (invoiceError) throw invoiceError;

      // 3️⃣ Insert invoice items
      const itemsToInsert = rows.map(row => ({
        invoice_id: invoice.id,
        user_id: user.id,
        description: row.description,
        quantity: row.quantity,
        unit_price: row.unit_price,
        amount: row.quantity * row.unit_price,
        remark: row.remark,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      // 4️⃣ Redirect to invoice created page
      router.push(`/invoice-created/${invoice.id}`);
    } catch (err) {
      console.error(err);
      alert("Error creating invoice. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      {/* Customer Info */}
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        required
        className="mb-4 p-2 border w-full"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="mb-4 p-2 border w-full"
      />

      {/* Invoice Table */}
      <table className="min-w-full border mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">No</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Remark</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const amount = row.quantity * row.unit_price;
            return (
              <tr key={i}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">
                  <input
                    value={row.description}
                    onChange={e => updateRow(i, "description", e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    min="1"
                    value={row.quantity}
                    onChange={e => updateRow(i, "quantity", e.target.value)}
                    className="w-full outline-none"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    min="0"
                    value={row.unit_price}
                    onChange={e => updateRow(i, "unit_price", e.target.value)}
                    className="w-full outline-none"
                  />
                </td>
                <td className="border p-2 font-semibold">₦{amount.toFixed(2)}</td>
                <td className="border p-2">
                  <input
                    value={row.remark}
                    onChange={e => updateRow(i, "remark", e.target.value)}
                    className="w-full outline-none"
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addRow}
        className="text-blue-600 mb-4"
      >
        + Add Row
      </button>

      {/* Grand Total */}
      <p className="text-right font-semibold mb-4">Grand Total: ₦{total.toFixed(2)}</p>

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded"
      >
        Create Invoice
      </button>
    </form>
  );
}