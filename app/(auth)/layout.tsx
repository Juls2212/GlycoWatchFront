"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/token";

interface AuthGroupLayoutProps {
  children: React.ReactNode;
}

export default function AuthGroupLayout({ children }: AuthGroupLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect away from auth pages
    if (tokenStorage.hasToken()) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}