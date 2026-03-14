import type { CSSProperties } from "react";
import type { SiteSettings } from "@/sanity/types";

const colorMap: Record<string, string> = {
  primaryColor: "--color-primary",
  secondaryColor: "--color-secondary",
  accentColor: "--color-accent",
  backgroundColor: "--color-bg",
  surfaceColor: "--color-surface",
  textColor: "--color-text",
  textSecondaryColor: "--color-text-secondary",
};

export function settingsToCssVars(
  settings: SiteSettings | null
): CSSProperties {
  if (!settings) return {};

  const vars: Record<string, string> = {};

  for (const [key, cssVar] of Object.entries(colorMap)) {
    const value = settings[key as keyof SiteSettings];
    if (typeof value === "string" && value) {
      vars[cssVar] = value;
    }
  }

  return vars as CSSProperties;
}
