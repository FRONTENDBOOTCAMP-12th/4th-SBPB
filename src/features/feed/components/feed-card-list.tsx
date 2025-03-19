'use client';

import { useEffect, useState } from 'react';
import { useSortStore } from '@/store/sort-store';
import { useUserProfileStore } from '@/store/user-profile-store';
import { useRouter } from 'next/navigation';
import FeedCard from './feed-card';
import {
  FeedCardProps,
  SortOption,
  UserProps,
  PostType,
} from '@/features/feed/types/feed-card-props';

// feed-card-list.tsx : 데이터 불러오기, 게시글 정렬

export default function FeedCardList() {
  const { sortType } = useSortStore();
  const { user, fetchUser } = useUserProfileStore(); // Zustand에서 유저 상태 가져오기
  const currentUserId = user?.id || ''; // 유저 ID 추출

  const [posts, setPosts] = useState<FeedCardProps[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser(); // 유저 정보 불러오기
  }, [fetchUser]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/feed-card-list?sortType=${sortType}`);
        const data = await res.json();

        if (!data.success) {
          console.error('게시글 불러오기 오류:', data.error);
          return;
        }

        const formattedPosts: FeedCardProps[] = data.posts.map(
          (post: PostType): FeedCardProps => {
            // user가 배열로 반환될 가능성 때문에 첫 번째 요소 사용
            const userData = Array.isArray(post.user)
              ? post.user[0]
              : post.user;

            // uuid 데이터 확인용
            // console.log('userData.user_id:', userData?.user_id);

            const userIdUUID = userData?.user_id;
            if (!userIdUUID) {
              console.warn('user_id(uuid)가 없음:', userData);
            }

            return {
              postId: String(post.id),
              sortType: sortType as SortOption,
              id: String(post.id),
              description: String(post.description || ''),
              imageUrl: String(post.image_url || '/default-image.svg'),
              date: new Date(post.created_at).toLocaleDateString(),
              thumbs: Number(post.thumbs || 0),
              createdAt: post.created_at,
              updatedAt: post.updated_at || '',
              commentsCount: post.comments_count || 0,
              user: {
                id: String(userData?.id || ''),
                user_id: String(userData?.user_id || ''),
                nickname: String(userData?.nickname || '닉네임 없음'),
                profile_path: String(
                  userData?.profile_path || '/default-image.svg'
                ),
                email: userData?.email || '',
                createdAt: userData?.createdAt || '',
              } as UserProps,
            };
          }
        );

        setPosts(formattedPosts);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, [sortType]);

  const handleCardClick = (postId: string) => {
    router.push(`/post-detail?postId=${postId}`); // 상세 페이지로 이동
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
            currentUserId={currentUserId} // 유저 ID 전달
          />
        ))
      )}
    </div>
  );
}
