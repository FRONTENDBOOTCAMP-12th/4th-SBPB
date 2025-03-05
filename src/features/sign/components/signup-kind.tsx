import Logo from '@/components/logo';
import SignButton from './sign-button';

function SignUpKind() {
  return (
    <div className="absolute inset-x-0 inset-y-16">
      <Logo w={178} h={101} className="mb-20" />
      <div className="w-[15.625rem] mx-auto flex flex-col gap-7">
        <h1 className="text-white font-semibold text-[1.75rem] self-start my-5">
          회원가입
        </h1>
        <SignButton useImage kindImage="google" label="구글로 가입하기" />
        <SignButton useImage kindImage="kakao" label="카카오로 가입하기" />
        <SignButton useImage kindImage="email" label="이메일로 가입하기" />
      </div>
    </div>
  );
}

export default SignUpKind;
