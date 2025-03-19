'use client';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

interface PlaceSearchProps {
  onSearch: (place: string) => void;
}

function PlaceSearch({ onSearch }: PlaceSearchProps) {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(inputValue.trim());
    setInputValue('');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="sr-only">장소 검색</label>
        <div
          className={tm(
            'flex',
            'border-black',
            'border-[1px]',
            'h-[40px]',
            'rounded-lg',
            'px-[12px]'
          )}
        >
          <input
            type="search"
            name="place"
            placeholder="지번,도로명,건물명으로 검색"
            className={tm('w-full', 'text-xs')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            title="검색"
            aria-label="검색"
            className={tm('cursor-pointer opacity-90')}
          >
            <Image
              src="/search-bar-icon.svg"
              width={18}
              height={18}
              alt="검색"
              priority={true}
            />
          </button>
        </div>
      </form>
    </>
  );
}

export default PlaceSearch;
