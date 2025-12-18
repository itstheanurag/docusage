"use client";

import { useState, useMemo, useEffect } from "react";
import InvoiceStats from "./invoice/invoice-stats";
import InvoiceFilters from "./invoice/invoice-filter";
import InvoiceList from "./invoice/invoice-list";
import InvoiceHeader from "./invoice/invoice-header";
import { useManagementStore } from "@/store/managementStore";

export function InvoicesManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const { invoices, fetchData } = useManagementStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (inv) =>
        inv.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, invoices]);

  return (
    <div className="space-y-6">
      <InvoiceHeader />
      <InvoiceStats invoices={invoices} />
      <InvoiceFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <InvoiceList invoices={filteredInvoices} />
    </div>
  );
}
