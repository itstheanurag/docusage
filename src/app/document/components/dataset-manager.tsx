"use client";

import { useDocumentStore } from "@/store/documentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Users } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function DocumentDataSetManager() {
  const { variables, dataSets, addDataSet, removeDataSet, updateDataSet, selectedDataSetId, setSelectedDataSet } = useDocumentStore();

  const handleAddRow = () => {
    const newData: Record<string, string> = {};
    variables.forEach(v => {
      newData[v.name] = v.defaultValue || "";
    });

    const newSet = {
      id: uuidv4(),
      name: `User ${dataSets.length + 1}`,
      data: newData,
    };
    addDataSet(newSet);
    if (!selectedDataSetId) setSelectedDataSet(newSet.id);
  };

  const handleValueChange = (setId: string, varName: string, value: string) => {
    const set = dataSets.find(d => d.id === setId);
    if (set) {
      updateDataSet(setId, {
        data: { ...set.data, [varName]: value }
      });
    }
  };

  if (variables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
        <Users className="h-8 w-8 mb-2 opacity-20" />
        <p className="text-sm font-medium">No variables defined</p>
        <p className="text-xs">Add variables in the sidebar first to start entering data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Data Sets (Recipients)</h3>
        <Button size="sm" onClick={handleAddRow} className="h-8">
          <Plus className="h-4 w-4 mr-2" /> Add Recipient
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Name / ID</TableHead>
              {variables.map(v => (
                <TableHead key={v.id}>{v.label}</TableHead>
              ))}
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={variables.length + 2} className="text-center text-muted-foreground py-8">
                  No recipients added yet. Click "Add Recipient" to start.
                </TableCell>
              </TableRow>
            ) : (
              dataSets.map((set) => (
                <TableRow key={set.id} className={selectedDataSetId === set.id ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Input 
                      value={set.name} 
                      onChange={(e) => updateDataSet(set.id, { name: e.target.value })}
                      onFocus={() => setSelectedDataSet(set.id)}
                      className="h-8 text-xs font-medium"
                    />
                  </TableCell>
                  {variables.map(v => (
                    <TableCell key={v.id}>
                      <Input 
                        value={set.data[v.name] || ""} 
                        onChange={(e) => handleValueChange(set.id, v.name, e.target.value)}
                        onFocus={() => setSelectedDataSet(set.id)}
                        className="h-8 text-xs"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeDataSet(set.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
