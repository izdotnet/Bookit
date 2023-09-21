import { COOKIE_NAME, apiUrl } from "@/utils/constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      httpsAgent: agent,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    const error = e as AxiosError;
    return {
      user: null,
      error,
    };
  }
}
