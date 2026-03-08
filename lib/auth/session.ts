import { headers } from "next/headers";

import { DEMO_USER_ID } from "@/lib/services/mock-data";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
}

export async function getCurrentUser(): Promise<SessionUser> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("x-user-id") ?? DEMO_USER_ID;

  return {
    id: userId,
    email: "criador@demo.local",
    fullName: "Criador Demo"
  };
}
