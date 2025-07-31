import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "./auth/LogoutButton";
import { JwtPayload } from "@/lib/auth/jwt";
import ThemeToggleButton from "./theme/button";
const Navbar = ({ user }: { user: JwtPayload | null }) => {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between backdrop-blur-md border font-sans shadow-md rounded-none">
      <div className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight cursor-pointer dark:hover:bg-neutral-900 px-3 py-1 rounded"
        >
          Docusage!
        </Link>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <ThemeToggleButton />
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/auth/login">
              <Button variant="default">Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
