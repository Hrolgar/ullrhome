import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { settingsToCssVars } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings?.siteName || "Ullrhome";
  const description = settings?.siteDescription || "Personal portfolio and blog";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ullrhome.com"),
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      type: "website",
      siteName,
      title: siteName,
      description,
      ...(settings?.ogImage && {
        images: [{ url: urlFor(settings.ogImage).width(1200).height(630).url() }],
      }),
    },
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
    <html lang="en" style={cssVars} className="antialiased">
      <body className={`${inter.className} bg-bg text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
