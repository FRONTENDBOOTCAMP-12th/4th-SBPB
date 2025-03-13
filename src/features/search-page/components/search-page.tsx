import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { Ref, useImperativeHandle, useRef } from 'react';

interface SearchPageProps {
  ref?: Ref<{ focus: () => void }>;
}

function SearchInput({ ref }: SearchPageProps) {
  useImperativeHandle(ref, () => {
    const inputElement = inputRef.current;
    const focus = () => {
      if (inputElement) {
        inputElement.focus();
      }
    };
    return {
      focus,
    };
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <form>
        <div className={tm('flex', 'gap-[4px]')}>
          <div
            className={tm(
              'flex',
              'items-center',
              'grow-45',
              'gap-[5px]',
              'bg-[#E1E1E1]',
              'rounded-lg',
              'h-[40px]',
              'px-[12px]'
            )}
          >
            <Image
              src="/search-page-icon.svg"
              width={18}
              height={18}
              alt="검색"
              priority={true}
            />
            <input
              ref={inputRef}
              type="search"
              name="search"
              placeholder="검색"
              className={tm('w-full')}
            />
          </div>
          <button type="submit" className={tm('grow-1')}>
            <span>취소</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchInput;
