import Link from 'next/link';
import SignInput from './sign-input';
import SignButton from './sign-button';

function SignInForm() {
  return (
    <form className="flex flex-col gap-2.5 w-[15.625rem] mx-auto">
      <h1 className="text-white font-semibold text-[1.75rem] self-start">
        로그인
      </h1>
      <SignInput name="id" placeholder="아이디를 입력해주세요" label="아이디" />
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
      <SignButton color="white" label="로그인" />
    </form>
  );
}

export default SignInForm;
