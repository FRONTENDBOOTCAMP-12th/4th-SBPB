'use client';

import NavItems from '@/components/nav-items';
import PostCard from '@/features/recommend-place/components/post-card';
import TagFilter from '@/features/recommend-place/components/tag-filter';
import ThemeBar from '@/features/recommend-place/components/theme-bar';
import { Tables } from '@/types/supabase';
import { useState } from 'react';

interface RecommendPlaceClientProps {
  posts: Tables<'post'>[] | null;
  tags: string[];
  userMap: Record<
    number,
    { id: number; nickname: string; profile_path: string }
  >;
}

function RecommendPlaceClient({
  posts,
  tags,
  userMap,
}: RecommendPlaceClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('전체보기');

  const filteredPosts =
    selectedTag !== '전체보기'
      ? posts?.filter((post) => post.tags?.includes(selectedTag))
      : posts;

  return (
    <section>
      <ThemeBar />
      <TagFilter
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <ul className="mb-20">
        {filteredPosts?.map((post) => {
          return (
            <PostCard
              key={post.id}
              tags={post.tags?.split(',')}
              images={[post.image_url, ...(post.other_images ?? [])]}
              userId={post.user_id}
              postId={post.id}
              userInfo={userMap[post.user_id!]}
            />
          );
        })}
      </ul>
      <NavItems />
    </section>
  );
}

export default RecommendPlaceClient;
