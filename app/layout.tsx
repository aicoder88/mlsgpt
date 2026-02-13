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
    default: "MLSGPT | MLS Listing to Marketing Pack in 60 Seconds",
    template: "%s | MLSGPT"
  },
  description:
    "Turn one MLS listing into high-converting descriptions, social posts, email blasts, and short video scripts automatically.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mlsgpt.com",
    siteName: "MLSGPT",
    title: "MLSGPT",
    description: "AI marketing engine for real-estate agents. Generate listing content instantly."
  },
  twitter: {
    card: "summary_large_image",
    title: "MLSGPT",
    description: "MLS listing in. Full marketing pack out."
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
