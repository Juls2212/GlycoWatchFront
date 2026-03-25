import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Regístrate para comenzar a monitorear tu glucosa"
      footerText="¿Ya tienes cuenta?"
      footerLink="/login"
      footerLabel="Inicia sesión"
    >
      <RegisterForm />
    </AuthLayout>
  );
}