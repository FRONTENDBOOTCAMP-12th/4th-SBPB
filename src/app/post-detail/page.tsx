import PostDetail from '@/features/post-detail/components/post-detail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상세 페이지',
};
export default function PostDetailPage() {
  return (
    <div className="post-detail">
      <PostDetail />
    </div>
  );
}
