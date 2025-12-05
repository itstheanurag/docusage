"use client";

import InvoiceStatCard from "./invoice-stats-card";

const InvoiceStats = ({ invoices }: { invoices: any[] }) => {
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((s, inv) => s + inv.amount, 0);
  const pending = invoices
    .filter((inv) => inv.status === "Pending" || inv.status === "Sent")
    .reduce((s, inv) => s + inv.amount, 0);

  const stats = [
    {
      title: "Total Revenue",
      amount: total,
      iconColor: "text-green-600",
    },
    {
      title: "Paid Amount",
      amount: paid,
      iconColor: "text-blue-600",
      subtext: `${Math.round((paid / total) * 100)}% of total`,
    },
    {
      title: "Pending Amount",
      amount: pending,
      iconColor: "text-orange-600",
      subtext: "Awaiting payment",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <InvoiceStatCard key={s.title} stat={s} count={invoices.length} />
      ))}
    </div>
  );
};

export default InvoiceStats;
