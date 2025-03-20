'use client';

import { tm } from '@/utils/tw-merge';
import { SetStateAction } from 'react';

function ThemeBar({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <article className="flex justify-center gap-1">
      <button
        onClick={() => setTheme('전국 여행지')}
        className={tm(
          'font-semibold border-b-3 border-content-primary text-xs py-1 my-2 w-22',
          {
            'border-b-accent text-accent': theme === '전국 여행지',
          }
        )}
        type="button"
      >
        전국 여행지
      </button>
      <button
        onClick={() => setTheme('관심지역')}
        className={tm(
          'font-semibold border-b-3 border-content-primary text-xs py-1 my-2 w-22',
          {
            'border-b-accent text-accent': theme === '관심지역',
          }
        )}
        type="button"
      >
        관심 지역
      </button>
    </article>
  );
}

export default ThemeBar;
