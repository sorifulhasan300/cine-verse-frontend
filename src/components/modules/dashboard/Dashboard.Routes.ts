import { UserRole } from "@/types/role.types";
import {
  LucideIcon,
  Home,
  User,
  Film,
  List,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

export interface DashboardRoute {
  path: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const dashboardRoutes: DashboardRoute[] = [
  // Common routes (accessible by both)
  {
    path: "/user",
    label: "Dashboard",
    icon: Home,
    roles: [UserRole.USER],
  },
  // User-only routes

  {
    path: "/user/watchlist",
    label: "Watchlist",
    icon: List,
    roles: [UserRole.USER],
  },
  {
    path: "/user/profile",
    label: "Profile",
    icon: User,
    roles: [UserRole.USER],
  },

  // Admin-only routes
  {
    path: "/admin",
    label: "Dashboard",
    icon: Home,
    roles: [UserRole.ADMIN],
  },

  {
    path: "/admin/movies",
    label: "Manage Movies",
    icon: Film,
    roles: [UserRole.ADMIN],
  },

  {
    path: "/admin/movie/category",
    label: "Create Movie Category",
    icon: Film,
    roles: [UserRole.ADMIN],
  },

  {
    path: "/admin/settings",
    label: "Settings",
    icon: Settings,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin/users",
    label: "Manage Users",
    icon: Users,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin/profile",
    label: "Profile",
    icon: User,
    roles: [UserRole.ADMIN],
  },
];

export const getRoutesForRole = (role: UserRole): DashboardRoute[] => {
  return dashboardRoutes.filter((route) => route.roles.includes(role));
};
