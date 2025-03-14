import { createClient } from '@/utils/supabase/client';

export async function getUser() {
  const supabase = createClient();

  return await supabase.auth.getUser();
}
