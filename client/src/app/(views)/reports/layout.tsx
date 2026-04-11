import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "The official reports page for the SMCT Group of Companies Ticketing website.",
  openGraph: {
    title: "Reports",
    description:
      "The official reports page for the SMCT Group of Companies Ticketing website.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
