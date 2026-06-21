import InstallAppPrompt from "@/components/InstallAppPrompt";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import {
  BRAND_COLOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "news",

  verification: {
    google: "6h7WYA4SCgY1FWxvJKlx5gNug7OCZO2-_KEsVMdnLm8",
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/icons/app-icon.jpeg?v=10",
        type: "image/jpeg",
        sizes: "192x192",
      },
      {
        url: "/icons/maskable-icon.jpeg?v=10",
        type: "image/jpeg",
        sizes: "512x512",
      },
    ],
    shortcut: "/icons/app-icon.jpeg?v=10",
    apple: [
      {
        url: "/icons/app-icon.jpeg?v=10",
        type: "image/jpeg",
        sizes: "180x180",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icons/app-icon.jpeg?v=10",
        width: 512,
        height: 512,
        alt: "News of Bihar Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/icons/app-icon.jpeg?v=10"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>
        <AppShell>{children}</AppShell>
        <InstallAppPrompt />
      </body>
    </html>
  );
}