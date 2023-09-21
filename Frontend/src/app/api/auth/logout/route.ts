import { COOKIE_NAME, MAX_AGE, apiUrl } from "@/utils/constants";
import https from "https";
import { serialize } from "cookie";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST() {
  const serialized = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: -1,
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  return new Response(
    JSON.stringify({
      message: "Logged out",
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
