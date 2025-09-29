import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/contexts/TranslationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMG Agents",
  description: "OMG Agents - Your trusted partner for innovative solutions",
  icons: {
    icon: [
      { url: "/URL ICO.ico", sizes: "any" },
      { url: "/URL ICO.ico", type: "image/x-icon" },
    ],
    shortcut: "/URL ICO.ico",
    apple: "/URL ICO.ico",
  },
  openGraph: {
    title: "OMG Agents - AI Solutions for SMEs",
    description: "OMG Agents provides customized AI solutions for small and medium enterprises, combining proprietary algorithms with personal consultation to drive business growth.",
    url: "https://omgagents.ai",
    siteName: "OMG Agents",
    images: [
      {
        url: "/omg-logo-original.svg",
        width: 1200,
        height: 630,
        alt: "OMG Agents - AI Solutions for SMEs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMG Agents - AI Solutions for SMEs",
    description: "OMG Agents provides customized AI solutions for small and medium enterprises, combining proprietary algorithms with personal consultation to drive business growth.",
    images: ["/omg-logo-original.svg"], // Same image for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
