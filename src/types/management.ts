export interface DocumentMetadata {
  id: string | number;
  name: string;
  type: string;
  status: string;
  lastModified: string;
  size?: string;
  tags?: string[];
}

export interface FormMetadata {
  id: string | number;
  title: string;
  responses: number;
  views: number;
  conversion: string;
  status: string;
}

export interface InvoiceMetadata {
  id: string | number;
  number: string;
  client: string;
  amount: number | string;
  status: string;
  dueDate: string;
  issueDate: string;
  description: string;
}

export interface RecentActivityMetadata {
  id: string | number;
  name: string;
  type: string;
  status: string;
  lastModified: string;
  bgColor: string;
  iconColor: string;
}

export interface OverviewStat {
  title: string;
  value: string;
  change: string;
}

export interface CodeSnippetMetadata {
  id: string | number;
  title: string;
  language: string;
  createdAt: string;
  code: string;
}

export interface WhiteboardMetadata {
  id: string | number;
  title: string;
  lastModified: string;
}

export interface ManagementState {
  documents: DocumentMetadata[];
  forms: FormMetadata[];
  invoices: InvoiceMetadata[];
  recentActivities: RecentActivityMetadata[];
  overviewStats: OverviewStat[];
  codeSnippets: CodeSnippetMetadata[];
  whiteboards: WhiteboardMetadata[];
  isLoading: boolean;

  // Actions
  setDocuments: (docs: DocumentMetadata[]) => void;
  setForms: (forms: FormMetadata[]) => void;
  setInvoices: (invoices: InvoiceMetadata[]) => void;
  setRecentActivities: (activities: RecentActivityMetadata[]) => void;
  setOverviewStats: (stats: OverviewStat[]) => void;
  setCodeSnippets: (snippets: CodeSnippetMetadata[]) => void;
  setWhiteboards: (whiteboards: WhiteboardMetadata[]) => void;
  setLoading: (loading: boolean) => void;

  // Example Fetch (Mock for now, but centralizing it makes it easy to replace)
  fetchData: () => Promise<void>;
}
