"use client";

import Logo from "@/assets/logo.png";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const isAlreadyAuthenticated = isAuthenticated && user;
  
  return (
    <div className={`h-screen w-full bg-no-repeat bg-cover bg-center`}>
      <div className="grid place-items-center h-full p-10 text-center">
        <div className="flex flex-col space-y-5 items-center">
          <Image
            src={Logo}
            alt="SMCT Group of Companies Logo"
            width={300}
            height={300}
          />
          <h1 className="text-4xl font-extrabold text-white">
            Welcome to SMCT Group of Companies Ticketing System
          </h1>
          <p className="text-white text-2xl">
            The official website for SMCT Group of Companies Ticketing System
          </p>
          {isLoading ? (
            <div className="px-5 py-3 w-fit bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold text-sm">
              <Loader2 className="animate-spin" />
            </div>
          ) : isAlreadyAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-5 py-3 w-fit bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold text-sm"
            >
              Back to Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-5 py-3 w-fit bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold text-sm"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
