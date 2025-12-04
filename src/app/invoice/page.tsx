"use client";

import InvoiceFormGenerator from "@/components/invoices/invoice-form-generator";
import { useRouter } from "next/navigation";

export default function InvoicePage() {
  const router = useRouter();

  return <InvoiceFormGenerator onBack={() => router.back()} />;
}
