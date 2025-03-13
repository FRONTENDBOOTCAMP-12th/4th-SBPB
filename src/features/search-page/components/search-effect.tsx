'use client';
import { tm } from '@/utils/tw-merge';
import { useEffect, useRef } from 'react';
import SearchInput from './search-page';

function SearchPageEffect() {
  const searchFormRef = useRef<{
    focus: () => void;
  }>(null);

  useEffect(() => {
    const clearId = setTimeout(() => {
      const handles = searchFormRef.current;
      if (handles) {
        handles.focus();
      }
    }, 900);

    return () => {
      clearTimeout(clearId);
    };
  });
  return (
    <>
      <div className={tm('px-[14px]')}>
        <SearchInput ref={searchFormRef} />
      </div>
    </>
  );
}

export default SearchPageEffect;
