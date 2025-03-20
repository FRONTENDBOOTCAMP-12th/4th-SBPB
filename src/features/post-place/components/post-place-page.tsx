'use client';

import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import MyPlaceList from './my-place-list';
import Link from 'next/link';
import SaveButton from './save-button';
import CloseButton from './close-button';
import { Place } from '@/features/post-place/types/place-type';

function PostPlacePage() {
  const searchParams = useSearchParams();
  const placesParam = searchParams.get('places');
  const initialPlaces: Place[] = placesParam ? JSON.parse(placesParam) : [];

  return (
    <div className={tm('px-[17px]', 'pt-[24px]', 'relative')}>
      <CloseButton />
      <h2 className={tm('text-xl', 'mb-1')}>
        글에 추가할 장소를 검색해 보세요
      </h2>
      <Link href="/register-post/place-map">
        <div
          className={tm(
            'flex',
            'border-black',
            'border-[1px]',
            'h-[40px]',
            'rounded-lg',
            'px-[12px] mb-3 items-center bg-gray-100'
          )}
        >
          <div className={tm('w-full', 'text-xs', 'cursor-pointer ')}>
            지번, 도로명, 건물명으로 검색
          </div>

          <Image src="/search-bar-icon.svg" width={18} height={18} alt="검색" />
        </div>
      </Link>
      <MyPlaceList initialPlaces={initialPlaces} />
      <div
        className={tm(
          'fixed',
          'bottom-[78px]',
          'left-[0px]',
          'right-[0px]',
          'px-[17px]'
        )}
      >
        <SaveButton
          targetPath="/register-post/post-create"
          disabled={initialPlaces.length === 0}
        />
      </div>
    </div>
  );
}

export default PostPlacePage;
