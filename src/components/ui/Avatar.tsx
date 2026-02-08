"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Avatar component for displaying user profile pictures
 * Supports image, initials fallback, online status, and level badge
 */

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL of the avatar image */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** User initials to display if no image */
  initials?: string;
  /** Size of the avatar */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show online status indicator */
  online?: boolean;
  /** Level to display as badge overlay */
  level?: number;
  /** Fallback background color */
  bgColor?: "primary" | "success" | "warning" | "info" | "gold" | "navy";
}

/**
 * Color mappings for avatar background
 */
const bgColorClasses = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  gold: "bg-gold",
  navy: "bg-navy",
};

/**
 * Size mappings for avatar dimensions
 */
const sizeMap = {
  sm: { size: 32, text: "text-xs", badge: "text-xs w-5 h-5" },
  md: { size: 40, text: "text-sm", badge: "text-sm w-6 h-6" },
  lg: { size: 56, text: "text-base", badge: "text-base w-7 h-7" },
  xl: { size: 80, text: "text-lg", badge: "text-lg w-9 h-9" },
};

const sizeBorderRadius = {
  sm: "rounded-lg",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
};

/**
 * Avatar component
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="User" size="md" online />
 * <Avatar initials="JD" level={5} />
 * ```
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      initials,
      size = "md",
      online = false,
      level,
      bgColor = "primary",
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const { size: sizePixels, text, badge } = sizeMap[size];
    const sizeClass = sizeBorderRadius[size];
    const shouldShowInitials = !src || imageError;

    const statusIndicatorSize = {
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
      xl: "w-4 h-4",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: sizePixels, height: sizePixels }}
        {...props}
      >
        {/* Avatar Image or Initials */}
        <div
          className={cn(
            "w-full h-full flex items-center justify-center relative",
            sizeClass,
            shouldShowInitials && bgColorClasses[bgColor],
            !shouldShowInitials && "overflow-hidden"
          )}
        >
          {src && !shouldShowInitials ? (
            <Image
              src={src}
              alt={alt}
              width={sizePixels}
              height={sizePixels}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <span className={cn(text, "font-semibold text-white")}>
              {initials || "?"}
            </span>
          )}
        </div>

        {/* Online Status Indicator */}
        {online && (
          <div
            className={cn(
              "absolute bottom-0 right-0 bg-success border-2 border-white rounded-full",
              statusIndicatorSize[size]
            )}
          />
        )}

        {/* Level Badge */}
        {level !== undefined && (
          <div
            className={cn(
              "absolute -bottom-1 -right-1 bg-primary text-white font-semibold rounded-full flex items-center justify-center",
              badge
            )}
          >
            {level}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

/**
 * Avatar group component for displaying multiple avatars
 */
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of avatar props */
  avatars: AvatarProps[];
  /** Number of avatars to show before showing count */
  maxVisible?: number;
  /** Size of avatars */
  size?: "sm" | "md" | "lg" | "xl";
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { avatars, maxVisible = 3, size = "md", className, ...props },
    ref
  ) => {
    const visibleAvatars = avatars.slice(0, maxVisible);
    const hiddenCount = Math.max(0, avatars.length - maxVisible);

    const overlapOffset = {
      sm: -8,
      md: -10,
      lg: -14,
      xl: -20,
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            style={{ marginLeft: index === 0 ? 0 : overlapOffset[size] }}
            className="relative border-2 border-white rounded-lg"
          >
            <Avatar {...avatar} size={size} />
          </div>
        ))}

        {hiddenCount > 0 && (
          <div
            style={{ marginLeft: overlapOffset[size] }}
            className={cn(
              "relative border-2 border-white rounded-lg bg-surface-muted flex items-center justify-center font-semibold text-text-primary",
              size === "sm" && "w-8 h-8 text-xs",
              size === "md" && "w-10 h-10 text-sm",
              size === "lg" && "w-14 h-14 text-base",
              size === "xl" && "w-20 h-20 text-lg"
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
export type { AvatarProps, AvatarGroupProps };
export default Avatar;
