"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock } from "lucide-react";
import { Input }                from "@/components/ui/Input";
import { Button }               from "@/components/ui/Button";
import { AlertBanner }          from "./AlertBanner";
import { PasswordStrengthBar }  from "./PasswordStrengthBar";
import { useRegister, extractRegisterError } from "../hooks/useRegister";
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schemas";

export function RegisterForm() {
  const register_  = useRegister();
  const [dismissed, setDismissed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const passwordValue = watch("password", "");

  const onSubmit = (values: RegisterFormValues) => {
    setDismissed(false);
    // Don't send confirmPassword to the API
    const { confirmPassword: _, ...payload } = values;
    register_.mutate(payload);
  };

  const errorMessage =
    register_.isError && !dismissed
      ? extractRegisterError(register_.error)
      : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Formulario de registro"
    >
      {/* API error */}
      {errorMessage && (
        <AlertBanner
          variant="error"
          message={errorMessage}
          onDismiss={() => setDismissed(true)}
        />
      )}

      {/* Full name */}
      <Input
        {...register("fullName")}
        label="Nombre completo"
        type="text"
        placeholder="Sofía García"
        leftIcon={User}
        error={errors.fullName?.message}
        autoComplete="name"
        autoFocus
      />

      {/* Email */}
      <Input
        {...register("email")}
        label="Correo electrónico"
        type="email"
        placeholder="tu@correo.com"
        leftIcon={Mail}
        error={errors.email?.message}
        autoComplete="email"
      />

      {/* Password */}
      <div className="space-y-2">
        <Input
          {...register("password")}
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          leftIcon={Lock}
          error={errors.password?.message}
          autoComplete="new-password"
          hint={!errors.password ? "Mínimo 8 caracteres, una mayúscula y un número" : undefined}
        />
        <PasswordStrengthBar password={passwordValue} />
      </div>

      {/* Confirm password */}
      <Input
        {...register("confirmPassword")}
        label="Confirmar contraseña"
        type="password"
        placeholder="Repite tu contraseña"
        leftIcon={Lock}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
      />

      {/* Terms note */}
      <p className="text-[12px] text-slate-400 leading-relaxed">
        Al registrarte aceptas el uso de tus datos para el monitoreo
        glucémico dentro de esta plataforma académica.
      </p>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={register_.isPending || isSubmitting}
      >
        {register_.isPending ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
    </form>
  );
}