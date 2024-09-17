import Link from "next/link";
import { getSession } from "@/server/session";
import { AuthButton } from "./auth-button";
import { ThemeToggle } from "./toggle-theme";

export async function Header() {
  const session = await getSession();
  return (
    <div className="border-b border-secondary bg-background dark:bg-[#151515]">
      <header className="container mx-auto flex items-center justify-between px-2 py-4">
        <Link href="/" className="text-2xl font-bold">
          Project Hub
        </Link>
        <nav className="flex gap-4">
          <AuthButton session={session} />
          <ThemeToggle />
        </nav>
      </header>
    </div>
  );
}
