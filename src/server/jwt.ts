import { SignJWT, jwtVerify } from "jose";
import { Session } from "./session";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(
  payload: Session,
  expires_in: number,
): Promise<string> {
  console.log("expires in", expires_in);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(10 + "s") // Set dynamic expiration time based on GitHub token expiration
    .sign(key);
}

export async function decrypt(input: string): Promise<Session> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as Session;
}
