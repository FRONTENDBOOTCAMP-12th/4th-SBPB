import { createClient } from '@/utils/supabase/client';

export async function googleSignIn() {
  try {
    const supabase = createClient();

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/signup/select-area`,
      },
    });

    if (googleError) {
      console.error(googleError);
      return;
    }
  } catch (err) {
    console.error(err);
  }
}
