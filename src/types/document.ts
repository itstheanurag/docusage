export interface FormatCommandEvent {
  command: string;
  value?: string | undefined;
}

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Variable {
  id: string;
  name: string;
  label: string;
  type: "text" | "number" | "date";
  defaultValue?: string;
}

export interface DataSet {
  id: string;
  name: string;
  data: Record<string, string>;
}

export interface DocumentState {
  title: string;
  content: string;
  isTemplate: boolean;
  variables: Variable[];
  dataSets: DataSet[];
  selectedDataSetId: string | null;
  history: string[];
  historyIndex: number;
  users: User[];
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIsTemplate: (isTemplate: boolean) => void;
  addVariable: (variable: Variable) => void;
  removeVariable: (variableId: string) => void;
  updateVariable: (variableId: string, updates: Partial<Variable>) => void;
  addDataSet: (dataSet: DataSet) => void;
  removeDataSet: (dataSetId: string) => void;
  updateDataSet: (dataSetId: string, updates: Partial<DataSet>) => void;
  setSelectedDataSet: (dataSetId: string | null) => void;
  undo: () => void;
  redo: () => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}
