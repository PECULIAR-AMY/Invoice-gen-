"use client";

import { useState } from "react";
import { useLogin } from "../queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {login.isError && <p className="text-red-500">{(login.error as Error).message}</p>}

      <Button onClick={() => login.mutate({ email, password })}>
        {login.isPending ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
}
