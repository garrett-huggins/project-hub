import { Session } from "@/server/session";
import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, LogOut } from "lucide-react";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "./toggle-theme";

export function AuthButton({ session }: { session: Session | undefined }) {
  if (session) {
    return (
      <Sheet>
        <SheetTrigger>
          <UserAvater session={session} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center space-x-2">
              <UserAvater session={session} />
              <div className="leading-5">
                <p className="text-p">{session.user.username}</p>
                <p className="text-sub text-muted-foreground">garrett</p>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex w-full justify-center">
            <ThemeToggle />
          </div>
          <Separator className="mt-2" />

          <nav className="py-2">
            <ul>
              <a href="/profile">
                <li className="flex items-center space-x-2 rounded-sm hover:cursor-pointer hover:bg-muted">
                  <User className="text-muted-foreground" size={20} />
                  <span>Profile</span>
                </li>
              </a>
            </ul>
          </nav>

          <Separator className="mb-2" />
          <form
            action={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`}
            method="POST"
          >
            <button className="flex w-full items-center space-x-2 rounded-sm text-left hover:cursor-pointer hover:bg-muted">
              <LogOut className="text-muted-foreground" size={20} />
              <span>Sign Out</span>
            </button>
          </form>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <form
      action={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`}
      method="POST"
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}

const UserAvater = ({ session }: { session: Session }) => {
  return (
    <Avatar>
      <Image
        src={session.user.image}
        alt={`@${session.user.username}`}
        width={40}
        height={40}
        className="rounded-full"
      />
      <AvatarFallback>{session.user.username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
