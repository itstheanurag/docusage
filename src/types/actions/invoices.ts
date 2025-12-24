// Invoice types
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromLogo?: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  toLogo?: string;
  items: InvoiceItem[];
  notes: string;
  tax: number;
  taxLabel: string;
  currency: string;
  recurrence: "one-time" | "weekly" | "monthly" | "yearly";
  theme: string;
  accentColor: string;
  status: "draft" | "sent" | "paid" | "overdue";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInvoiceInput {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromLogo?: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  toLogo?: string;
  items: InvoiceItem[];
  notes?: string;
  tax?: number;
  taxLabel?: string;
  currency?: string;
  recurrence?: "one-time" | "weekly" | "monthly" | "yearly";
  theme?: string;
  accentColor?: string;
}

export type UpdateInvoiceInput = Partial<CreateInvoiceInput> & {
  status?: "draft" | "sent" | "paid" | "overdue";
};
