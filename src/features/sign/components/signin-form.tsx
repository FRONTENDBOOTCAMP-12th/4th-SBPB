'use client';

import Link from 'next/link';
import SignInput from './sign-input';
import SignButton from './sign-button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function SignInForm() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error('계정이 없으시다면 회원가입을 진행해주세요.');

      if (data.session) {
        localStorage.setItem(
          'isAuth',
          JSON.stringify({
            accessToken: data.session?.access_token,
            email: data.user?.email,
          })
        );
        toast.success('로그인에 성공하였습니다.');

        router.push('/feed');
      }
    } catch (err) {
      toast.error('계정이 없으시다면 회원가입을 먼저 진행해주세요');
      console.error(err);
      router.refresh();
    }
  };

  const handleKaKaoLogin = async () => {
    try {
      const user = await supabase.auth.getUser();

      let options;

      if (user) {
        options = {
          redirectTo: `${window.location.origin}/feed`,
        };
      } else {
        options = {
          redirectTo: `${window.location.origin}/signup/select-area`,
        };
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options,
      });
      if (error) throw new Error('계정이 없습니다.');
    } catch (err) {
      toast.info(err as string);
    }
  };

  return (
    <form
      className="flex flex-col gap-2.5 w-[15.625rem] mx-auto"
      action={handleLogin}
    >
      <h2 className="text-white font-semibold text-[1.75rem] self-start">
        로그인
      </h2>
      <SignInput
        name="email"
        placeholder="이메일을 입력해주세요"
        label="이메일"
      />
      <SignInput
        name="password"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        label="비밀번호"
      />
      <div className="flex justify-end gap-2">
        <Link className="text-white text-xs" href={'#'}>
          아이디 찾기
        </Link>
        <Link className="text-white text-xs" href={'#'}>
          비밀번호 찾기
        </Link>
      </div>
      <SignButton color="white" label="로그인" type="submit" />
      <SignButton
        type="button"
        color="white"
        label="SNS로 로그인하기"
        onClick={handleKaKaoLogin}
      />
    </form>
  );
}

export default SignInForm;
