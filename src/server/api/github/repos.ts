import { createGitHubClient } from "@/server/utils";

export async function getRepos() {
  const { github } = await createGitHubClient();
  console.log("FETCHING", github);
  const { data } = await github.repos.listForAuthenticatedUser({
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
