import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-24">
      {/* Dotted Background */}
      <div
        className="absolute inset-0 -z-10 text-neutral-300 dark:text-neutral-800"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.9,
        }}
      />

      {/* Content */}
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Simplify Forms, Documents & Invoices
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Docusage helps you create, share, and track smart forms and
          professional invoices — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Button>Get Started</Button>

          <Button variant="outline" className="bg-white dark:bg-neutral-900">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
