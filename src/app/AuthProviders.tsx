"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProviders({ children }: { children: React.ReactNode }) {
  // This SessionProvider is required for next-auth/react hooks to work
  return <SessionProvider>{children}</SessionProvider>;
}