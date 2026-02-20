" use client "
import { useSearchParams, useRouter } from "next/navigation" 

type InvoiceRow = {
    customer : string,
    description: string,
    phone : string,
    quantity: number,
    amount: number,
    remark: string,
    note: string
};

export default function InvoiceCreatedPage () {
    const searchParams = useSearchParams();
    const router = useRouter();

    const dataParam = searchParams.get("data");

    if (!dataParam) {
        return <div className="p-8"> No invoice data found. </div>
        
    } 
}