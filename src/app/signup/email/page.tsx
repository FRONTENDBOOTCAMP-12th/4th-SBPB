import Logo from '@/components/logo';
import SignUpForm from '@/features/sign/components/signup-form';

function SignUpEmail() {
  return (
    <div className="absolute inset-x-0 inset-y-16">
      <Logo w={178} h={101} className="mb-20" />
      <SignUpForm />
    </div>
  );
}

export default SignUpEmail;
