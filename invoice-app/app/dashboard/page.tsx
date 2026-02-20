"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type InvoiceRow = {
  customer: string;
  description: string;
  quantity: number;
  amount: number;
  remark: string;
  note: string;
  phone: string;
};

export default function InvoiceFormPage() {
  const router = useRouter();

  const [rows, setRows] = useState<InvoiceRow[]>([
    {
      customer: "",
      description: "",
      quantity: 1,
      amount: 0,
      remark: "",
      note: "",
      phone: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        customer: "",
        description: "",
        quantity: 1,
        amount: 0,
        remark: "",
        note: "",
        phone: "",
      },
    ]);
  };

  const updateRow = (
    index: number,
    field: keyof InvoiceRow,
    value: string | number
  ) => {
    const updated = [...rows];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "quantity" || field === "amount"
          ? Number(value)
          : value,
    };
    setRows(updated);
  };

  const total = rows.reduce(
    (sum, row) => sum + row.quantity * row.amount,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can store this in Supabase here

    router.push("/invoice-created");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Customer Name/Company</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Description of Goods</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Remark</th>
                <th className="border p-2">Note</th>
                
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.customer}
                      onChange={(e) =>
                        updateRow(index, "customer", e.target.value)
                      }
                      className="w-full outline-none"
                      required
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        updateRow(index, "description", e.target.value)
                      }
                      className="w-full outline-none"
                      required
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="number"
                      min="1"
                      value={row.quantity}
                      onChange={(e) =>
                        updateRow(index, "quantity", e.target.value)
                      }
                      className="w-full outline-none"
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="number"
                      min="0"
                      value={row.amount}
                      onChange={(e) =>
                        updateRow(index, "amount", e.target.value)
                      }
                      className="w-full outline-none"
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) =>
                        updateRow(index, "remark", e.target.value)
                      }
                      className="w-full outline-none"
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.note}
                      onChange={(e) =>
                        updateRow(index, "note", e.target.value)
                      }
                      className="w-full outline-none"
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="tel"
                      value={row.phone}
                      onChange={(e) =>
                        updateRow(index, "phone", e.target.value)
                      }
                      className="w-full outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addRow}
          className="mt-4 text-blue-600"
        >
          + Add Row
        </button>

        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg font-semibold">
            Total: ₦{total.toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          className="mt-6 bg-black text-white px-6 py-2 rounded"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
}