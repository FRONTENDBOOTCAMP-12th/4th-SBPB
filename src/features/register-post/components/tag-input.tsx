'use client';

import { useState } from 'react';
import type { TagInputProps } from '../types/tag-input-props';

function TagInput({ label, tags, setTags }: TagInputProps) {
  // 한글 조합 상태 관리
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  // 태그 등록 이벤트 핸들러
  const handleTagEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key !== 'Enter' && e.key !== ',') return;

    const value = e.currentTarget.value.trim();

    if (!value.length) return;

    setTags((prev) => [...prev, value]);
    setInputValue('');
  };

  // 태그 삭제 이벤트
  const handleDeleteTag = (tagName: string) => {
    const deletedData = tags?.filter((tag) => tag !== tagName) ?? [];
    setTags(deletedData);
  };

  return (
    <div className="overflow-visible relative border-solid border-b-[0.2px]  border-gray-200 mx-3 pt-[20px] mb-[80px] flex flex-wrap">
      <div className="flex items-center flex-wrap">
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            onClick={() => handleDeleteTag(tag)}
            className="bg-gray-400 text-white px-2 rounded-full flex items-center my-0.5 text-sm mr-2"
          >
            {tag}
          </span>
        ))}
      </div>

      <label className="sr-only">{label}</label>
      <input
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={handleTagEnter}
        className="relative item-center pb-1.5 text-sm placeholder-gray-400 text-gray-400 flex-1"
        type="text"
        name="tags"
        placeholder={
          tags?.length === 0
            ? '쉼터 혹은 엔터를 입력하여 태그를 등록할 수 있습니다.'
            : ''
        }
      />
    </div>
  );
}

export default TagInput;
