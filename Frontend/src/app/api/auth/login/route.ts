import { COOKIE_NAME, MAX_AGE, apiUrl } from "@/utils/constants";
import axios, { Axios, AxiosError } from "axios";
import https from "https";
import { serialize } from "cookie";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

/**
 * Handles a POST request to login and authenticate a user.
 * @param request - The request object containing the email and password in the request body.
 * @returns The response object with the appropriate status code and message.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: "Email and password are required",
        }),
        {
          status: 400,
        }
      );
    }

    const response = await axios.post(
      `${apiUrl}/users/login`,
      { email, password },
      {
        httpsAgent: agent,
      }
    );

    if (response.data.accessToken) {
      const serialized = serialize(COOKIE_NAME, response.data.accessToken, {
        httpOnly: true,
        maxAge: MAX_AGE,
        path: "/",
        sameSite: "strict",
        secure: true,
      });

      return new Response(
        JSON.stringify({
          message: "Authenticated",
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": serialized,
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Login failed",
        }),
        {
          status: 401,
        }
      );
    }
  } catch (e) {
    const error = e as AxiosError;
    return new Response(
      JSON.stringify({
        message: "Error occurred during login",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
