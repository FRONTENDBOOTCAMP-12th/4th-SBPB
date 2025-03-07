
"use client";
import { tm } from '@/utils/tw-merge';
import { useEffect, useState } from 'react';


interface City {
    name: string,
    id: string
}

function PostPlace() {
  const [cities, setCities] = useState<City[]>([]);

  function handleSearch(formdata: FormData) {
    const place = formdata.get('place');
    if ((place as string).length === 0) return;

    const isDuplicated = cities.find((city) => city.name === String(place));

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
    return (
      <>
      <h2 className={tm('text-xl', 'mb-[12px]')}>글에 추가할 장소를 검색해 보세요</h2>
      <form action={handleSearch} className={tm('mb-[32px]')}>
        <label className="sr-only">장소 검색</label>
        <div className={tm('flex','border-black', 'border-[1px]', 'h-[40px]','rounded-lg', 'px-[12px]')}>
          <input type="search" name="place"  placeholder='원하는 지역을 검색해 보세요 ' className={tm('w-full')}/>
          <button
            type="submit"
            title="검색"
            aria-label='검색'
            className={tm(
              'cursor-pointer opacity-90'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 11H11.71L11.43 10.73C12.0549 10.0039 12.5117 9.14875 12.7675 8.22559C13.0234 7.30243 13.072 6.33413 12.91 5.38998C12.44 2.60998 10.12 0.389975 7.31997 0.0499748C6.33559 -0.0745594 5.33576 0.0277464 4.397 0.349064C3.45824 0.670381 2.60542 1.20219 1.90381 1.90381C1.20219 2.60542 0.670381 3.45824 0.349064 4.397C0.0277464 5.33576 -0.0745594 6.33559 0.0499748 7.31997C0.389975 10.12 2.60998 12.44 5.38998 12.91C6.33413 13.072 7.30243 13.0234 8.22559 12.7675C9.14875 12.5117 10.0039 12.0549 10.73 11.43L11 11.71V12.5L15.25 16.75C15.66 17.16 16.33 17.16 16.74 16.75C17.15 16.34 17.15 15.67 16.74 15.26L12.5 11ZM6.49997 11C4.00997 11 1.99997 8.98997 1.99997 6.49997C1.99997 4.00997 4.00997 1.99997 6.49997 1.99997C8.98997 1.99997 11 4.00997 11 6.49997C11 8.98997 8.98997 11 6.49997 11Z" fill="black"/>
            </svg>
          </button>
        </div>
      </form>
      <ul className="flex flex-col gap-2 my-2">
        {cities.map((city) => <li key={city.id} className="flex items-center justify-between bg-[#0D0E0F] px-[12px] h-[46px] border-1 border-slate-400 rounded-lg">
          <div className={tm('flex', 'gap-[7px]')}>
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 6.44225C0.75 10.0813 3.933 13.0903 5.34225 14.2438C5.54475 14.4088 5.646 14.4928 5.79675 14.5348C5.91375 14.5678 6.08625 14.5678 6.20325 14.5348C6.354 14.4928 6.45525 14.4095 6.65775 14.2438C8.067 13.0903 11.25 10.0813 11.25 6.44225C11.2493 5.75903 11.1131 5.08273 10.8492 4.45254C10.5853 3.82235 10.1989 3.2508 9.7125 2.771C8.72333 1.79528 7.38942 1.24878 6 1.25C4.61058 1.24878 3.27667 1.79528 2.2875 2.771C1.80106 3.25077 1.41468 3.82232 1.15076 4.45251C0.886835 5.08271 0.750617 5.75902 0.75 6.44225Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.5 5.75C4.5 6.14782 4.65804 6.52936 4.93934 6.81066C5.22064 7.09196 5.60218 7.25 6 7.25C6.39782 7.25 6.77936 7.09196 7.06066 6.81066C7.34196 6.52936 7.5 6.14782 7.5 5.75C7.5 5.35218 7.34196 4.97064 7.06066 4.68934C6.77936 4.40804 6.39782 4.25 6 4.25C5.60218 4.25 5.22064 4.40804 4.93934 4.68934C4.65804 4.97064 4.5 5.35218 4.5 5.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className={tm('text-xs', 'text-white')}>{city.name}</span>
            </div>
            <button type="submit" title="장소 삭제">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 10.5L7 7M7 7L3.5 3.5M7 7L10.5 3.5M7 7L3.5 10.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
        </li>)}
      </ul>
      </>
    );
  }
  
  export default PostPlace;
  