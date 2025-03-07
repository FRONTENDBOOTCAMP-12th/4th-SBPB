'use client';

import { useEffect, useState } from 'react';
import { tm } from '@/utils/tw-merge';
import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import FeedCard, {
  getDummyFeedData,
} from '@/features/feed/components/feed-card';
import TagBar from '@/features/feed/components/tag-bar';
import FeedSortDropdown from '@/features/feed/components/feed-sort-dropdown';

function FeedPage() {
  const dummyPosts = getDummyFeedData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const handleSortChange = (option: 'latest' | 'popular') => {
    setSortType(option); // 선택된 정렬 방식 업데이트
  };

  // 마지막 게시글이 확장되었을 때 자동 스크롤 기능
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [isExpanded]);

  // 게시글 목록 렌더링 함수
  const renderFeedCards = () => {
    return dummyPosts.map(({ id, user, post }, index) => (
      <FeedCard
        key={id}
        id={id}
        user={user}
        post={post}
        onExpand={() => {
          if (index === dummyPosts.length - 1) {
            setIsExpanded(true);
          }
        }}
        onCollapse={() => setIsExpanded(false)}
      />
    ));
  };

  return (
    <div className={tm('w-80 m-auto flex flex-col items-center pb-24')}>
      <Profile />
      <TagBar />
      <FeedSortDropdown onSortChange={handleSortChange} />
      {renderFeedCards()}
      <NavItems />
    </div>
  );
}

export default FeedPage;
