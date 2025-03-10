
"use client";
import { tm } from '@/utils/tw-merge';
import { useState } from 'react';
import PlaceSearch from '../../features/post-place/components/place-search';
import MyPlaceList from '../../features/post-place/components/my-place-list';

export interface City {
    name: string,
    id: string
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

  function handlePlaceAllDelete(){
    return setCities([])
  }
  
    return (
      <>
      
      <div className={tm('px-[17px]', 'pt-[24px]', 'relative')}>
        <button type="button" title="페이지 닫기" aria-label='페이지 닫기' className={tm('absolute','top-[12px]', 'right-[17px]')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 13L7 7M7 7L1 1M7 7L13 1M7 7L1 13" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <h2 className={tm('text-xl', 'mb-[12px]')}>글에 추가할 장소를 검색해 보세요</h2>
        <PlaceSearch onSearch={handleSearch} />
        <div className={tm('flex', 'justify-between')}>
          <p>내 장소 <span className={tm('text-[#8DB0F9]')}>{cities.length}</span></p>
          <button type="button" title="장소 전체 삭제" aria-label="장소 전체 삭제" onClick={() => handlePlaceAllDelete()} className={tm('text-xs','text-[#6B6B6B]')}>전체 삭제</button>
        </div>
        <MyPlaceList
          cities={cities}
          onDelete={handleDelete}
        />
        
        <button type="submit" title="저장하기" aria-label="저장하기" className={tm('fixed','bottom-[78px]','w-[96.5%]','flex','items-center','justify-center', 'gap-[7px]','bg-[#0D0E0F]','h-[46px]','rounded-lg')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 7L4 13H1V10L7 4L9.15175 1.84825L9.1525 1.8475C9.44875 1.55125 9.59725 1.40275 9.76825 1.34725C9.91887 1.29831 10.0811 1.29831 10.2318 1.34725C10.4028 1.40275 10.5505 1.55125 10.8467 1.84675L12.1517 3.15175C12.4487 3.44875 12.5973 3.59725 12.6528 3.76825C12.7017 3.91888 12.7017 4.08113 12.6528 4.23175C12.5973 4.40275 12.4487 4.55125 12.1517 4.84825L10 7.00075L7 4.00075" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span className={tm('text-xs', 'text-white')}>이대로 저장할래요</span>
        </button>
      </div>
      </>
    );
  }
  
  export default PostPlace;
  