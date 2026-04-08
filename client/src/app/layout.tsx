import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import BaseLayout from "@/components/layout/base-layout";
import AuthContextProvider from "@/context/auth-context";
import { IsRefreshProvider } from "@/context/is-refresh-context";
import { SettingsProvider } from "@/context/settings-context";
import logo from "@/assets/logo.png";
import { ChatProvider } from "@/context/chat-context";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beta-ticketing.smctgroup.ph"),
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
        <AuthContextProvider>
          <ChatProvider>
            <IsRefreshProvider>
              <SettingsProvider>
                <BaseLayout>{children}</BaseLayout>
              </SettingsProvider>
            </IsRefreshProvider>
          </ChatProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
