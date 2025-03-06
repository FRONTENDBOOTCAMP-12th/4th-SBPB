import { tm } from '@/utils/tw-merge';
import Image from 'next/image';

interface SignButtonProps {
  label?: string;
  color?: 'black' | 'white';
  useImage?: boolean;
  kindImage?: 'google' | 'kakao' | 'email';
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

const images = {
  google: '/google-icon.svg',
  kakao: '/kakao-icon.svg',
  email: '/email-icon.svg',
};

function SignButton({
  label = '시작하기',
  color = 'black',
  useImage = false,
  kindImage = 'google',
  type = 'button',
  className = '',
}: SignButtonProps) {
  const signButton =
    color === 'black' ? (
      <button
        type={type}
        className={tm(
          'flex justify-center gap-2 w-[15.625rem] py-3 rounded-sm bg-content-primary text-white border border-white text-xs',
          className
        )}
      >
        {useImage && (
          <Image src={images[kindImage]} alt="google" width={18} height={18} />
        )}

        {label}
      </button>
    ) : (
      <button
        type={type}
        className={tm(
          'flex justify-center w-[15.625rem] py-3 rounded-sm bg-white text-content-primary  text-xs',
          className
        )}
      >
        {label}
      </button>
    );

  return signButton;
}

export default SignButton;
