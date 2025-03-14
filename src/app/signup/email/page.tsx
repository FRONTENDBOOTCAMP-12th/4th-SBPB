import EmailSignUp from '@/features/sign/components/email-sign-up';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이메일로 가입하기',
};

function SignUpEmail() {
  return <EmailSignUp />;
}

export default SignUpEmail;
