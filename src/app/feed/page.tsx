'use client';

import { useEffect, useState } from 'react';
import { tm } from '@/utils/tw-merge';
import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import FeedCard, {
  getDummyFeedData,
} from '@/features/feed/components/feed-card';
import TagBar from '@/features/feed/components/tag-bar';

function FeedPage() {
  const dummyPosts = getDummyFeedData();
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className={tm('w-80 m-auto flex flex-col items-center pb-24')}>
      <Profile />
      <TagBar />
      {dummyPosts.map(({ id, user, post }, index) => (
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
      ))}
      <NavItems />
    </div>
  );
}

export default FeedPage;
