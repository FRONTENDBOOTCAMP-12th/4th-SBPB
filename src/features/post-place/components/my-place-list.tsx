import { tm } from '@/utils/tw-merge';
import { City } from '@/features/post-place/types/city-type';

interface MyPlaceListProps {
    cities: City[];
    onDelete: (id: string) => void; 
}

function MyPlaceList({ cities, onDelete }: MyPlaceListProps){
    return(
        <>
        <ul className="flex flex-col gap-2 my-2">
          {cities.map((city) => <li key={city.id} className="flex items-center justify-between bg-[#0D0E0F] px-[12px] h-[46px] border-1 border-slate-400 rounded-lg">
            <div className={tm('flex', 'gap-[7px]')}>
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.75 6.44225C0.75 10.0813 3.933 13.0903 5.34225 14.2438C5.54475 14.4088 5.646 14.4928 5.79675 14.5348C5.91375 14.5678 6.08625 14.5678 6.20325 14.5348C6.354 14.4928 6.45525 14.4095 6.65775 14.2438C8.067 13.0903 11.25 10.0813 11.25 6.44225C11.2493 5.75903 11.1131 5.08273 10.8492 4.45254C10.5853 3.82235 10.1989 3.2508 9.7125 2.771C8.72333 1.79528 7.38942 1.24878 6 1.25C4.61058 1.24878 3.27667 1.79528 2.2875 2.771C1.80106 3.25077 1.41468 3.82232 1.15076 4.45251C0.886835 5.08271 0.750617 5.75902 0.75 6.44225Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.5 5.75C4.5 6.14782 4.65804 6.52936 4.93934 6.81066C5.22064 7.09196 5.60218 7.25 6 7.25C6.39782 7.25 6.77936 7.09196 7.06066 6.81066C7.34196 6.52936 7.5 6.14782 7.5 5.75C7.5 5.35218 7.34196 4.97064 7.06066 4.68934C6.77936 4.40804 6.39782 4.25 6 4.25C5.60218 4.25 5.22064 4.40804 4.93934 4.68934C4.65804 4.97064 4.5 5.35218 4.5 5.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className={tm('text-xs', 'text-white')}>{city.name}</span>
              </div>
              <button type="submit" title="장소 삭제" aria-label="장소 삭제" onClick={() => onDelete(city.id)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 10.5L7 7M7 7L3.5 3.5M7 7L10.5 3.5M7 7L3.5 10.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
          </li>)}
        </ul>
        </>
    )
}

export default MyPlaceList;