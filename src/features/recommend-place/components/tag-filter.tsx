import { tm } from '@/utils/tw-merge';
import { SetStateAction } from 'react';

function TagFilter({
  tags,
  selectedTag,
  setSelectedTag,
}: {
  tags: string[];
  selectedTag: string;
  setSelectedTag: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <ul className="flex items-center gap-2 justify-center py-2">
      <li>
        <button
          onClick={() => setSelectedTag('전체보기')}
          type="button"
          className={tm(
            'py-1.5 px-2 border border-content-tertiary rounded-2xl text-content-tertiary text-xs',
            { 'bg-content-secondary text-white': selectedTag === '전체보기' }
          )}
        >
          전체보기
        </button>
      </li>
      {tags.map((tag) => (
        <li key={tag}>
          <button
            onClick={() => setSelectedTag(tag)}
            type="button"
            className={tm(
              'py-1.5 px-2 border border-content-tertiary rounded-2xl text-content-tertiary text-xs',
              { 'bg-content-secondary text-white': selectedTag === tag }
            )}
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TagFilter;
