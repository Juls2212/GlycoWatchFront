import Link from "next/link";
import { Activity } from "lucide-react";

interface AuthLayoutProps {
  children:    React.ReactNode;
  title:       string;
  subtitle:    string;
  footerText:  string;
  footerLink:  string;
  footerLabel: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLabel,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── Left panel: branding ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col bg-[#0F172A] relative overflow-hidden">

        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Red glow accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0  w-96 h-96 bg-primary-800/10 rounded-full blur-3xl  translate-y-1/3 -translate-x-1/3" />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-red-900/40">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              GlycoWatch
            </span>
          </Link>
        </div>

        {/* Tagline */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 pb-10">
          <h2 className="text-[2rem] font-bold text-white leading-tight tracking-tight mb-4">
            Monitoreo glucémico<br />
            <span className="text-primary-400">inteligente.</span>
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xs">
            Conecta tu dispositivo ESP32, visualiza tus niveles de glucosa en
            tiempo real y recibe predicciones de riesgo con inteligencia artificial.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: "📡", text: "Integración IoT con ESP32" },
              { icon: "📊", text: "Análisis y tendencias en tiempo real" },
              { icon: "🤖", text: "Predicción de riesgo con IA" },
            ].map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8"
              >
                <span className="text-lg leading-none">{f.icon}</span>
                <span className="text-slate-300 text-[13px] font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-10 pb-8">
          <p className="text-slate-600 text-[11px]">
            © {new Date().getFullYear()} GlycoWatch · Proyecto académico
          </p>
        </div>
      </div>

      {/* ── Right panel: form ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-slate-900 text-[16px]">GlycoWatch</span>
        </div>

        {/* Card */}
        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="mt-1.5 text-[14px] text-slate-500">{subtitle}</p>
          </div>

          {/* Form slot */}
          {children}
        </div>
      </div>
    </div>
  );
}