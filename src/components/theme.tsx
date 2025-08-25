import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "next-themes";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster/>
      {children}
    </ThemeProvider>
  );
}
