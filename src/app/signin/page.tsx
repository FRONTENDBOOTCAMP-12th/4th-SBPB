import SignIn from '@/features/sign/components/sign-in';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
};

function SignInPage() {
  return <SignIn />;
}

export default SignInPage;
