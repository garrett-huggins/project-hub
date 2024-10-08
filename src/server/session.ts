import { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "./jwt";
import { redirect } from "next/navigation";
import { db } from "./db";

export interface Session {
  user: {
    id: number;
    username: string;
    name?: string;
    image: string;
  };
  access_token: string;
  refresh_token: string;
  [key: string]: unknown; // Needed for JWTPayload type compatibility
}

interface CallbackPayload {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

interface GithubAuthError {
  error: string;
  error_description: string;
  error_uri: string;
}

export async function createSession(
  payload: CallbackPayload | GithubAuthError,
) {
  if ("error" in payload) {
    console.error("Error", payload);
    return;
  }

  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${payload.access_token}`,
      Accept: "application/json",
    },
  });
  const data = await res.json();
  const user = {
    id: data.id,
    username: data.login,
    name: data.name,
    image: data.avatar_url,
  };
  const session = await encrypt(
    {
      user,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
    },
    payload.expires_in,
  );
  cookies().set("session", session, {
    httpOnly: true,
  });
  // Create user if none exists
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    await db.user.create({
      data: {
        id: user.id,
      },
    });
  }
}

/**
 * Update the session if it is expired
 *
 * @param request NextRequest
 * @returns Session or void
 * @throws Error
 */
export async function updateSession(payload: JWTPayload) {
  if (!payload.refresh_token) {
    return;
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      refresh_token: payload.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error("Refresh Token Error: ", data.error_description);
  }
  const user = payload.user as { id: number; username: string; image: string };
  const session: Session = {
    user: {
      id: user.id,
      username: user.username,
      image: user.image,
    },
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };

  return await encrypt(session, data.expires_in);
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return;
  }
  return await decrypt(session);
}

export async function getAuthSession() {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth");
  }
  return session;
}
