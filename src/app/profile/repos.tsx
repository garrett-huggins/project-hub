import { getRepos } from "@/server/api/github/repos";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export async function Repos() {
  const repos = await getRepos();
  return repos.map((repo, idx) => (
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
            <a href={repo.html_url}>View</a>
          </Button>
        </CardFooter>
      </Card>
    </li>
  ));
}
