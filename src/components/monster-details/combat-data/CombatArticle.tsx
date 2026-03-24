import { cn } from "@/utils/lib";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DetailSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  variant?: "card" | "plain";
  className?: string;
  children: ReactNode;
}

const VARIANT_STYLES = {
  card: cn("space-y-4", "border border-border rounded-xl bg-card", "p-6"),
  plain: "space-y-2",
} as const;

export function CombatArticle({
  icon: Icon,
  title,
  description,
  variant = "card",
  className,
  children,
}: DetailSectionProps) {
  return (
    <article className={cn(VARIANT_STYLES[variant], className)}>
      <header className="flex items-center gap-2">
        <Icon className="size-5 text-primary" />

        <h2
          className={cn(
            "font-bold",
            variant === "card" ? "text-lg" : "text-xl"
          )}
        >
          {title}
        </h2>
      </header>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {children}
    </article>
  );
}
