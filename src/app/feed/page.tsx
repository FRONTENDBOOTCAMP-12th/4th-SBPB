import { tm } from '@/utils/tw-merge';
import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import FeedCardList from '@/features/feed/components/feed-card-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '게시글 피드',
};

function FeedPage() {
  return (
    <div className={tm('w-80 m-auto flex flex-col items-center pb-24')}>
      <Profile />
      <FeedCardList />
      <NavItems />
    </div>
  );
}

export default FeedPage;
