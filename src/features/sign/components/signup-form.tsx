'use client';

import { emailReg, idReg, pwReg } from '@/utils/regex/regex';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import SignButton from './sign-button';
import SignInput from './sign-input';
import { useAuthStore } from '@/store/auth-store';

function SignUpForm() {
  const supabase = createClient();
  const router = useRouter();

  const [error, setError] = useState<{ [key: string]: string }>({});
  const [userNickname, setUserNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState<string>('');

  const { saveAuth } = useAuthStore();

  const handleChangeInput = (
    setter: React.Dispatch<SetStateAction<string>>,
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setter(value);

    switch (field) {
      case 'id':
        setError((prev) => ({
          ...prev,
          [field]: idReg(value) ? '' : '올바른 아이디 값을 입력하세요',
        }));
        break;
      case 'email':
        setError((prev) => ({
          ...prev,
          [field]: emailReg(value) ? '' : '올바른 이메일 값을 입력하세요',
        }));
        break;
      case 'password':
        setError((prev) => ({
          ...prev,
          [field]: pwReg(value) ? '' : '올바른 비밀번호 값을 입력하세요',
        }));
        break;
      case 'passwordConfirm':
        setError((prev) => ({
          ...prev,
          [field]: userPassword === value ? '' : '같은 비밀번호를 입력하세요',
        }));
    }
  };

  const handleSubmitForm = async () => {
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: userEmail.toLowerCase().trim(),
        password: userPassword.trim(),
      });

      if (authError) {
        console.error(authError);
        throw new Error('올바른 가입 정보가 아닙니다.');
      }
      const userData = {
        userId: data.user?.id,
        userNickname,
        userEmail,
        userPassword,
        userPasswordConfirm,
      };

      saveAuth(userData);
      router.push('/signup/select-area');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="mx-auto w-[15.625rem] flex flex-col gap-2"
      action={handleSubmitForm}
    >
      <SignInput
        name="id"
        label="아이디"
        placeholder="8문자 이상, 숫자영문 조합"
        value={userNickname}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeInput(setUserNickname, 'id', e)
        }
        isLabelShow
      />
      {error.id && <p className="text-red-400 text-xs">{error.id}</p>}
      <SignInput
        type="email"
        name="email"
        label="이메일"
        value={userEmail}
        placeholder="인증 가능한 이메일 주소"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeInput(setUserEmail, 'email', e)
        }
        isLabelShow
      />
      {error.email && <p className="text-red-400 text-xs">{error.email}</p>}
      <SignInput
        type="password"
        name="password"
        label="비밀번호"
        value={userPassword}
        placeholder="8문자 이상, 특수문자 포함"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeInput(setUserPassword, 'password', e)
        }
        isLabelShow
      />
      {error.password && (
        <p className="text-red-400 text-xs">{error.password}</p>
      )}
      <SignInput
        type="password"
        name="passwordConfirm"
        label="비밀번호 확인"
        value={userPasswordConfirm}
        placeholder="같은 비밀번호를 입력해주세요"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeInput(setUserPasswordConfirm, 'passwordConfirm', e)
        }
        isLabelShow
      />
      {error.passwordConfirm && (
        <p className="text-red-400 text-xs">{error.passwordConfirm}</p>
      )}
      <SignButton
        type="submit"
        label="관심지역 선택"
        color="white"
        className="mt-10"
      />
    </form>
  );
}

export default SignUpForm;
