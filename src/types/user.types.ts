import { UserRole } from "./role.types";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum SubscriptionPlan {
  FREE = "FREE",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}
export type UserType = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null | undefined;
  plan?: SubscriptionPlan | null;
  currentPeriodEnd?: Date | null;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  status?: UserStatus;
};
