import type { CSSProperties } from "react";

interface SiteSettings {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
}

export function settingsToCssVars(
  settings: SiteSettings | null
): CSSProperties {
  if (!settings) return {};

  const vars: Record<string, string> = {};

  if (settings.primaryColor) vars["--color-primary"] = settings.primaryColor;
  if (settings.secondaryColor) vars["--color-secondary"] = settings.secondaryColor;
  if (settings.accentColor) vars["--color-accent"] = settings.accentColor;
  if (settings.backgroundColor) vars["--color-bg"] = settings.backgroundColor;
  if (settings.surfaceColor) vars["--color-surface"] = settings.surfaceColor;
  if (settings.textColor) vars["--color-text"] = settings.textColor;
  if (settings.textSecondaryColor) vars["--color-text-secondary"] = settings.textSecondaryColor;

  return vars as CSSProperties;
}
