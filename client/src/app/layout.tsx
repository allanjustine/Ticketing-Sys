import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BaseLayout from "@/components/layout/base-layout";
import AuthContextProvider from "@/context/auth-context";
import { IsRefreshProvider } from "@/context/is-refresh-context";
import logo from "@/assets/logo.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SMCT Group of Companies Ticketing | Home",
    template: "SMCT Group of Companies Ticketing | %s",
  },
  description: "The official website for SMCT Group of Companies Ticketing",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SMCT Group of Companies Ticketing | Home",
    description: "The official website for SMCT Group of Companies Ticketing",
    images: [
      {
        url: logo.src,
        alt: "SMCT Logo",
      },
    ],
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
        className={`${geistSans.style} ${geistMono.style} antialiased max-h-screen scroll-smooth`}
      >
        <IsRefreshProvider>
          <AuthContextProvider>
            <BaseLayout>{children}</BaseLayout>
          </AuthContextProvider>
        </IsRefreshProvider>
      </body>
    </html>
  );
}
