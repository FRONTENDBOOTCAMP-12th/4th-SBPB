import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 `setAll`이 호출될 경우,
            // Next.js의 제한으로 인해 쿠키 설정이 적용되지 않을 수 있음.
            // 만약 미들웨어에서 세션을 관리하고 있다면, 이 오류를 무시해도 됨.
          }
        },
      },
    }
  );
}
