import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm  } from "@/features/auth/components/LoginForm";
import { LoginSuccessBanner } from "@/features/auth/components/LoginSuccessBanner";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bienvenido de vuelta"
      subtitle="Ingresa tus credenciales para acceder a tu panel"
      footerText="¿No tienes cuenta?"
      footerLink="/register"
      footerLabel="Regístrate gratis"
    >
      {/* Show success banner if coming from register */}
      <Suspense>
        <LoginSuccessBanner />
      </Suspense>

      <LoginForm />
    </AuthLayout>
  );
}