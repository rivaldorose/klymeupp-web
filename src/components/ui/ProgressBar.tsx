"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Progress components for displaying completion percentage
 * Supports both linear and circular progress indicators
 */

interface ProgressProps {
  /** Percentage value (0-100) */
  value: number;
  /** Color of the progress bar */
  color?: "primary" | "success" | "warning" | "info" | "gold";
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Color mapping for different progress variants
 */
const colorClasses = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  gold: "bg-gold",
};

const colorAccents = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  gold: "text-gold",
};

/**
 * Linear progress bar component
 *
 * @example
 * ```tsx
 * <LinearProgress value={65} color="primary" showLabel />
 * ```
 */
const LinearProgress = forwardRef<
  HTMLDivElement,
  ProgressProps & {
    /** Background color of the bar */
    backgroundColor?: string;
    /** Height of the bar */
    height?: "sm" | "md" | "lg";
    /** Show animated fill */
    animated?: boolean;
  }
>(
  (
    {
      value,
      color = "primary",
      showLabel = false,
      className,
      backgroundColor = "bg-surface-muted",
      height = "md",
      animated = true,
      ...props
    },
    ref
  ) => {
    const safeValue = Math.min(Math.max(value, 0), 100);

    const heightStyles = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div
          className={cn(
            "w-full rounded-full overflow-hidden",
            heightStyles[height],
            backgroundColor
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              colorClasses[color],
              animated && "animate-pulse-glow"
            )}
            style={{ width: `${safeValue}%` }}
            role="progressbar"
            aria-valuenow={safeValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {showLabel && (
          <div className={cn("text-xs font-semibold mt-1", colorAccents[color])}>
            {safeValue}%
          </div>
        )}
      </div>
    );
  }
);

LinearProgress.displayName = "LinearProgress";

/**
 * Circular progress component
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} size="lg" color="primary" />
 * ```
 */
const CircularProgress = forwardRef<
  SVGSVGElement,
  ProgressProps & {
    /** Size of the circular progress */
    size?: "sm" | "md" | "lg" | "xl";
    /** Width of the progress ring */
    strokeWidth?: number;
    /** Show value text in center */
    showValue?: boolean;
  }
>(
  (
    {
      value,
      color = "primary",
      size = "md",
      strokeWidth = 4,
      showValue = true,
      className,
      ...props
    },
    ref
  ) => {
    const safeValue = Math.min(Math.max(value, 0), 100);

    const sizeMap = {
      sm: { size: 80, radius: 32 },
      md: { size: 120, radius: 48 },
      lg: { size: 160, radius: 64 },
      xl: { size: 200, radius: 80 },
    };

    const { size: svgSize, radius } = sizeMap[size];
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (safeValue / 100) * circumference;

    const colorMap = {
      primary: "#e9208f",
      success: "#2cc069",
      warning: "#ff9f43",
      info: "#40a9ff",
      gold: "#FFD700",
    };

    return (
      <svg
        ref={ref}
        width={svgSize}
        height={svgSize}
        className={cn("transition-all duration-300", className)}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        {...props}
      >
        {/* Background circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="#f4f0f2"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: `${svgSize / 2}px ${svgSize / 2}px`,
            transition: "stroke-dashoffset 0.3s ease-out",
          }}
          role="progressbar"
          aria-valuenow={safeValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        {/* Center text */}
        {showValue && (
          <text
            x={svgSize / 2}
            y={svgSize / 2}
            textAnchor="middle"
            dy=".3em"
            fontSize={svgSize / 8}
            fontWeight="600"
            fill={colorMap[color]}
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {safeValue}%
          </text>
        )}
      </svg>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

export { LinearProgress, CircularProgress };
export type { ProgressProps };
export default LinearProgress;
