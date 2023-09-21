"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserResponse } from "@/types";

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const data = await axios.get<UserResponse>("/api/auth/me");

      if (data.status !== 200 || !data.data) {
        push("/");
        return;
      }
      setIsSuccess(true);
    })();
  }, [push]);

  return isSuccess ? <main>{children}</main> : null;
}
