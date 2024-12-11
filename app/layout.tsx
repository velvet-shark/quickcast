import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import PlausibleProvider from "next-plausible";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "quickcast.dev",
  description: "Your guide to mastering Foundry's cast command-line tool"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.png" />
        <PlausibleProvider
          domain="quickcast.dev"
          selfHosted
          trackOutboundLinks
          customDomain="https://pls.velvetshark.com"
        />
      </head>
      <body className={`${geistMono.variable} antialiased h-full`}>
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
