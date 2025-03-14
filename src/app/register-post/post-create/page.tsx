import PostCreate from '@/features/register-post/components/post-create';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '게시글 작성',
};
export default function PostCreatePage() {
  return (
    <div className="post-create">
      <PostCreate />
    </div>
  );
}
