import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3007";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Forge – Launch tokens beautifully",
  description:
    "A modern, glassy launchpad. Launch tokens in minutes with gorgeous UI and powerful tools.",
  openGraph: {
    title: "Forge – Launch tokens beautifully",
    description:
      "A modern, glassy launchpad. Launch tokens in minutes with gorgeous UI and powerful tools.",
    images: ["/images/meta/start-your-cult.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge – Launch tokens beautifully",
    description:
      "A modern, glassy launchpad. Launch tokens in minutes with gorgeous UI and powerful tools.",
    images: ["/images/meta/start-your-cult.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased bg-[var(--bg)] text-[var(--text)]`}>
        <div className="forge-gradient" />
        <Header />
        {children}
      </body>
    </html>
  );
}
