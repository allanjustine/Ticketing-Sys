"use client";

import { ReactNode, Suspense } from "react";
import { useAuth } from "@/context/auth-context";
import AppLayout from "./app-layout";
import AuthLayout from "./auth-layout";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

export default function BaseLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const isAlreadyAuthenticated = isAuthenticated && user;
  const pathname = usePathname();
  const isNotHome = pathname !== "/";

  return (
    <>
      <Suspense fallback={"Loading..."}>
        {isAlreadyAuthenticated && isNotHome ? (
          <SidebarProvider>
            <AppLayout>{children}</AppLayout>
          </SidebarProvider>
        ) : (
          <AuthLayout>{children}</AuthLayout>
        )}
      </Suspense>
      <Toaster />
    </>
  );
}
