"use client";

import { useSearchParams } from "next/navigation";
import { AlertBanner } from "./AlertBanner";

export function LoginSuccessBanner() {
  const params      = useSearchParams();
  const registered  = params.get("registered") === "true";

  if (!registered) return null;

  return (
    <AlertBanner
      variant="success"
      message="¡Cuenta creada exitosamente! Inicia sesión para continuar."
      className="mb-4"
    />
  );
}