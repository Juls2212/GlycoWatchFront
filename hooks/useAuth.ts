"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/token";
import { authService } from "@/services/api/auth.service";
import type { AuthUserDTO } from "@/types/auth.types";

interface AuthState {
  user: AuthUserDTO | null;
  isLoading: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  useEffect(() => {
    // On mount, check for stored session
    const token = tokenStorage.getAccessToken();
    if (!token) {
      setState({ user: null, isLoading: false });
      return;
    }

    // Decode the JWT payload (no verify — server does that)
    try {
      const [, payloadB64] = token.split(".");
      const payload = JSON.parse(atob(payloadB64)) as {
        sub: string;
        role: string;
        userId: number;
        exp: number;
      };

      // Check expiry
      if (Date.now() / 1000 > payload.exp) {
        tokenStorage.clearAll();
        setState({ user: null, isLoading: false });
        return;
      }

      setState({
        user: { id: payload.userId, email: payload.sub, role: payload.role as AuthUserDTO["role"] },
        isLoading: false,
      });
    } catch {
      tokenStorage.clearAll();
      setState({ user: null, isLoading: false });
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setState({ user: null, isLoading: false });
    router.push("/login");
  }, [router]);

  return {
    user:      state.user,
    isLoading: state.isLoading,
    isAuthenticated: Boolean(state.user),
    logout,
  };
}