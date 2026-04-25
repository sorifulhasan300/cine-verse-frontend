import type { BetterAuthSession } from "better-auth";
import { SubscriptionPlan } from "./user.types";

export type session = BetterAuthSession & {
  user: BetterAuthSession["user"] & {
    role?: string;
    plan?: SubscriptionPlan;
  };
};
