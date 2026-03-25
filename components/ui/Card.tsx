import { cn } from "@/lib/utils";

interface CardProps {
  children:   React.ReactNode;
  className?: string;
  padding?:   "none" | "sm" | "md" | "lg";
}

const PADDING = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6",
};

export function Card({ children, className, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[14px] border border-[#E9E9EC]",
        "shadow-[0_1px_2px_0_rgb(0,0,0,0.04)]",
        PADDING[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title:      string;
  subtitle?:  string;
  action?:    React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-5", className)}>
      <div>
        <h2 className="text-[14px] font-semibold text-zinc-800 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  );
}