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
    path: "/dashboard",
    label: "Dashboard",
    icon: Home,
    roles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
    icon: User,
    roles: [UserRole.USER, UserRole.ADMIN],
  },

  // User-only routes
  {
    path: "/dashboard/my-movies",
    label: "My Movies",
    icon: Film,
    roles: [UserRole.USER],
  },
  {
    path: "/dashboard/watchlist",
    label: "Watchlist",
    icon: List,
    roles: [UserRole.USER],
  },

  // Admin-only routes
  {
    path: "/dashboard/user-management",
    label: "User Management",
    icon: Users,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/dashboard/movie-management",
    label: "Movie Management",
    icon: Film,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
    roles: [UserRole.ADMIN],
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    roles: [UserRole.ADMIN],
  },
];

export const getRoutesForRole = (role: UserRole): DashboardRoute[] => {
  return dashboardRoutes.filter((route) => route.roles.includes(role));
};
