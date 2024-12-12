import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import PlausibleProvider from "next-plausible";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "QuickCast | Foundry Cast Command Explorer",
  description:
    "Your guide to mastering Foundry's cast command-line tool. Interactive documentation, examples, and browser-based execution.",
  metadataBase: new URL("https://quickcast.dev"),
  openGraph: {
    title: "QuickCast | Foundry Cast Command Explorer",
    description:
      "Your guide to mastering Foundry's cast command-line tool. Interactive documentation, examples, and browser-based execution.",
    type: "website",
    url: "https://quickcast.dev",
    siteName: "QuickCast",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuickCast - Foundry Cast Command Explorer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCast | Foundry Cast Command Explorer",
    description:
      "Your guide to mastering Foundry's cast command-line tool. Interactive documentation, examples, and browser-based execution.",
    images: ["/og-image.png"],
    creator: "@velvet_shark"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <PlausibleProvider
          domain="quickcast.dev"
          selfHosted
          trackOutboundLinks
          customDomain="https://pls.velvetshark.com"
        />
      </head>
      <body className={`${geistMono.variable} antialiased h-full`} suppressHydrationWarning>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col sm:flex-row flex-1">
            <Navigation />
            <main className="flex-1 w-full overflow-x-hidden">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
