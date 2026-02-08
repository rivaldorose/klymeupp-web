"use client";

import React, { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Badge/chip component for displaying tags, statuses, and achievements
 */

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the badge */
  variant?:
    | "default"
    | "nieuw"
    | "bezig"
    | "voltooid"
    | "skill"
    | "xp"
    | "streak"
    | "info"
    | "warning"
    | "success";
  /** Size of the badge */
  size?: "sm" | "md" | "lg";
  /** Icon to display before text */
  icon?: ReactNode;
  /** Content of the badge */
  children: ReactNode;
  /** Whether badge is filled or outlined */
  filled?: boolean;
}

/**
 * Badge component for tags and status indicators
 *
 * @example
 * ```tsx
 * <Badge variant="nieuw">New</Badge>
 * <Badge variant="bezig">In Progress</Badge>
 * <Badge variant="xp" icon={<StarIcon />}>250 XP</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    variant = "default",
    size = "md",
    icon,
    children,
    filled = true,
    className,
    ...props
  }, ref) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold rounded-full transition-colors duration-200 whitespace-nowrap";

    // Size variants
    const sizeStyles = {
      sm: "px-2 py-1 text-xs gap-1",
      md: "px-3 py-1.5 text-sm gap-1.5",
      lg: "px-4 py-2 text-base gap-2",
    };

    // Variant styles
    const variantStyles = {
      default: filled
        ? "bg-surface-muted text-text-primary"
        : "border border-border-light text-text-primary bg-transparent",
      nieuw: filled
        ? "bg-success text-white"
        : "border border-success text-success bg-white",
      bezig: filled
        ? "bg-warning text-white"
        : "border border-warning text-warning bg-white",
      voltooid: filled
        ? "bg-success text-white"
        : "border border-success text-success bg-white",
      skill: filled
        ? "bg-primary/10 text-primary"
        : "border border-primary text-primary bg-white",
      xp: filled
        ? "bg-gold bg-opacity-20 text-gold"
        : "border border-gold text-gold bg-white",
      streak: filled
        ? "bg-warning bg-opacity-20 text-warning"
        : "border border-warning text-warning bg-white",
      info: filled
        ? "bg-info bg-opacity-20 text-info"
        : "border border-info text-info bg-white",
      warning: filled
        ? "bg-warning bg-opacity-20 text-warning"
        : "border border-warning text-warning bg-white",
      success: filled
        ? "bg-success bg-opacity-20 text-success"
        : "border border-success text-success bg-white",
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

/**
 * Status badge for Dutch status labels
 */
const StatusBadge = forwardRef<
  HTMLSpanElement,
  {
    status: "nieuw" | "bezig" | "voltooid";
    children?: ReactNode;
  }
>(({ status, children }, ref) => {
  const statusLabels = {
    nieuw: "Nieuw",
    bezig: "Bezig",
    voltooid: "Voltooid",
  };

  return (
    <Badge ref={ref} variant={status}>
      {children || statusLabels[status]}
    </Badge>
  );
});

StatusBadge.displayName = "StatusBadge";

/**
 * XP badge with star icon
 */
const XPBadge = forwardRef<HTMLSpanElement, { xp: number }>(
  ({ xp }, ref) => {
    const formatXP = (value: number) => {
      if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
      return value.toString();
    };

    return (
      <Badge
        ref={ref}
        variant="xp"
        size="sm"
        icon={<span className="material-symbols-outlined text-lg">star</span>}
      >
        {formatXP(xp)} XP
      </Badge>
    );
  }
);

XPBadge.displayName = "XPBadge";

/**
 * Streak badge with fire icon
 */
const StreakBadge = forwardRef<HTMLSpanElement, { count: number }>(
  ({ count }, ref) => (
    <Badge
      ref={ref}
      variant="streak"
      size="sm"
      icon={<span className="material-symbols-outlined text-lg">local_fire_department</span>}
    >
      {count} day{count !== 1 ? "s" : ""}
    </Badge>
  )
);

StreakBadge.displayName = "StreakBadge";

export { Badge, StatusBadge, XPBadge, StreakBadge };
export type { BadgeProps };
export default Badge;
