"use client";

/**
 * Custom hooks for accessing theme tokens throughout the application
 * Simplifies theme usage in components without repeated imports
 */

import {
  colors,
  typography,
  spacing,
  shadows,
  duration,
  easing,
  breakpoints,
  zIndex,
} from "./index";

/**
 * Hook to access the entire theme object
 */
export const useTheme = () => ({
  colors,
  typography,
  spacing,
  shadows,
  duration,
  easing,
  breakpoints,
  zIndex,
});

/**
 * Hook to access color palette
 */
export const useColors = () => colors;

/**
 * Hook to access typography scales
 */
export const useTypography = () => typography;

/**
 * Hook to access spacing scale
 */
export const useSpacing = () => spacing;

/**
 * Hook to access shadow scale
 */
export const useShadows = () => shadows;

/**
 * Hook to access animation durations
 */
export const useDuration = () => duration;

/**
 * Hook to access easing functions
 */
export const useEasing = () => easing;

/**
 * Hook to access responsive breakpoints
 */
export const useBreakpoints = () => breakpoints;

/**
 * Hook to access z-index scale
 */
export const useZIndex = () => zIndex;

/**
 * Hook to get specific color with fallback
 */
export const useColor = (
  colorName: keyof typeof colors,
  shade?: number | string
) => {
  const color = colors[colorName];
  if (typeof color === "string") return color;
  if (shade && typeof color === "object") {
    const colorRecord = color as Record<string | number, string>;
    return (
      colorRecord[shade] ||
      (colorRecord[500] as string | undefined) ||
      colorRecord.DEFAULT
    );
  }
  const colorRecord = color as Record<string | number, string>;
  return colorRecord.DEFAULT || colorRecord[500];
};

/**
 * Hook to detect dark mode
 */
export const useDarkMode = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * Hook to get color based on status
 */
export const useStatusColor = (
  status: "success" | "warning" | "error" | "info"
) => {
  switch (status) {
    case "success":
      return colors.success.DEFAULT;
    case "warning":
      return colors.warning.DEFAULT;
    case "error":
      return colors.destructive[600];
    case "info":
      return colors.info.DEFAULT;
    default:
      return colors.neutral[500];
  }
};
