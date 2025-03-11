import { useSortStore } from '@/store/sort-store';

const FeedSortDropdown = () => {
  const { sortType, setSortType } = useSortStore();

  return (
    <div className="w-full pt-4 font-semibold text-sm">
      <label className="hidden">정렬 기준</label>
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value as 'latest' | 'popular')}
        className="hover:text-accent"
      >
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  );
};

export default FeedSortDropdown;
