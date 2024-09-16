import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  cookies().delete("session");
  return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
}
