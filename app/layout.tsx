import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/sanity/lib/queries";
import { settingsToCssVars } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings?.siteName || "Ullrhome",
    description: settings?.siteDescription || "Personal portfolio",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const cssVars = settingsToCssVars(settings);

  return (
    <html lang="en" style={cssVars}>
      <body className={`${inter.className} bg-bg text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
