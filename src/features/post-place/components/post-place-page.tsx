/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import MyPlaceList from './my-place-list';
import Link from 'next/link';
import SaveButton from './save-button';

export interface Place {
  category_group_name: string;
  road_address_name: string;
  place_name: string;
}

function PostPlacePage() {
  const searchParams = useSearchParams();
  const placesParam = searchParams.get('places');
  const initialPlaces: Place[] = placesParam ? JSON.parse(placesParam) : [];

  console.log(initialPlaces);

  return (
    <div className={tm('px-[17px]', 'pt-[24px]', 'relative')}>
      <button
        type="button"
        title="페이지 닫기"
        aria-label="페이지 닫기"
        className={tm('absolute', 'top-[12px]', 'right-[17px]')}
      >
        <Image
          src="/page-close-icon.svg"
          width={14}
          height={14}
          alt="페이지 닫기"
        />
      </button>
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
          selectedPlaces={initialPlaces}
          targetPath="/register-post/post-create"
          disabled={initialPlaces.length === 0}
        />
      </div>
    </div>
  );
}

export default PostPlacePage;
