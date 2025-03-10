'use client';

import { memo } from 'react';
import { useSortStore } from '@/store/sort-store';

const FeedSortDropdown = memo(function FeedSortDropdown() {
  const { sortType, setSortType } = useSortStore();

  return (
    <div className="w-full pt-4 font-semibold text-sm">
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value as 'latest' | 'popular')}
      >
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  );
});

export default FeedSortDropdown;
