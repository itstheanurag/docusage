"use client";

import { useState, useMemo } from "react";
import InvoiceStats from "./invoice/invoice-stats";
import InvoiceFilters from "./invoice/invoice-filter";
import InvoiceList from "./invoice/invoice-list";
import InvoiceHeader from "./invoice/invoice-header";

export function InvoicesManager() {
  const [searchQuery, setSearchQuery] = useState("");

  const invoices = [
    {
      id: "INV-2024-001",
      client: "ABC Corporation",
      amount: 2500.0,
      status: "Paid",
      dueDate: "2024-01-15",
      issueDate: "2024-01-01",
      description: "Web Development Services",
    },
    {
      id: "INV-2024-002",
      client: "XYZ Limited",
      amount: 1800.0,
      status: "Pending",
      dueDate: "2024-01-20",
      issueDate: "2024-01-05",
      description: "Consulting Services",
    },
    {
      id: "INV-2024-003",
      client: "Tech Solutions Inc",
      amount: 3200.0,
      status: "Overdue",
      dueDate: "2024-01-10",
      issueDate: "2023-12-25",
      description: "Software Development",
    },
    {
      id: "INV-2024-004",
      client: "Marketing Pro",
      amount: 1500.0,
      status: "Draft",
      dueDate: "2024-01-25",
      issueDate: "2024-01-10",
      description: "Design Services",
    },
    {
      id: "INV-2024-005",
      client: "Global Enterprises",
      amount: 4200.0,
      status: "Sent",
      dueDate: "2024-01-30",
      issueDate: "2024-01-12",
      description: "Project Management",
    },
  ];

  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (inv) =>
        inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
