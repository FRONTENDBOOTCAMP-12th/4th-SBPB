import SignUp from '@/features/sign/components/sign-up';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
};

function SignUpPage() {
  return <SignUp />;
}

export default SignUpPage;
