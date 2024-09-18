import { createGitHubClient } from "@/server/utils";

export async function getRepos() {
  const { github, session } = await createGitHubClient();
  const { data } = await github.repos.listForUser({
    username: session.user.username,
    per_page: 5,
  });

  return data;
}

export async function getRepo({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const { github } = await createGitHubClient();
  const { data } = await github.repos.get({
    owner,
    repo,
  });

  return data;
}
