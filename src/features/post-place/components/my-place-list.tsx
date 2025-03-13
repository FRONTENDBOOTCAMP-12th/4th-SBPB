import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { City } from '@/features/post-place/types/city-type';

interface MyPlaceListProps {
  cities: City[];
  onDelete: (id: string) => void;
}

function MyPlaceList({ cities, onDelete }: MyPlaceListProps) {
  return (
    <>
      <ul className="flex flex-col gap-2 my-2">
        {cities.map((city) => (
          <li
            key={city.id}
            className="flex items-center justify-between bg-[#0D0E0F] px-[12px] h-[46px] border-1 border-slate-400 rounded-lg"
          >
            <div className={tm('flex', 'gap-[7px]')}>
              <Image
                src="/map-icon.svg"
                width={12}
                height={12}
                alt="장소 검색"
                priority={true}
              />
              <span className={tm('text-xs', 'text-white')}>{city.name}</span>
            </div>
            <button
              type="submit"
              title="장소 삭제"
              aria-label="장소 삭제"
              onClick={() => onDelete(city.id)}
            >
              <Image
                src="/close-icon.svg"
                width={14}
                height={14}
                alt="장소 삭제"
                priority={true}
              />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MyPlaceList;
