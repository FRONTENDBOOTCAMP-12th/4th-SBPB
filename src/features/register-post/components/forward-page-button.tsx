'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ForwardPageButtonProps } from '../types/forward-page-button-props';

function ForwardPageButton({ link }: ForwardPageButtonProps) {
  const router = useRouter();

  const handleGoForward = () => {
    router.push(link);
  };

  return (
    <button onClick={handleGoForward} className="cursor-pointer">
      <Image src="/right.svg" width={46} height={46} alt="다음 페이지" />
    </button>
  );
}

export default ForwardPageButton;
