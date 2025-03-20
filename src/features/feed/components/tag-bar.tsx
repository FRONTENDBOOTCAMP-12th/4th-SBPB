'use client';

import { tm } from '@/utils/tw-merge';

interface TagBarProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

interface TagTypes {
  id: string;
  value: string;
  label: string;
}

const Tags: TagTypes[] = [
  { id: 'tag-all', value: 'all', label: '전체' },
  { id: 'tag-cafe', value: '카페', label: '카페' },
  { id: 'tag-summer', value: '여름', label: '여름' },
  { id: 'tag-korean', value: '한식', label: '한식' },
  { id: 'tag-food', value: '맛집', label: '맛집' },
];

function TagBar({ selectedTag, setSelectedTag }: TagBarProps) {
  return (
    <fieldset className="w-full bg-[#eeeeee]">
      <legend className="sr-only">태그 선택</legend>

      <div
        role="radiogroup"
        aria-labelledby="tag-label"
        className={tm('flex justify-center gap-2 my-2')}
      >
        {Tags.map((tag) => (
          <label
            key={tag.id}
            htmlFor={tag.id}
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && setSelectedTag(tag.value)
            }
            className={tm(`
              w-13.5 h-9 text-xs font-semibold rounded-sm cursor-pointer 
              flex justify-center items-center bg-white hover:bg-accent/80 duration-300
              peer-focus:ring-2 peer-focus:ring-accent
            `)}
          >
            <input
              type="radio"
              id={tag.id}
              name="tags"
              value={tag.value}
              className="peer hidden"
              checked={selectedTag === tag.value}
              onChange={() => setSelectedTag(tag.value)}
              aria-checked={selectedTag === tag.value}
            />
            <span
              className={tm(
                selectedTag === tag.value &&
                  'w-14 h-9 bg-primary text-white rounded-sm',
                'flex justify-center items-center'
              )}
            >
              {tag.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default TagBar;
