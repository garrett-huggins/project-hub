import Link from "next/link";
import { getSession } from "@/server/session";
import { AuthButton } from "./auth-button";

export async function Header() {
  const session = await getSession();
  return (
    <div className="mb-4 border-b border-secondary bg-background dark:bg-[#151515]">
      <header className="container mx-auto flex items-center justify-between px-2 py-2">
        <Link href="/" className="text-2xl font-bold">
          Project Hub
        </Link>

        <AuthButton session={session} />
      </header>
    </div>
  );
}
