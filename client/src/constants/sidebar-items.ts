import {
  Building,
  FileUserIcon,
  Home,
  LayoutDashboard,
  MessageCircle,
  Notebook,
  ShieldUserIcon,
  TicketCheck,
  Truck,
  UserCog2,
  UserLock,
  Users2,
  UserSearch,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  { title: "Dashboard", url: "/dashboard", icon: Home, isAudit: false },
  { title: "Dashboard", url: "/audit-dashboard", icon: Home, isAudit: true },
  { title: "Tickets", url: "/tickets", icon: TicketCheck, isAudit: false },
  { title: "Reports", url: "/reports", icon: Notebook, isAudit: false },
  { title: "Chats", url: "/chats", icon: MessageCircle, isAudit: false },
  { title: "Chats", url: "/chats", icon: MessageCircle, isAudit: true },
];

export const COLLAPSABLE_SIDEBAR_ITEMS = [
  { title: "Branches", url: "/admin/branches", icon: Building },
  { title: "Categories", url: "/admin/categories", icon: LayoutDashboard },
  { title: "Suppliers", url: "/admin/suppliers", icon: Truck },
  { title: "Users", url: "/admin/users", icon: Users2 },
  { title: "Automations", url: "/admin/automations", icon: UserCog2 },
  { title: "Accountings", url: "/admin/accountings", icon: UserSearch },
  { title: "CAS", url: "/admin/cas", icon: FileUserIcon },
  { title: "Area Managers", url: "/admin/area-managers", icon: ShieldUserIcon },
  { title: "User Roles", url: "/admin/user-roles", icon: UserLock },
];
