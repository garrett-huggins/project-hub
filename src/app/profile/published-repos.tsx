import { getAuthSession } from "@/server/session";
import { db } from "@/server/db";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export async function PublishedProjects() {
  const session = await getAuthSession();
  const publishedRepos = await db.repo.findMany({
    where: {
      userId: session.user.id,
    },
  });

  if (!publishedRepos.length) {
    return (
      <li>
        <Card className="bg-muted">
          <CardHeader>
            <h2 className="text-lg font-bold">No Projects</h2>
          </CardHeader>
          <CardContent>
            <p>You haven&apos;t published any projects yet.</p>
          </CardContent>
        </Card>
      </li>
    );
  }

  return publishedRepos.map((repo, idx) => (
    <li key={idx}>
      <Card className="bg-muted">
        <CardHeader>
          <h2 className="text-lg font-bold">{repo.name}</h2>
        </CardHeader>
        <CardContent>
          <p>{repo.description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <a href={repo.url}>View</a>
          </Button>
        </CardFooter>
      </Card>
    </li>
  ));
}
