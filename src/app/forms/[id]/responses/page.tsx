"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FormResponsesPage() {
  // Mock data
  const responses = [
    {
      id: 1,
      email: "alice@example.com",
      submittedAt: "2023-10-27 10:30 AM",
      data: { q1: "Alice", q2: "Great service!" },
    },
    {
      id: 2,
      email: "bob@example.com",
      submittedAt: "2023-10-27 11:15 AM",
      data: { q1: "Bob", q2: "Could be better." },
    },
    {
      id: 3,
      email: "charlie@example.com",
      submittedAt: "2023-10-27 01:45 PM",
      data: { q1: "Charlie", q2: "Awesome!" },
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/forms"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              Customer Feedback - Responses
            </h1>
            <p className="text-muted-foreground">3 responses collected</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submitted At</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name (Q1)</TableHead>
                <TableHead>Feedback (Q2)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.submittedAt}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.data.q1}</TableCell>
                  <TableCell>{r.data.q2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
