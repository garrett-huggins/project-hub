import { getSession } from "@/server/session";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-center text-h1">Profile</h1>
      <p className="text-center">{session.user.username}</p>
    </main>
  );
}
