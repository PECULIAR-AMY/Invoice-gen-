"use client"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// 1. You must define what an individual item looks like
type InvoiceItem = {
  description: string
  quantity: number
  price: number
}

// 2. You must define the Props interface so TypeScript knows what the component receives
type Props = {
  clientName: string
  clientEmail: string
  items: InvoiceItem[] // 
  total: number
  invoiceNumber?: string
}

export default function ExportInvoicePDF({
  clientName,
  clientEmail,
  items,
  total,
  invoiceNumber = "INV-001",
}: Props) { // This fixes the "Props" error
  const downloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("INVOICE", 14, 20)
    
    doc.setFontSize(10)
    doc.text(`Invoice #: ${invoiceNumber}`, 14, 30)
    doc.text(`Client: ${clientName}`, 14, 35)
    doc.text(`Email: ${clientEmail}`, 14, 40)

    autoTable(doc, {
      startY: 50,
      head: [['Description', 'Qty', 'Price', 'Total']],
      body: items.map((item: InvoiceItem) => [ // Explicitly typing 'item' here
        item.description,
        item.quantity,
        `NGN ${item.price}`,
        `NGN ${item.quantity * item.price}`
      ]),
      foot: [['', '', 'Grand Total', `NGN ${total}`]],
      theme: 'striped'
    })

    doc.save(`${invoiceNumber}.pdf`)
  }

  return (
    <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded">
      Download as PDF
    </button>
  )
}