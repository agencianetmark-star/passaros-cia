import { createClient } from "@supabase/supabase-js";

import { getSupabaseSecretKey, requireEnv } from "@/lib/env";

export function createSupabaseAdminClient() {
  const key = getSupabaseSecretKey();
  if (!key) {
    throw new Error("Variavel ausente: SUPABASE_SECRET_KEY (ou SUPABASE_SERVICE_ROLE_KEY)");
  }

  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}
