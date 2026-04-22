export type session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  };
  session: {
    id: string;
    expiresAt: string;
  };
};
