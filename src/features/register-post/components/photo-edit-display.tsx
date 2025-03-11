'use client';

import Image from 'next/image';
import { PhotoProps } from '../types/photo-props';

function PhotoEditDisPlay({ src }: PhotoProps) {
  return (
    <div className="w-full h-[40vh] overflow-hidden relative">
      <Image
        src={src}
        alt="선택된 사진 디스플레이"
        fill={true}
        style={{ objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  );
}

export default PhotoEditDisPlay;
