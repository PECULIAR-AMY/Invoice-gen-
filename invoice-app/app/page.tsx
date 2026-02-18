import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md w-full">
        
        <h1 className="text-3xl font-bold mb-4">
          Smart Invoice
        </h1>

        <p className="text-gray-600 mb-8">
          Create, manage and track your invoices effortlessly.
        </p>

        <div className="flex flex-col gap-10 ">
          <Link
            href="/login"
            className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border border-black py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </main>
  )
}
