import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { getSession } from "@/server/session";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (session) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
  }
  const state = randomBytes(16).toString("hex");
  cookies().set({
    name: "state",
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600, // 10 minutes validity
  });
  const github_url = new URL("https://github.com/login/oauth/authorize");
  github_url.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  github_url.searchParams.set("state", state);
  return NextResponse.redirect(github_url.toString(), {
    status: 302, // Explicitly set status to 302 for GET oauth redirect since NextResponse.redirect defaults to 307
  });
}
