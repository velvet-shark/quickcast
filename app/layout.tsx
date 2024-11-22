import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "./components/Navigation";

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
  description: "Foundry's cast cheat sheet and toolbox"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <div className="min-h-full flex flex-col sm:flex-row dark:bg-[#1F1F1F]">
          <Navigation />
          <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
