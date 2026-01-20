"use client"

import jsPDF from "jspdf"

type InvoiceItem = {
  description: string
  quantity: number
  price: number
}

type Props = {
  clientName: string
  clientEmail: string
  items: InvoiceItem[]
  total: number
  invoiceNumber?: string
}

export default function ExportInvoicePDF({
  clientName,
  clientEmail,
  items,
  total,
  invoiceNumber = "INV-001",
}: Props) {
 const downloadPDF = () => {
    const doc = new jsPDF() 

// Title
doc.setFontSize(18)
doc.text("invoice", 14, 20)


// invoice title
 doc.setFontSize(12)
    doc.text(`Invoice #: ${invoiceNumber}`, 14, 30)
    doc.text(`Client: ${clientName}`, 14, 38)
    doc.text(`Email: ${clientEmail}`, 14, 46)


      // Table Header
    let y = 60
    doc.text("Description", 14, y)
    doc.text("Qty", 110, y)
    doc.text("Price", 130, y)
    doc.text("Total", 160, y)


      y += 6
    doc.line(14, y, 196, y)

    // Items
    items.forEach((item) => {
      y += 8
      doc.text(item.description, 14, y)
      doc.text(String(item.quantity), 110, y)
      doc.text(`₦${item.price}`, 130, y)
      doc.text(`₦${item.quantity * item.price}`, 160, y)
    })


    // Total
    y += 15
    doc.line(14, y, 196, y)
    y += 10
    doc.setFontSize(14)
    doc.text(`Grand Total: ₦${total}`, 140, y)

    // Download
    doc.save(`${invoiceNumber}.pdf`)
  }

  return (
    <button
      onClick={downloadPDF}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Download as PDF
    </button>
  )
}
