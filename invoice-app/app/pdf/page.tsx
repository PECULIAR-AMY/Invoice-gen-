"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function DownloadInvoiceButton({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      setRetry(false);

      toast.loading("Preparing your invoice...", { id: "download" });

      const response = await fetch(`/api/invoice/${invoiceId}/pdf`);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      toast.success("Download will start automatically...", {
        id: "download",
      });

      window.location.href = `/api/invoice/${invoiceId}/pdf`;
    } catch (error) {
      toast.error("Network issue. Please try again.", {
        id: "download",
      });

      setRetry(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {loading ? (
        <div className="animate-pulse bg-gray-300 h-10 w-40 rounded"></div>
      ) : (
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Download Invoice
        </button>
      )}

      {retry && (
        <button
          onClick={handleDownload}
          className="ml-3 text-blue-600 underline"
        >
          Retry
        </button>
      )}
    </div>
  );
}