import { cn } from "@/lib/utils";

const SectionHeader = ({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => (
  <div
    className={cn("px-4 md:px-0 max-w-2xl leading-tighter mx-auto text-center", className)}
  >
    <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      {title}
    </h2>

    {subtitle && (
      <p className="text-md text-neutral-500 dark:text-neutral-400 leading-relaxed font-light transition-colors duration-300">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
