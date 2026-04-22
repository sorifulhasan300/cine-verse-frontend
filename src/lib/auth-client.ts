import { createAuthClient } from "better-auth/react";
import { env } from "./config";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_Backend_URL,

  additionalFields: {
    role: {
      type: ["user", "admin"],
      required: false,
      defaultValue: "user",
      input: false, // don't allow user to set role
    },
    lang: {
      type: "string",
      required: false,
      defaultValue: "en",
    },
  },
});
