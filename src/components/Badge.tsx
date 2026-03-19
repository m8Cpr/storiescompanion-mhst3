import { cn } from "@/utils/lib";

type SmallBadgeProps = {
  count: number;
};

function SmallBadge({ count }: SmallBadgeProps) {
  return (
    <span
      className={cn(
        "absolute -right-2.5 -top-2.5",
        "flex size-5 items-center justify-center",
        "rounded-full bg-(--accent) text-[10px] font-bold text-(--bg)"
      )}
    >
      +{count}
    </span>
  );
}

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  count?: number;
};

export default function Badge({ children, className, count }: BadgeProps) {
  const hasCount = count != null && count > 0;

  if (hasCount) {
    return (
      <span className={cn("relative", className)}>
        <p className="rounded bg-(--code-bg) px-2 py-1 truncate">{children}</p>
        <SmallBadge count={count} />
      </span>
    );
  }

  return (
    <p className={cn("rounded bg-(--code-bg) px-2 py-1 truncate", className)}>
      {children}
    </p>
  );
}
