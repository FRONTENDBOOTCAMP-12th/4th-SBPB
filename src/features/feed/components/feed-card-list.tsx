'use client';

import { useEffect, useState } from 'react';
import { useSortStore } from '@/store/sort-store';
import { createClient } from '@/utils/supabase/client';
import FeedCard from './feed-card';
import {
  FeedCardProps,
  SortOption,
} from '@/features/feed/types/feed-card-props';

// feed-card-list.tsx : 데이터 불러오기, 게시글 정렬

const supabase = createClient();

export default function FeedCardList() {
  const { sortType } = useSortStore();
  const [posts, setPosts] = useState<FeedCardProps[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from('post').select(`
          id, 
          description, 
          image_url, 
          thumbs,
          created_at,
          user: userinfo!inner(id, nickname, profile_path)
        `);

      if (sortType === 'latest') {
        query = query.order('created_at', { ascending: false }); // 최신순 정렬
      } else if (sortType === 'popular') {
        query = query.order('thumbs', { ascending: false }); // 인기순 정렬
      }

      const { data, error } = await query;
      if (error) {
        console.error('게시글 불러오기 오류:', error);
      } else if (data) {
        const formattedPosts: FeedCardProps[] = data.map(
          (post): FeedCardProps => ({
            postId: String(post.id),
            sortType: sortType as SortOption,
            id: String(post.id),
            description: String(post.description || ''),
            imageUrl: String(post.image_url || '/default-image.svg'),
            date: new Date(post.created_at).toLocaleDateString(),
            thumbs: Number(post.thumbs || 0),
            user: {
              id: String(post.user?.id || ''),
              nickname: String(post.user?.nickname || '닉네임 없음'),
              profile_path: String(
                post.user?.profile_path || '/default-image.svg'
              ),
            },
          })
        );

        setPosts(formattedPosts);
      }
    };

    fetchPosts();
  }, [sortType]);

  return (
    <div className="w-full flex flex-col items-center">
      {posts.length === 0 ? (
        <div className="py-4 px-4 text-center text-gray-500">로딩 중...</div>
      ) : (
        posts.map((post, index) => (
          <FeedCard
            key={post.postId}
            post={post}
            isExpanded={expandedPostId === post.postId}
            setExpandedPostId={setExpandedPostId}
            isLastPost={index === posts.length - 1}
          />
        ))
      )}
    </div>
  );
}
