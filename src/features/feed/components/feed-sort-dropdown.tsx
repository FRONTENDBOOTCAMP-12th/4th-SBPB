'use client';

import { useSortStore } from '@/store/sort-store';

const FeedSortDropdown = () => {
  const { sortType, setSortType } = useSortStore();

  return (
    <div className="w-full py-2 font-semibold text-sm border border-t-0 border-b-0 border-l-[#eee] border-r-[#eee]">
      <label className="sr-only" htmlFor="feed-sort-select">
        정렬 기준
      </label>
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value as 'latest' | 'popular')}
        className="hover:text-accent"
        id="feed-sort-select"
      >
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  );
};

export default FeedSortDropdown;
