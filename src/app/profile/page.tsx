import { getAuthSession } from "@/server/session";
import { Repos } from "./repos";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  const session = await getAuthSession();

  return (
    <main className="container mx-auto space-y-2">
      <h1 className="text-center text-h1">Profile</h1>
      <p className="text-center text-2xl hover:underline">
        <a href={`https://github.com/${session.user.username}`}>
          @{session.user.username}
        </a>
      </p>

      <form
        action={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`}
        method="POST"
        className="text-center"
      >
        <Button type="submit" className="text-center" variant="destructive">
          Sign Out
        </Button>
      </form>

      <ul className="space-y-2">
        <Repos />
      </ul>
    </main>
  );
}
