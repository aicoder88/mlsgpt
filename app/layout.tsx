import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display"
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mlsgpt.com"),
  title: {
    default: "MLSGPT | AI Real Estate Listing Description Generator",
    template: "%s | MLSGPT"
  },
  description:
    "Generate MLS descriptions, real estate social media captions, email blasts, open house promos, and seller updates from one listing brief.",
  keywords: [
    "AI real estate listing description generator",
    "MLS description generator",
    "real estate social media caption generator",
    "open house marketing generator",
    "real estate email generator",
    "AI for real estate agents"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mlsgpt.com",
    siteName: "MLSGPT",
    title: "MLSGPT | AI Real Estate Listing Description Generator",
    description:
      "Generate MLS descriptions, real estate social captions, email blasts, open house copy, and seller updates in one workflow."
  },
  twitter: {
    card: "summary_large_image",
    title: "MLSGPT | AI Real Estate Listing Description Generator",
    description: "MLS listing in. Full real-estate marketing pack out."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${serif.variable} bg-mesh text-ink antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
