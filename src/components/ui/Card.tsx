"use client";

import React, { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card component with multiple variants
 * Supports default, hover, gradient, and stat card variants
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: "default" | "hover" | "gradient" | "stat";
  /** Content of the card */
  children: ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Base Card component
 *
 * @example
 * ```tsx
 * <Card variant="default">
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>Footer text</CardFooter>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    // Base styles
    const baseStyles = "rounded-2xl transition-all duration-200";

    // Variant styles
    const variantStyles = {
      default: "bg-surface-light border border-border-light shadow-card",
      hover:
        "bg-surface-light border border-border-light shadow-card hover:shadow-card-hover hover:border-primary/30 cursor-pointer",
      gradient:
        "bg-gradient-to-br from-primary to-primary-dark text-white shadow-card-hover",
      stat: "bg-surface-light border border-border-light shadow-card border-l-4 border-l-primary",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader component - typically contains title
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-b border-border-light", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

/**
 * CardContent component - main content area
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

/**
 * CardFooter component - typically contains actions or metadata
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-t border-border-light bg-surface-muted rounded-b-2xl", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps };
export default Card;
