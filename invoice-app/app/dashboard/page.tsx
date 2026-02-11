"use client";

import { useLogout } from "@/app/feature/auth/queries";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const logout = useLogout();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <Button onClick={() => logout.mutate()}>Logout</Button>
    </div>
  );
}
