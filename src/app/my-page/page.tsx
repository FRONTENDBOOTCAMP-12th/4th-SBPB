import MyPostList from '@/features/my/components/my-post-list';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My 페이지',
};

export default function MyPage() {
  return (
    <div className="my-page">
      <MyPostList />
    </div>
  );
}
