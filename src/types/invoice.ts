export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  items: InvoiceItem[];
  notes: string;
  tax: number;
}

export type InvoiceDataValue = string | number | InvoiceItem[];
export type InvoiceItemValue = string | number;

export interface InvoiceStore extends InvoiceData {
  updateField: (field: keyof InvoiceData, value: InvoiceDataValue) => void;
  addItem: () => void;
  updateItem: (
    id: string,
    field: keyof InvoiceItem,
    value: InvoiceItemValue,
  ) => void;
  removeItem: (id: string) => void;
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
}
