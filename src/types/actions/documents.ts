// Document action types
export interface Document {
  id: string;
  title: string;
  content: string;
  userId: string;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentInput {
  title: string;
  content: string;
  isTemplate?: boolean;
}

export interface UpdateDocumentInput {
  title?: string;
  content?: string;
  isTemplate?: boolean;
}

// Template Variable types
export interface TemplateVariable {
  id: string;
  documentId: string;
  name: string;
  label: string;
  type: string;
  defaultValue: string | null;
  createdAt: Date;
}

export interface CreateVariableInput {
  documentId: string;
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
}

export interface UpdateVariableInput {
  name?: string;
  label?: string;
  type?: string;
  defaultValue?: string | null;
}

// Data Set types
export interface DataSet {
  id: string;
  documentId: string;
  name: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDataSetInput {
  documentId: string;
  name: string;
  data: Record<string, unknown>;
}

export interface UpdateDataSetInput {
  name?: string;
  data?: Record<string, unknown>;
}
