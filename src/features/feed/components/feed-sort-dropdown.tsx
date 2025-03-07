'use client';

import { useState } from 'react';

function FeedSortDropdown({
  onSortChange, // 부모 컴포넌트에서 전달받은 정렬 변경 함수
}: {
  onSortChange: (sortOption: 'latest' | 'popular') => void;
}) {
  // 현재 선택된 정렬 옵션을 저장하는 상태 (기본값은 최신순)
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');

  // 드롭다운에서 선택한 값이 변경될 때 실행되는 함수
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value as 'latest' | 'popular'; // 선택된 값 가져오기
    setSortOption(selectedOption); // 상태 업데이트 (UI 업데이트)
    onSortChange(selectedOption); // 부모 컴포넌트에 선택한 옵션 전달
  };
  return (
    <div className="w-full pt-4 font-semibold text-sm">
      <select value={sortOption} onChange={handleSortChange}>
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  );
}

export default FeedSortDropdown;
