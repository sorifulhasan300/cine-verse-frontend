import { UserRole } from "./role.types";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  status?: UserStatus;
};
