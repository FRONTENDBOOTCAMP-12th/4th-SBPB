import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import Link from 'next/link';

interface SignLinkProps {
  label?: string;
  color?: 'black' | 'white';
  useImage?: boolean;
  kindImage?: 'google' | 'kakao' | 'email';
  href?: string;
  className?: string;
}

const images = {
  google: '/google-icon.svg',
  kakao: '/kakao-icon.svg',
  email: '/email-icon.svg',
};

function SignLink({
  label = '시작하기',
  color = 'black',
  useImage = false,
  kindImage = 'google',
  href = '#',
  className = '',
}: SignLinkProps) {
  const signLink =
    color === 'black' ? (
      <Link
        href={href}
        className={tm(
          'flex justify-center gap-2 w-[15.625rem] py-3 rounded-sm bg-content-primary text-white border border-white text-xs',
          className
        )}
      >
        {useImage && (
          <Image src={images[kindImage]} alt="google" width={18} height={18} />
        )}

        {label}
      </Link>
    ) : (
      <Link
        href={href}
        className={tm(
          'flex justify-center w-[15.625rem] py-3 rounded-sm bg-white text-content-primary  text-xs',
          className
        )}
      >
        {label}
      </Link>
    );

  return signLink;
}

export default SignLink;
