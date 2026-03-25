"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("Register data:", data);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      router.push("/login");
    },
  });
}

export function extractRegisterError() {
  return "Error al registrarse";
}