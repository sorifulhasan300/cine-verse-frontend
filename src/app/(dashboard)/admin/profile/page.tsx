import React from "react";
import { getCurrentUser } from "@/lib/auth-session";
import ProfileCard from "@/components/modules/dashboard/ProfileCard";

export default async function AdminProfilePage() {
  const session = await getCurrentUser();

  if (!session?.user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <ProfileCard user={session.user} variant="admin" />
    </div>
  );
}
