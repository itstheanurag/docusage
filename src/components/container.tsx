import { cn } from "@/lib/utils";
const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export default Container;
