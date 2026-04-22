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
    path: "/user/my-movies",
    label: "My Movies",
    icon: Film,
    roles: [UserRole.USER],
  },
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
    path: "/admin/user-management",
    label: "User Management",
    icon: Users,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin/movie-management",
    label: "Movie Management",
    icon: Film,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin/settings",
    label: "Settings",
    icon: Settings,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin/profile",
    label: "Profile",
    icon: User,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/admin",
    label: "Dashboard",
    icon: Home,
    roles: [UserRole.ADMIN],
  },
];

export const getRoutesForRole = (role: UserRole): DashboardRoute[] => {
  return dashboardRoutes.filter((route) => route.roles.includes(role));
};
