import PostPlacePage from '@/features/post-place/components/post-place-page';
import { Suspense } from 'react';

function SearchPost() {
  return <>placeholder</>;
}
function PostPlace() {
  return (
    <div className="post-place">
      <Suspense fallback={<SearchPost />}>
        <PostPlacePage />
      </Suspense>
    </div>
  );
}

export default PostPlace;
