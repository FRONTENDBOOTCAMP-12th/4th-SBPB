import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import TagBar from '@/features/feed/components/tag-bar';
import { tm } from '@/utils/tw-merge';

function FeedPage() {
  return (
    <div
      className={tm(
        'w-80 h-dvh m-auto flex flex-col items-center bg-[#efefef]'
      )}
    >
      <Profile />
      <TagBar />
      <NavItems />
    </div>
  );
}

export default FeedPage;
