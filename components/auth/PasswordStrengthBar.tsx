"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthBarProps {
  password: string;
}

interface StrengthLevel {
  label:   string;
  color:   string;
  score:   number; // 0-4
}

function evaluateStrength(password: string): StrengthLevel {
  if (!password) return { label: "", color: "bg-slate-200", score: 0 };

  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Map raw score (0-5) to level (0-4)
  const level = Math.min(4, score);

  const levels: Omit<StrengthLevel, "score">[] = [
    { label: "",            color: "bg-slate-200"  },
    { label: "Muy débil",   color: "bg-red-400"    },
    { label: "Débil",       color: "bg-orange-400" },
    { label: "Moderada",    color: "bg-amber-400"  },
    { label: "Fuerte",      color: "bg-green-500"  },
  ];

  return { ...levels[level], score: level };
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const strength = useMemo(() => evaluateStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      {/* Bar segments */}
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < strength.score ? strength.color : "bg-slate-200"
            )}
          />
        ))}
      </div>

      {/* Label */}
      {strength.label && (
        <p className="text-[11px] text-slate-500">
          Seguridad:{" "}
          <span
            className={cn(
              "font-semibold",
              strength.score <= 1 && "text-red-500",
              strength.score === 2 && "text-orange-500",
              strength.score === 3 && "text-amber-600",
              strength.score === 4 && "text-green-600"
            )}
          >
            {strength.label}
          </span>
        </p>
      )}
    </div>
  );
}