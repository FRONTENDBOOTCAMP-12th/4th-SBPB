import { useRouter } from 'next/navigation';
import SignButton from './sign-button';
import SignInput from './sign-input';
import { useAuthEmailStore } from '@/store/auth-Email-store';

function SignUpForm() {
  const router = useRouter();
  const { saveAuth } = useAuthEmailStore((s) => s);

  const handleSubmitForm = (formData: FormData) => {
    const userData = {
      userId: formData.get('id')?.toString() ?? '',
      userEmail: formData.get('email')?.toString() ?? '',
      userPassword: formData.get('password')?.toString() ?? '',
      userPasswordConfirm: formData.get('passwordConfirm')?.toString() ?? '',
    };

    saveAuth(userData);

    router.push('/signup/select-area');
  };

  return (
    <form
      className="mx-auto w-[15.625rem] flex flex-col gap-4"
      action={handleSubmitForm}
    >
      <SignInput
        name="id"
        label="아이디"
        placeholder="8문자 이상, 숫자영문 조합"
        isLabelShow
      />
      <SignInput
        type="email"
        name="email"
        label="이메일"
        placeholder="인증 가능한 이메일 주소"
        isLabelShow
      />
      <SignInput
        type="password"
        name="password"
        label="비밀번호"
        placeholder="8문자 이상, 특수문자 포함"
        isLabelShow
      />
      <SignInput
        type="password"
        name="passwordConfirm"
        label="비밀번호 확인"
        placeholder="같은 비밀번호를 입력해주세요"
        isLabelShow
      />
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
