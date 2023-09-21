import { cookies } from "next/headers";
import { COOKIE_NAME } from "../constants";

export async function getCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token;
}
