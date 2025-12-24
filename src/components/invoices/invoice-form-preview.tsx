import { useInvoiceStore } from "@/store";
import { CleanTheme } from "./themes/clean-theme";
import { ModernTheme } from "./themes/modern-theme";
import { CreativeTheme } from "./themes/creative-theme";
import { MinimalistTheme } from "./themes/minimalist-theme";
import { ProfessionalTheme } from "./themes/professional-theme";
import { ElegantTheme } from "./themes/elegant-theme";
import { TechTheme } from "./themes/tech-theme";
import { BrutalistTheme } from "./themes/brutalist-theme";
import { ClassicTheme } from "./themes/classic-theme";
import { CompactTheme } from "./themes/compact-theme";
import { cn } from "@/lib/utils";

const InvoicePreview = () => {
  const invoice = useInvoiceStore();
  const theme = invoice.theme || "clean";

  const renderTheme = () => {
    switch (theme) {
      case "modern":
        return <ModernTheme invoice={invoice} />;
      case "creative":
        return <CreativeTheme invoice={invoice} />;
      case "minimalist":
        return <MinimalistTheme invoice={invoice} />;
      case "professional":
        return <ProfessionalTheme invoice={invoice} />;
      case "elegant":
        return <ElegantTheme invoice={invoice} />;
      case "tech":
        return <TechTheme invoice={invoice} />;
      case "brutalist":
        return <BrutalistTheme invoice={invoice} />;
      case "classic":
        return <ClassicTheme invoice={invoice} />;
      case "compact":
        return <CompactTheme invoice={invoice} />;
      case "clean":
      default:
        return <CleanTheme invoice={invoice} />;
    }
  };

  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] mx-auto",
        "shadow-xl overflow-hidden print:shadow-none print:w-full print:min-h-0",
        "bg-white dark:bg-neutral-900",
        "transition-all duration-300 ease-in-out"
      )}
    >
      {renderTheme()}
    </div>
  );
};

export default InvoicePreview;
