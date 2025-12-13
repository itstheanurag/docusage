"use client";

import { Button } from "@/components/ui/button";
import { Plus, PenTool } from "lucide-react";
import Link from "next/link";

export default function WhiteboardListManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Whiteboards</h1>
          <p className="text-muted-foreground">
            Create visual diagrams, sketches, and notes
          </p>
        </div>
        <Link href="/whiteboard">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Whiteboard
          </Button>
        </Link>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-background/50 p-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <PenTool className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No whiteboards yet</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
          Create your first whiteboard to start sketching ideas, diagrams, and visual notes.
        </p>
        <Link href="/whiteboard">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Whiteboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
