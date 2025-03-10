import { tm } from '@/utils/tw-merge';
import { FormEvent, useState } from 'react';

interface PlaceSearchProps {
    onSearch: (place: string) => void; 
}

function PlaceSearch({ onSearch }: PlaceSearchProps){
    const [inputValue, setInputValue] = useState("");

    
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        onSearch(inputValue.trim());
        setInputValue("");
    }
    return (
        <>
        <form onSubmit={handleSubmit}  className={tm('mb-[32px]')}>
          <label className="sr-only">장소 검색</label>
          <div className={tm('flex','border-black', 'border-[1px]', 'h-[40px]','rounded-lg', 'px-[12px]')}>
            <input type="search" name="place"  placeholder='원하는 지역을 검색해 보세요' className={tm('w-full','text-xs')} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
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
        </>
    )
}

export default PlaceSearch;