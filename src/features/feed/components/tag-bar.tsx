'use client';

import { tm } from '@/utils/tw-merge';
import { useState } from 'react';

interface TagTypes {
  id: string;
  value: string;
  label: string;
}

const Tags: TagTypes[] = [
  { id: 'tag-all', value: 'all', label: '전체' },
  { id: 'tag-dev', value: 'dev', label: '팔로잉' },
  { id: 'tag-autumn', value: 'autumn', label: '가을' },
  { id: 'tag-korean', value: 'korean', label: '한식' },
  { id: 'tag-food', value: 'food', label: '맛집' },
];

function TagBar() {
  const [selectedTag, setSelectedTag] = useState<TagTypes['value']>('all');

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
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedTag(tag.value);
              }
            }}
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
