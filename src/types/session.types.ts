import { SubscriptionPlan } from "./user.types";

export type session = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    plan?: SubscriptionPlan;
  };
  session?: any;
};
