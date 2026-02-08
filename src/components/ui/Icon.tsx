"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Icon component wrapper for Material Symbols Outlined icons
 * Provides a consistent interface for using Material Icons throughout the app
 */

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Name of the Material Symbol icon */
  name: string;
  /** Size of the icon */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Whether to use filled variant */
  filled?: boolean;
  /** Custom color (can use tailwind color classes) */
  color?: string;
  /** Whether icon should be animated */
  animated?: boolean;
}

/**
 * Size mappings for icons
 */
const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

/**
 * Icon component - wrapper for Material Symbols Outlined
 *
 * @example
 * ```tsx
 * <Icon name="star" size="md" />
 * <Icon name="check" size="lg" filled />
 * <Icon name="close" color="text-warning" />
 * ```
 */
const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      name,
      size = "md",
      filled = false,
      color = "currentColor",
      animated = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "material-symbols-outlined inline-flex items-center justify-center",
          sizeMap[size],
          animated && "animate-pulse",
          className
        )}
        style={{
          fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
          color: color === "currentColor" ? color : undefined,
          ...style,
        }}
        {...props}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = "Icon";

/**
 * Predefined icon components with common use cases
 */

const StarIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="star" {...props} />
);
StarIcon.displayName = "StarIcon";

const CheckIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="check" {...props} />
);
CheckIcon.displayName = "CheckIcon";

const CloseIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="close" {...props} />
);
CloseIcon.displayName = "CloseIcon";

const SearchIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="search" {...props} />
);
SearchIcon.displayName = "SearchIcon";

const MenuIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="menu" {...props} />
);
MenuIcon.displayName = "MenuIcon";

const ArrowRightIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="arrow_forward" {...props} />
);
ArrowRightIcon.displayName = "ArrowRightIcon";

const ArrowLeftIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="arrow_back" {...props} />
);
ArrowLeftIcon.displayName = "ArrowLeftIcon";

const ArrowDownIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="arrow_downward" {...props} />
);
ArrowDownIcon.displayName = "ArrowDownIcon";

const ArrowUpIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="arrow_upward" {...props} />
);
ArrowUpIcon.displayName = "ArrowUpIcon";

const FireIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="local_fire_department" {...props} />
);
FireIcon.displayName = "FireIcon";

const LightbulbIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="lightbulb" {...props} />
);
LightbulbIcon.displayName = "LightbulbIcon";

const TrendingUpIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="trending_up" {...props} />
);
TrendingUpIcon.displayName = "TrendingUpIcon";

const HeartIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="favorite" {...props} />
);
HeartIcon.displayName = "HeartIcon";

const SettingsIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="settings" {...props} />
);
SettingsIcon.displayName = "SettingsIcon";

const UserIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="person" {...props} />
);
UserIcon.displayName = "UserIcon";

const CalendarIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="calendar_today" {...props} />
);
CalendarIcon.displayName = "CalendarIcon";

const BellIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="notifications" {...props} />
);
BellIcon.displayName = "BellIcon";

const BookmarkIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="bookmark" {...props} />
);
BookmarkIcon.displayName = "BookmarkIcon";

const ShareIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="share" {...props} />
);
ShareIcon.displayName = "ShareIcon";

const MoreIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="more_vert" {...props} />
);
MoreIcon.displayName = "MoreIcon";

const InfoIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="info" {...props} />
);
InfoIcon.displayName = "InfoIcon";

const WarningIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "name">>(
  (props, ref) => <Icon ref={ref} name="warning" {...props} />
);
WarningIcon.displayName = "WarningIcon";

export {
  Icon,
  StarIcon,
  CheckIcon,
  CloseIcon,
  SearchIcon,
  MenuIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  FireIcon,
  LightbulbIcon,
  TrendingUpIcon,
  HeartIcon,
  SettingsIcon,
  UserIcon,
  CalendarIcon,
  BellIcon,
  BookmarkIcon,
  ShareIcon,
  MoreIcon,
  InfoIcon,
  WarningIcon,
};
export type { IconProps };
export default Icon;
