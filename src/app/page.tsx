import { getSession } from "@/server/session";

export default async function Home() {
  const session = await getSession();
  return (
    <main className="container mx-auto">
      <h1 className="text-center text-h1">Project Hub</h1>
      {session ? (
        <p className="text-center text-lg">
          Welcome back, {session.user.username}
        </p>
      ) : (
        <p className="text-center text-lg">Sign in to get started</p>
      )}
    </main>
  );
}
