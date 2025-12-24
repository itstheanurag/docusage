import {
  DocumentMetadata,
  FormMetadata,
  InvoiceMetadata,
  RecentActivityMetadata,
  OverviewStat,
  CodeSnippetMetadata,
} from "@/types/management";

export const MOCK_DOCUMENTS: DocumentMetadata[] = [
  {
    id: 1,
    name: "Project Proposal - ABC Corp",
    type: "Proposal",
    status: "Draft",
    lastModified: "2024-01-15",
    size: "2.4 MB",
    tags: ["Business", "Proposal"],
  },
  {
    id: 2,
    name: "Marketing Strategy 2024",
    type: "Report",
    status: "Completed",
    lastModified: "2024-01-14",
    size: "1.8 MB",
    tags: ["Marketing", "Strategy"],
  },
];

export const MOCK_FORMS: FormMetadata[] = [
  {
    id: 1,
    title: "Customer Feedback",
    responses: 24,
    views: 128,
    conversion: "18%",
    status: "Active",
  },
  {
    id: 2,
    title: "Event Registration",
    responses: 45,
    views: 312,
    conversion: "14%",
    status: "Draft",
  },
];

export const MOCK_INVOICES: InvoiceMetadata[] = [
  {
    id: "INV-2024-001",
    number: "INV-2024-001",
    client: "ABC Corporation",
    amount: 2500.0,
    status: "Paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    description: "Web Development Services",
  },
  {
    id: "INV-2024-002",
    number: "INV-2024-002",
    client: "XYZ Limited",
    amount: 1800.0,
    status: "Pending",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    description: "Consulting Services",
  },
];

export const MOCK_RECENT_ACTIVITIES: RecentActivityMetadata[] = [
  {
    id: 1,
    name: "Project Proposal - ABC Corp",
    type: "Proposal",
    status: "Draft",
    lastModified: "2 hours ago",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Invoice #INV-2024-001",
    type: "Invoice",
    status: "Sent",
    lastModified: "1 day ago",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    name: "Contract Agreement - XYZ Ltd",
    type: "Contract",
    status: "Completed",
    lastModified: "3 days ago",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    name: "Marketing Report Q1",
    type: "Report",
    status: "Review",
    lastModified: "1 week ago",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600",
  },
];

export const MOCK_OVERVIEW_STATS: OverviewStat[] = [
  {
    title: "Total Documents",
    value: "24",
    change: "+12%",
  },
  {
    title: "Invoices Created",
    value: "18",
    change: "+8%",
  },
  {
    title: "Revenue Generated",
    value: "$12,450",
    change: "+23%",
  },
  {
    title: "Active Clients",
    value: "32",
    change: "+5%",
  },
];

export const MOCK_CODE_SNIPPETS: CodeSnippetMetadata[] = [
  {
    id: 1,
    title: "Algorithm Practice",
    language: "JavaScript",
    createdAt: "2 days ago",
    code: "function bubbleSort(arr) {\n  // implementation here\n  return arr.sort();\n}",
  },
];
