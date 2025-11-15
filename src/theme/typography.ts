"use client";

/**
 * Centralized typography system for consistent text styling
 * Follows web accessibility guidelines (WCAG 2.1)
 */

export const typography = {
  // Headings
  h1: {
    fontSize: "2.25rem", // 36px
    fontWeight: 700,
    lineHeight: "2.5rem", // 40px
    letterSpacing: "-0.02em",
    className: "text-4xl font-bold leading-10 -tracking-wider",
  },
  h2: {
    fontSize: "1.875rem", // 30px
    fontWeight: 700,
    lineHeight: "2.25rem", // 36px
    letterSpacing: "-0.01em",
    className: "text-3xl font-bold leading-9 -tracking-tight",
  },
  h3: {
    fontSize: "1.5rem", // 24px
    fontWeight: 600,
    lineHeight: "2rem", // 32px
    className: "text-2xl font-semibold leading-8",
  },
  h4: {
    fontSize: "1.25rem", // 20px
    fontWeight: 600,
    lineHeight: "1.75rem", // 28px
    className: "text-xl font-semibold leading-7",
  },
  h5: {
    fontSize: "1.125rem", // 18px
    fontWeight: 600,
    lineHeight: "1.75rem", // 28px
    className: "text-lg font-semibold leading-7",
  },
  h6: {
    fontSize: "1rem", // 16px
    fontWeight: 600,
    lineHeight: "1.5rem", // 24px
    className: "text-base font-semibold leading-6",
  },

  // Body text
  body: {
    lg: {
      fontSize: "1.125rem", // 18px
      fontWeight: 400,
      lineHeight: "1.75rem", // 28px
      className: "text-lg font-normal leading-7",
    },
    base: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
      lineHeight: "1.5rem", // 24px
      className: "text-base font-normal leading-6",
    },
    sm: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
      lineHeight: "1.25rem", // 20px
      className: "text-sm font-normal leading-5",
    },
  },

  // Special text styles
  label: {
    fontSize: "0.875rem", // 14px
    fontWeight: 500,
    lineHeight: "1.25rem", // 20px
    className: "text-sm font-medium leading-5",
  },
  button: {
    fontSize: "0.875rem", // 14px
    fontWeight: 500,
    lineHeight: "1.25rem", // 20px
    className: "text-sm font-medium leading-5",
  },
  caption: {
    fontSize: "0.75rem", // 12px
    fontWeight: 400,
    lineHeight: "1rem", // 16px
    className: "text-xs font-normal leading-4",
  },
  code: {
    fontSize: "0.875rem", // 14px
    fontWeight: 500,
    lineHeight: "1.25rem", // 20px
    fontFamily: "monospace",
    className: "text-sm font-medium leading-5 font-mono",
  },
} as const;

export type TypographyKey = keyof typeof typography;
export type TypographyLevel = "lg" | "base" | "sm";
