'use client';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';

function CommentProfile() {
  return (
    <li className={tm('min-h-[74px]')}>
      <figure className={tm('flex', 'gap-[10px]')}>
        <picture>
          <Image
            src="./thum-img.svg"
            width={49}
            height={48}
            alt="사용자 이미지"
            priority={true}
          />
        </picture>
        <figcaption>
          <span>망나뇽</span>
          <p className={tm('text-xs')}>
            저런 음료가 있었나요? 제가 갔을 땐 없던데...
          </p>
          <button className={tm('text-xs', 'text-[#6B6B6B]')}>답글 1개</button>
        </figcaption>
      </figure>
      <ul className={tm('pl-[50px]')}>
        <li className={tm('min-h-[55px]')}>
          <figure className={tm('flex items-center gap-[10px]')}>
            <picture>
              <Image
                src="./thum-img-03.svg"
                width={32}
                height={32}
                alt="사용자 이미지"
                priority={true}
              />
            </picture>
            <figcaption>
              <span className={tm('text-xs')}>마자용</span>
              <p className={tm('text-xs')}>악플 달지 마세요;;</p>
            </figcaption>
          </figure>
        </li>
      </ul>
    </li>
  );
}

export default CommentProfile;
