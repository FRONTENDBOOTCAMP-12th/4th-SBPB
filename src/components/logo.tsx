import { tm } from '@/utils/tw-merge';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  w?: number;
  h?: number;
}

function Logo({ className = '', w = 100, h = 100 }: LogoProps) {
  return (
    <figure className={tm('flex justify-center', className)}>
      <Image src="/logo.svg" alt="로고" width={w} height={h} />
      <figcaption className="sr-only">로고</figcaption>
    </figure>
  );
}

export default Logo;
