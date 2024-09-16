import { Session } from "@/server/session";
import { Button } from "../ui/button";
import { UserAvater } from "./user-avatar";

export function AuthButton({ session }: { session: Session | undefined }) {
  if (session) {
    return <UserAvater session={session} />;
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
