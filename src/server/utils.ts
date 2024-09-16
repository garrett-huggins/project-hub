import { Octokit } from "@octokit/rest";
import { getAuthSession } from "@/server/session";

export async function createGitHubClient() {
  const session = await getAuthSession();

  return {
    github: new Octokit({
      auth: session.access_token,
    }),
    session,
  };
}
