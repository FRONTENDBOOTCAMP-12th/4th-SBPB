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
import { useSortStore } from '@/store/sort-store';

function FeedPage() {
  const dummyPosts = getDummyFeedData();
  const { sortType } = useSortStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedPosts = [...dummyPosts].sort((a, b) => {
    if (sortType === 'latest') {
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime(); // 최신순 정렬
    } else {
      return b.post.content.length - a.post.content.length; // 인기순 (임시: 글자 수가 많은 순)
    }
  });

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
    return sortedPosts.map(({ id, user, post }, index) => (
      <FeedCard
        key={id}
        id={id}
        user={user}
        post={post}
        onExpand={() => {
          if (index === sortedPosts.length - 1) {
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
      <FeedSortDropdown />
      {renderFeedCards()}
      <NavItems />
    </div>
  );
}

export default FeedPage;
