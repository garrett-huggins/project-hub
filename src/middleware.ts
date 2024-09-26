import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./server/session";
import { decrypt } from "./server/jwt";
import { JWTExpired } from "jose/errors";

export async function middleware(request: NextRequest) {
  // Check current session
  const session = request.cookies.get("session");
  if (session) {
    try {
      await decrypt(session.value);
      return NextResponse.next();
    } catch (error) {
      if (error instanceof JWTExpired && error.payload.refresh_token) {
        try {
          const refreshSession = await updateSession(error.payload);
          const res = NextResponse.next();
          if (refreshSession) {
            res.cookies.set("session", refreshSession, {
              httpOnly: true,
            });
          }
          return res;
        } catch (error) {
          const res = NextResponse.next();
          res.cookies.delete("session");
          return res;
        }
      } else {
        const res = NextResponse.next();
        res.cookies.delete("session");
        return res;
      }
    }
  }
  // No session
  return NextResponse.next();
}
