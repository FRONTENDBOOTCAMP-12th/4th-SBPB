'use client';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { useEffect } from 'react';
import { usePlacesStore } from '@/store/user-place-store';

interface Place {
  road_address_name: string;
  place_name: string;
}

interface MyPlaceListProps {
  initialPlaces: Place[];
}

function MyPlaceList({ initialPlaces }: MyPlaceListProps) {
  // Zustand로 관리되는 places 상태
  const { places, setPlaces, removePlace, deleteAllPlaces } = usePlacesStore();

  // 초기 장소 설정 (useEffect에서 초기 값 설정)
  useEffect(() => {
    if (initialPlaces.length > 0) {
      setPlaces(initialPlaces); // 초기 데이터를 zustand 상태에 설정
    }
  }, [initialPlaces, setPlaces]);

  // 삭제 처리 함수
  function handleDelete(placeName: string) {
    removePlace(placeName);
  }

  // 전체 삭제 처리 함수
  function handlePlaceAllDelete() {
    deleteAllPlaces();
  }

  return (
    <>
      <div className={tm('flex', 'justify-between')}>
        <p>
          내 장소 <span className={tm('text-[#8DB0F9]')}>{places.length}</span>
        </p>
        <button
          type="button"
          title="장소 전체 삭제"
          aria-label="장소 전체 삭제"
          onClick={handlePlaceAllDelete}
          className={tm('text-xs', 'text-[#6B6B6B]')}
        >
          전체 삭제
        </button>
      </div>
      <ul className="flex flex-col gap-2 my-2">
        {places.map((place, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-[#0D0E0F] px-[12px] h-[46px] border-1 border-slate-400 rounded-lg"
          >
            <div className={tm('flex', 'gap-[7px]')}>
              <Image
                src="/map-icon.svg"
                width={12}
                height={12}
                alt="장소 검색"
              />
              <span className={tm('text-xs', 'text-white')}>
                {place.place_name}
              </span>
            </div>
            <button
              type="button"
              title="장소 삭제"
              aria-label="장소 삭제"
              onClick={() => handleDelete(place.place_name)}
            >
              <Image
                src="/close-icon.svg"
                width={14}
                height={14}
                alt="장소 삭제"
              />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MyPlaceList;
