import { createClient } from '@/utils/supabase/client';

export async function kakaoSignIn() {
  try {
    const supabase = createClient();

    const { error: kakaoError } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/signup/select-area`,
      },
    });

    if (kakaoError) {
      console.error(kakaoError);
      return;
    }
  } catch (err) {
    console.error(err);
  }
}
