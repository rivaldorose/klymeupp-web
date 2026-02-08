"use client";

import React, { forwardRef, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Input component with support for labels, error states, and icon prefixes/suffixes
 */

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text displayed above input */
  label?: string;
  /** Error message to display below input */
  error?: string;
  /** Icon or component to display before input */
  prefixIcon?: ReactNode;
  /** Icon or component to display after input */
  suffixIcon?: ReactNode;
  /** Helper text below input */
  helperText?: string;
  /** Input variant */
  variant?: "default" | "filled" | "outlined";
  /** Size of input */
  size?: "sm" | "md" | "lg";
  /** Whether to show password toggle (only for type="password") */
  showPasswordToggle?: boolean;
}

/**
 * Input component with optional label, error messages, and icon support
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="user@example.com"
 *   error="Invalid email"
 * />
 * <Input
 *   label="Password"
 *   type="password"
 *   showPasswordToggle
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      prefixIcon,
      suffixIcon,
      helperText,
      variant = "default",
      size = "md",
      type,
      showPasswordToggle = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Base styles
    const baseInputStyles =
      "w-full font-sans transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-text-muted";

    // Size variants
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs h-8 text-sm",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-5 py-3 text-base h-12",
    };

    // Variant styles
    const variantStyles = {
      default:
        "bg-surface-light border border-border-light rounded-lg focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50",
      filled:
        "bg-surface-muted border-0 rounded-lg focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary",
      outlined:
        "bg-transparent border border-border-light rounded-lg focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50",
    };

    // Error state
    const errorStyles = error ? "border-warning focus-visible:border-warning" : "";

    const inputType =
      type === "password" && showPasswordToggle
        ? showPassword
          ? "text"
          : "password"
        : type;

    const containerClasses = prefixIcon || suffixIcon ? "relative" : "";
    const inputPaddingClasses =
      (prefixIcon ? "pl-10" : "") + (suffixIcon || showPasswordToggle ? " pr-10" : "");

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {label}
          </label>
        )}

        <div className={containerClasses}>
          {/* Prefix Icon */}
          {prefixIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-text-secondary">
              {prefixIcon}
            </div>
          )}

          {/* Input Element */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              baseInputStyles,
              sizeStyles[size],
              variantStyles[variant],
              errorStyles,
              inputPaddingClasses,
              className
            )}
            {...props}
          />

          {/* Suffix Icon */}
          {suffixIcon && !showPasswordToggle && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-text-secondary">
              {suffixIcon}
            </div>
          )}

          {/* Password Toggle */}
          {type === "password" && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-warning mt-1.5 font-medium">{error}</p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p className="text-xs text-text-muted mt-1.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/**
 * Textarea component - extends input functionality for multi-line text
 */
interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    error,
    helperText,
    variant = "default",
    size = "md",
    className,
    disabled,
    ...props
  }, ref) => {
    const baseStyles =
      "w-full font-sans transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-text-muted resize-none";

    const sizeStyles = {
      sm: "px-3 py-2 text-xs min-h-20",
      md: "px-4 py-3 text-sm min-h-32",
      lg: "px-5 py-4 text-base min-h-40",
    };

    const variantStyles = {
      default:
        "bg-surface-light border border-border-light rounded-lg focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50",
      filled:
        "bg-surface-muted border-0 rounded-lg focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary",
      outlined:
        "bg-transparent border border-border-light rounded-lg focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50",
    };

    const errorStyles = error ? "border-warning focus-visible:border-warning" : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-text-primary mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            errorStyles,
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs text-warning mt-1.5 font-medium">{error}</p>
        )}

        {helperText && !error && (
          <p className="text-xs text-text-muted mt-1.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
export type { InputProps, TextareaProps };
export default Input;
