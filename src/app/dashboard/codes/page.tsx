import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Code2 } from "lucide-react";
import Link from "next/link";

export default function CodesDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Snippets</h1>
          <p className="text-muted-foreground mt-2">
            Manage and share your code snippets.
          </p>
        </div>
        <Link href="/code/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Snippet
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Algorithm Practice {i}
                </CardTitle>
                <Code2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>JavaScript • Created 2 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground line-clamp-3 font-mono bg-muted/50 p-3 rounded-md border text-xs">
                function bubbleSort(arr) {"{"}
                // implementation here return arr.sort();
                {"}"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
