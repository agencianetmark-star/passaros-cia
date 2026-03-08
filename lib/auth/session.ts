import { headers } from "next/headers";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_USER_ID } from "@/lib/services/mock-data";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
}

export async function getCurrentUser(): Promise<SessionUser> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user) {
      return {
        id: data.user.id,
        email: data.user.email ?? "user@supabase.local",
        fullName:
          (data.user.user_metadata?.full_name as string | undefined) ??
          (data.user.user_metadata?.name as string | undefined) ??
          "Criador"
      };
    }
  } catch {
    // fallback para ambiente sem Supabase configurado
  }

  const requestHeaders = await headers();
  const userId = requestHeaders.get("x-user-id") ?? DEMO_USER_ID;

  return {
    id: userId,
    email: "criador@demo.local",
    fullName: "Criador Demo"
  };
}
