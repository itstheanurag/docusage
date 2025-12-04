"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Receipt,
  Eye,
  Edit,
  Download,
  Send,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InvoiceGenerator from "../invoices/generator";

export function InvoicesManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  if (showGenerator) {
    return <InvoiceGenerator onBack={() => setShowGenerator(false)} />;
  }

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

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Sent":
        return "secondary";
      case "Pending":
        return "outline";
      case "Overdue":
        return "destructive";
      case "Draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const paidAmount = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending" || inv.status === "Sent")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage your invoices and track payments
          </p>
        </div>
        <Button onClick={() => setShowGenerator(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                From {invoices.length} invoices
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${paidAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((paidAmount / totalAmount) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Amount
              </CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-6 border-b last:border-b-0 hover:bg-muted/50 transition-colors gap-4"
                >
                  {/* Left Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Receipt className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{invoice.id}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center truncate">
                          <User className="mr-1 h-3 w-3 shrink-0" />
                          {invoice.client}
                        </span>
                        <span className="flex items-center truncate">
                          <Calendar className="mr-1 h-3 w-3 shrink-0" />
                          Due {invoice.dueDate}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {invoice.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4 lg:mt-0 shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-1 mt-2 sm:mt-0">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      {invoice.status === "Draft" && (
                        <Button variant="ghost" size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
