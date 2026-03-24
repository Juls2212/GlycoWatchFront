"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { authService } from "@/services/api/auth.service";
import type { RegisterRequestDTO } from "@/types/auth.types";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequestDTO) => authService.register(data),

    onSuccess: () => {
      // After register → redirect to login with a success param
      router.push("/login?registered=true");
    },

    onError: (error) => {
      console.error("[useRegister] error:", error);
    },
  });
}

export function extractRegisterError(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const msg    = error.response?.data?.message as string | undefined;

    if (status === 409) return "Ya existe una cuenta con ese correo electrónico.";
    if (status === 422) return "Los datos ingresados no son válidos.";
    if (msg) return msg;
  }
  return "No se pudo crear la cuenta. Intenta de nuevo.";
}