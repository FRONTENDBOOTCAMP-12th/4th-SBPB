'use client';

import Image from 'next/image';
import { tm } from '@/utils/tw-merge';
import { useRouter } from 'next/navigation';

function CloseButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      title="페이지 닫기"
      aria-label="페이지 닫기"
      className={tm('absolute', 'top-[12px]', 'right-[17px]')}
      onClick={handleGoBack}
    >
      <Image
        src="/page-close-icon.svg"
        width={14}
        height={14}
        alt="페이지 닫기"
      />
    </button>
  );
}

export default CloseButton;
