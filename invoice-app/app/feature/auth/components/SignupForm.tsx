"use client";

import { useState } from "react";
import { useSignup } from "../queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const signup = useSignup();
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

      {signup.isError && <p className="text-red-500">{(signup.error as Error).message}</p>}

      <Button onClick={() => signup.mutate({ email, password })}>
        {signup.isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </div>
  );
}
