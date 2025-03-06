'use client';

import Image from 'next/image';
import Plus from './plus';
import { useState } from 'react';
import { tm } from '../utils/tw-merge';
import Checked from './checked';

function AreaCard() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleCardClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const bgColor = isClicked ? 'bg-gray-200' : 'bg-white';

  return (
    <button
      className={tm(
        'rounded-sm size-[5.625rem] content-center relative',
        bgColor
      )}
      onClick={handleCardClick}
      aria-pressed={isClicked}
    >
      <div className="flex flex-col items-center gap-2 mt-2.5">
        <Image
          src="/cities/jeju.webp"
          alt="제주도"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
        <h2 className="text-content-primary text-xs font-semibold">제주도</h2>
        {isClicked ? (
          <Checked className="absolute top-1 right-1 flex flex-col justify-center items-center bg-content-primary rounded-full p-0.5" />
        ) : (
          <Plus className="absolute top-1 right-1 flex flex-col justify-center items-center bg-content-primary rounded-full p-0.5" />
        )}
      </div>
    </button>
  );
}

export default AreaCard;
