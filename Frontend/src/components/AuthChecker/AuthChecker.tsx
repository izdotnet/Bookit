"use client";

import React from "react";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { userAtom } from "@/utils/atoms";
import { useAtom } from "jotai";

function AuthChecker({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("/api/auth/me");
        if (data.status === 200) {
          setUser(data.data);
        }
      } catch (e) {
        const error = e as AxiosError;
        console.error(error);
        setUser(null);
      }
    })();
  }, [setUser]);
  return <>{children}</>;
}

export default AuthChecker;
