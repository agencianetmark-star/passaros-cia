import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublishableKey, requireEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const key = getSupabasePublishableKey();
  if (!key) {
    throw new Error("Variavel ausente: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (ou NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }
  return createBrowserClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    key
  );
}
