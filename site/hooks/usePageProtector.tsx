import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function usePageProtector() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);
  return {};
}
