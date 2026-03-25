"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

import { Input }       from "@/components/ui/Input";
import { Button }      from "@/components/ui/Button";
import { AlertBanner } from "./AlertBanner";
import { useLogin, extractAuthError } from "@/hooks/useLogin";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schemas";

export function LoginForm() {
  const login = useLogin();
  const [dismissed, setDismissed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: LoginFormValues) => {
    setDismissed(false);
    login.mutate(values);
  };

  const errorMessage =
    login.isError && !dismissed
      ? extractAuthError(login.error)
      : null;

 return (
   <>
     <form
       onSubmit={handleSubmit(onSubmit)}
       noValidate
       className="space-y-4"
       aria-label="Formulario de inicio de sesión"
     >
       {/* Error API */}
       {errorMessage && (
         <AlertBanner
           variant="error"
           message={errorMessage}
           onDismiss={() => setDismissed(true)}
         />
       )}

       {/* Email */}
       <Input
         {...register("email")}
         label="Correo electrónico"
         type="email"
         placeholder="tu@correo.com"
         leftIcon={Mail}
         error={errors.email?.message}
         autoComplete="email"
         autoFocus
       />

       {/* Password */}
       <Input
         {...register("password")}
         label="Contraseña"
         type="password"
         placeholder="••••••••"
         leftIcon={Lock}
         error={errors.password?.message}
         autoComplete="current-password"
       />

       {/* Submit */}
       <Button
         type="submit"
         fullWidth
         size="lg"
         loading={login.isPending || isSubmitting}
         className="mt-2"
       >
         {login.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
       </Button>
     </form>

     {/*REGISTER LINK*/}
     <p className="text-sm text-center mt-4 text-zinc-600">
       ¿No tienes cuenta?{" "}
       <Link
         href="/register"
         className="text-primary-600 font-semibold hover:underline"
       >
         Regístrate gratis
       </Link>
     </p>
   </>
 );
}