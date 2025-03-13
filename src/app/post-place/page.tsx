import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { useState } from 'react';
import PlaceSearch from '../../features/post-place/components/place-search';
import MyPlaceList from '../../features/post-place/components/my-place-list';

export interface City {
  name: string;
  id: string;
}

function PostPlace() {
  const [cities, setCities] = useState<City[]>([]);

  function handleSearch(place: string) {
    if (!place) return;

    //const place = formdata.get('place');
    //if ((place as string).length === 0) return;
    //const isDuplicated = cities.find((city) => city.name === String(place));
    const isDuplicated = cities.find((city) => city.name === place);
    if (isDuplicated) return;

    setCities((prev) => {
      return [
        ...prev,
        {
          name: String(place),
          id: crypto.randomUUID(),
        },
      ];
    });
  }

  function handleDelete(id: string) {
    setCities((prevCities) => {
      return prevCities.filter((city) => city.id !== id);
    });
  }

  function handlePlaceAllDelete() {
    return setCities([]);
  }

  return (
    <>
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
            priority={true}
          />
        </button>
        <h2 className={tm('text-xl', 'mb-[12px]')}>
          글에 추가할 장소를 검색해 보세요
        </h2>
        <PlaceSearch onSearch={handleSearch} />
        <div className={tm('flex', 'justify-between')}>
          <p>
            내 장소{' '}
            <span className={tm('text-[#8DB0F9]')}>{cities.length}</span>
          </p>
          <button
            type="button"
            title="장소 전체 삭제"
            aria-label="장소 전체 삭제"
            onClick={() => handlePlaceAllDelete()}
            className={tm('text-xs', 'text-[#6B6B6B]')}
          >
            전체 삭제
          </button>
        </div>
        <MyPlaceList cities={cities} onDelete={handleDelete} />

        <div
          className={tm(
            'fixed',
            'bottom-[78px]',
            'left-[0px]',
            'right-[0px]',
            'px-[17px]'
          )}
        >
          <button
            type="submit"
            title="저장하기"
            aria-label="저장하기"
            className={tm(
              'w-full',
              'flex',
              'items-center',
              'justify-center',
              'gap-[7px]',
              'bg-[#0D0E0F]',
              'h-[46px]',
              'rounded-lg'
            )}
          >
            <Image
              src="/white-pen-icon.svg"
              width={14}
              height={14}
              alt="저장하기"
              priority={true}
            />
            <span className={tm('text-xs', 'text-white')}>
              이대로 저장할래요
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default PostPlace;
