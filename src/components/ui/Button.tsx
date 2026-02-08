"use client";

import React, { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Button component with multiple variants and sizes
 * Supports primary, secondary, ghost, and outline variants
 * Includes loading state with spinner animation
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;
  /** Loading spinner content */
  loadingText?: string;
  /** Content of the button */
  children: ReactNode;
}

/**
 * Spinner component shown during loading state
 */
const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn("animate-spin h-4 w-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="primary" size="md" isLoading>Loading...</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText = "Loading",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 rounded-lg active:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Size variants
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs h-8",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-6 py-3 text-base h-12",
    };

    // Variant styles
    const variantStyles = {
      primary:
        "bg-primary text-white hover:bg-primary-dark shadow-duo active:shadow-none",
      secondary:
        "bg-white text-text-primary border border-border-light hover:bg-surface-muted active:bg-white",
      ghost: "text-primary hover:bg-primary hover:bg-opacity-10 active:text-primary-dark",
      outline:
        "border border-primary text-primary hover:bg-primary hover:bg-opacity-5 active:border-primary-dark",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner className="mr-2" />}
        {isLoading ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
export default Button;
