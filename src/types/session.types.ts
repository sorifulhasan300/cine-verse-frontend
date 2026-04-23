import type { BetterAuthSession } from "better-auth";

export type session = BetterAuthSession & {
  user: BetterAuthSession["user"] & {
    role?: string;
  };
};
