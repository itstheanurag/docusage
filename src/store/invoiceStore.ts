import { InvoiceStore, InvoiceItem } from "@/types/invoice";

import { create } from "zustand";
export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoiceNumber: "INV-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromLogo: "",
  toName: "",
  toEmail: "",
  toAddress: "",
  toLogo: "",
  items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
  notes: "",
  tax: 0,
  taxLabel: "Tax",
  currency: "USD",
  recurrence: "one-time",
  isPreviewMode: false,
  theme: "clean",
  accentColor: "#000000",

  updateField: (field, value) => set({ [field]: value }),

  addItem: () => {
    const { items } = get();
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    set({ items: [...items, newItem] });
  },

  updateItem: (id, field, value) => {
    const { items } = get();
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    });
    set({ items: updatedItems });
  },

  removeItem: (id) => {
    const { items } = get();
    set({ items: items.filter((item) => item.id !== id) });
  },

  calculateSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.amount, 0);
  },

  calculateTax: () => {
    const { tax } = get();
    return (get().calculateSubtotal() * tax) / 100;
  },

  calculateTotal: () => {
    return get().calculateSubtotal() + get().calculateTax();
  },
  togglePreview: () =>
    set((state) => ({ isPreviewMode: !state.isPreviewMode })),
}));
