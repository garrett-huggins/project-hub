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
      const payload = (error as JWTExpired).payload;
      console.log("Session expired", payload);
      if (payload.refresh_token) {
        try {
          console.log("Refreshing session");
          const refreshSession = await updateSession(payload);
          console.log("Session refreshed", refreshSession);
          const res = NextResponse.next();
          if (refreshSession) {
            res.cookies.set("session", refreshSession, {
              httpOnly: true,
            });
          }
          return res;
        } catch (error) {
          console.error("Error refreshing session", error);
          const res = NextResponse.next();
          res.cookies.delete("session");
          return res;
        }
      } else {
        console.log("No refresh token found");
        const res = NextResponse.next();
        res.cookies.delete("session");
        return res;
      }
    }
  }
  // No session
  return NextResponse.next();
}
