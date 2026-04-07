"use client";

import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/auth-context";
import { useSettings } from "@/context/settings-context";
import nameShortHand from "@/utils/name-short-hand";
import Storage from "@/utils/storage";
import Link from "next/link";
import Swal from "sweetalert2";
import { ROLE } from "@/constants/roles";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const { setIsOpen } = useSettings();
  const isAudit = user?.user_role?.role_name === ROLE.AUDIT;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logged me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7 cursor-pointer">
          <AvatarImage src={Storage(user?.user_detail?.profile_pic)} />
          <AvatarFallback className="font-bold text-sm">
            {nameShortHand(user?.full_name ?? "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-semibold text-sm">{user?.full_name}</span>
          <span className="text-xs text-muted-foreground font-normal truncate">
            {user?.user_detail?.user_email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isAudit && (
          <DropdownMenuItem className="cursor-pointer gap-2" asChild>
            <Link href={"/profile"}>
              <User className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
