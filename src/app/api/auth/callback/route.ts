import { NextResponse, type NextRequest } from "next/server";
import { createSession } from "@/server/session";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code || !state) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
  }

  const stateCookie = cookies().get("state");
  if (!stateCookie || stateCookie.value !== state) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
  }
  cookies().delete("state");
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const data = await response.json();
  await createSession(data);
  return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
}
