"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { authService } from "@/services/api/auth.service";
import type { LoginRequestDTO } from "@/types/auth.types";

interface UseLoginOptions {
  onSuccess?: () => void;
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequestDTO) => authService.login(data),

    onSuccess: () => {
      options?.onSuccess?.();
      router.push("/");
    },

    onError: (error) => {
      // Errors are surfaced via mutation.error — components read it from there
      console.error("[useLogin] error:", error);
    },
  });
}

// ─── Error message extractor ──────────────────────────────────────────────────

export function extractAuthError(error: unknown): string {
  if (isAxiosError(error)) {
    const msg = error.response?.data?.message as string | undefined;
    const code = error.response?.data?.error  as string | undefined;

    if (error.response?.status === 401) return "Correo o contraseña incorrectos.";
    if (error.response?.status === 404) return "No existe una cuenta con ese correo.";
    if (error.response?.status === 429) return "Demasiados intentos. Intenta más tarde.";
    if (msg) return msg;
    if (code) return code;
  }
  return "Ocurrió un error inesperado. Intenta de nuevo.";
}