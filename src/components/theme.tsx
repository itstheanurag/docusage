import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbars/navbar";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
