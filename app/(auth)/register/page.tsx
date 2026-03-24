import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm  } from "@/components/auth/LoginForm";
import { LoginSuccessBanner } from "@/components/auth/LoginSuccessBanner";

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