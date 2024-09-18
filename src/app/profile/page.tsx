import { getAuthSession } from "@/server/session";
// import { Repos } from "./repos";
import { PublishedProjects } from "./published-repos";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  const session = await getAuthSession();

  return (
    <main className="container mx-auto space-y-2">
      <div className="leading-9">
        <p className="text-center text-h2">Garrett</p>
        <p className="text-center text-2xl hover:underline">
          <a href={`https://github.com/${session.user.username}`}>
            @{session.user.username}
          </a>
        </p>
      </div>

      <h2 className="text-center text-2xl">Projects</h2>
      <ul className="space-y-2">
        <PublishedProjects />
      </ul>
    </main>
  );
}
