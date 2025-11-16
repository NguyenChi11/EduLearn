"use client";

import { colors, shadows, spacing, typography } from "@/theme";

/**
 * Example components showcasing theme usage
 * Demonstrates how to use colors, typography, spacing, and shadows
 */

export const ThemeExamples = () => {
  return (
    <div className="w-full p-8 space-y-8 bg-slate-50 dark:bg-slate-900">
      <h1 className={typography.h1.className}>Theme System Examples</h1>

      {/* Colors Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Primary Colors */}
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.primary[600] }}
          >
            Primary
          </div>
          {/* Secondary Colors */}
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.secondary[600] }}
          >
            Secondary
          </div>
          {/* Accent Colors */}
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.accent[600] }}
          >
            Accent
          </div>
          {/* Destructive Colors */}
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.destructive[600] }}
          >
            Destructive
          </div>
          {/* Success Colors */}
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.success.DEFAULT }}
          >
            Success
          </div>
          {/* Warning Colors */}
          <div
            className="h-24 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.warning.DEFAULT }}
          >
            Warning
          </div>
        </div>
      </section>

      {/* Typography Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Typography</h2>
        <div className="space-y-3">
          <h1 className={typography.h1.className}>Heading H1</h1>
          <h2 className={typography.h2.className}>Heading H2</h2>
          <h3 className={typography.h3.className}>Heading H3</h3>
          <p className={typography.body.lg.className}>Body Large Text</p>
          <p className={typography.body.base.className}>Body Base Text</p>
          <p className={typography.body.sm.className}>Body Small Text</p>
          <label className={typography.label.className}>Label Text</label>
          <p className={typography.caption.className}>Caption Text</p>
          <code className={typography.code.className}>Code Text</code>
        </div>
      </section>

      {/* Buttons Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button
            className={`${typography.button.className} rounded-lg transition-colors`}
            style={{
              backgroundColor: colors.primary[600],
              color: colors.neutral[50],
              padding: `${spacing.sm} ${spacing.lg}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.primary[700])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.primary[600])
            }
          >
            Primary Button
          </button>

          <button
            className={`${typography.button.className} rounded-lg transition-colors`}
            style={{
              backgroundColor: colors.secondary[600],
              color: colors.neutral[50],
              padding: `${spacing.sm} ${spacing.lg}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.secondary[700])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.secondary[600])
            }
          >
            Secondary Button
          </button>

          <button
            className={`${typography.button.className} rounded-lg transition-colors`}
            style={{
              backgroundColor: colors.accent[600],
              color: colors.neutral[50],
              padding: `${spacing.sm} ${spacing.lg}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.accent[700])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.accent[600])
            }
          >
            Success Button
          </button>

          <button
            className={`${typography.button.className} rounded-lg transition-colors`}
            style={{
              backgroundColor: colors.destructive[600],
              color: colors.neutral[50],
              padding: `${spacing.sm} ${spacing.lg}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.destructive[700])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.destructive[600])
            }
          >
            Destructive Button
          </button>
        </div>
      </section>

      {/* Cards Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Cards with Shadows</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.neutral[50],
              boxShadow: shadows.sm,
            }}
          >
            <h4 className={typography.h4.className}>Shadow SM</h4>
            <p className={typography.body.sm.className}>Small shadow effect</p>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.neutral[50],
              boxShadow: shadows.md,
            }}
          >
            <h4 className={typography.h4.className}>Shadow MD</h4>
            <p className={typography.body.sm.className}>Medium shadow effect</p>
          </div>

          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: colors.neutral[50],
              boxShadow: shadows.lg,
            }}
          >
            <h4 className={typography.h4.className}>Shadow LG</h4>
            <p className={typography.body.sm.className}>Large shadow effect</p>
          </div>
        </div>
      </section>

      {/* Spacing Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Spacing Scale</h2>
        <div className="space-y-4">
          {Object.entries(spacing).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-16 font-semibold">{key}</span>
              <div
                className="h-8 rounded-lg"
                style={{
                  width: value,
                  backgroundColor: colors.primary[500],
                }}
              />
              <span className="text-sm text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Badge Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Badges</h2>
        <div className="flex flex-wrap gap-3">
          <span
            className={`${typography.caption.className} rounded-full px-3 py-1`}
            style={{
              backgroundColor: colors.success.light,
              color: colors.success.dark,
            }}
          >
            Success Badge
          </span>
          <span
            className={`${typography.caption.className} rounded-full px-3 py-1`}
            style={{
              backgroundColor: colors.warning.light,
              color: colors.warning.dark,
            }}
          >
            Warning Badge
          </span>
          <span
            className={`${typography.caption.className} rounded-full px-3 py-1`}
            style={{
              backgroundColor: colors.info.light,
              color: colors.info.dark,
            }}
          >
            Info Badge
          </span>
          <span
            className={`${typography.caption.className} rounded-full px-3 py-1`}
            style={{
              backgroundColor: colors.neutral[200],
              color: colors.neutral[800],
            }}
          >
            Neutral Badge
          </span>
        </div>
      </section>

      {/* Alert Example */}
      <section className="space-y-4">
        <h2 className={typography.h2.className}>Alerts</h2>
        <div className="space-y-3">
          <div
            className="p-4 rounded-lg border-l-4"
            style={{
              backgroundColor: colors.success.light,
              borderLeftColor: colors.success.DEFAULT,
            }}
          >
            <p
              className={typography.body.sm.className}
              style={{ color: colors.success.dark }}
            >
              Success Alert: Operation completed successfully
            </p>
          </div>

          <div
            className="p-4 rounded-lg border-l-4"
            style={{
              backgroundColor: colors.warning.light,
              borderLeftColor: colors.warning.DEFAULT,
            }}
          >
            <p
              className={typography.body.sm.className}
              style={{ color: colors.warning.dark }}
            >
              Warning Alert: Please review this action
            </p>
          </div>

          <div
            className="p-4 rounded-lg border-l-4"
            style={{
              backgroundColor: colors.destructive[100],
              borderLeftColor: colors.destructive[600],
            }}
          >
            <p
              className={typography.body.sm.className}
              style={{ color: colors.destructive[800] }}
            >
              Error Alert: Something went wrong
            </p>
          </div>

          <div
            className="p-4 rounded-lg border-l-4"
            style={{
              backgroundColor: colors.info.light,
              borderLeftColor: colors.info.DEFAULT,
            }}
          >
            <p
              className={typography.body.sm.className}
              style={{ color: colors.info.dark }}
            >
              Info Alert: Important information for you
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
