'use client';

import { useEffect, useState } from 'react';
import { useSortStore } from '@/store/sort-store';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import FeedCard from './feed-card';
import {
  FeedCardProps,
  SortOption,
  UserProps,
} from '@/features/feed/types/feed-card-props';

// feed-card-list.tsx : 데이터 불러오기, 게시글 정렬

const supabase = createClient();

export default function FeedCardList() {
  const { sortType } = useSortStore();
  const [posts, setPosts] = useState<FeedCardProps[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const router = useRouter();

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
        return;
      } else if (data) {
        const formattedPosts: FeedCardProps[] = data.map(
          (post): FeedCardProps => {
            // user가 배열로 반환될 가능성 때문에 첫 번째 요소 사용
            const userData = Array.isArray(post.user)
              ? post.user[0]
              : post.user;

            return {
              postId: String(post.id),
              sortType: sortType as SortOption,
              id: String(post.id),
              description: String(post.description || ''),
              imageUrl: String(post.image_url || '/default-image.svg'),
              date: new Date(post.created_at).toLocaleDateString(),
              thumbs: Number(post.thumbs || 0),
              user: {
                id: String(userData?.id || ''),
                nickname: String(userData?.nickname || '닉네임 없음'),
                profile_path: String(
                  userData?.profile_path || '/default-image.svg'
                ),
              } as UserProps,
            };
          }
        );

        setPosts(formattedPosts);
      }
    };

    fetchPosts();
  }, [sortType]);

  const handleCardClick = (postId: string) => {
    router.push(`/post-detail` + `?` + `postId=${postId}`); // 상세 페이지로 이동
  };

  return (
    <div className="w-full flex flex-col items-center">
      {posts.length === 0 ? (
        <div className="py-4 px-4 text-center text-content-secondary">
          로딩 중...
        </div>
      ) : (
        posts.map((post, index) => (
          <FeedCard
            key={post.postId}
            post={post}
            isExpanded={expandedPostId === post.postId}
            setExpandedPostId={setExpandedPostId}
            isLastPost={index === posts.length - 1}
            onCardClick={handleCardClick}
          />
        ))
      )}
    </div>
  );
}
