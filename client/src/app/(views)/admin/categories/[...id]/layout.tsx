import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sub categories",
  description:
    "The official sub categories page for the SMCT Group of Companies Ticketing website.",
  openGraph: {
    title: "Sub categories",
    description:
      "The official sub categories page for the SMCT Group of Companies Ticketing website.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
