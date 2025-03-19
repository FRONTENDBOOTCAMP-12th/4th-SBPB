'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { tm } from '@/utils/tw-merge';
import FeedLikeBtn from './feed-like-btn';
import FollowToggleBtn from '@/components/follow-toggle-btn';
import { FeedCardProps } from '@/features/feed/types/feed-card-props';

// feed-card.tsx : 렌더링, 더 보기(접기), 스크롤 처리

export default function FeedCard({
  post,
  isExpanded,
  setExpandedPostId,
  isLastPost,
  onCardClick,
  currentUserId,
}: {
  post: FeedCardProps;
  isExpanded: boolean;
  setExpandedPostId: (id: string | null) => void;
  isLastPost: boolean;
  onCardClick: (postId: string) => void;
  currentUserId: string;
}) {
  const { postId, user, description, imageUrl, date } = post;
  const MAX_TEXT_LENGTH = 60;
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  // 마지막 게시글이면 자동 스크롤 처리
  useEffect(() => {
    if (!isExpanded || !isLastPost) return;
    setTimeout(() => {
      lastPostRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }, [isExpanded, isLastPost]);

  return (
    <div
      ref={isLastPost ? lastPostRef : null}
      id={`post-${postId}`}
      className="pt-4 pb-6 px-4 bg-white w-full border border-t-0 border-b-0 border-l-[#eee] border-r-[#eee]"
    >
      <div className="flex items-center gap-3 relative">
        {/* 프로필 이미지 */}
        <div
          className={tm(
            'w-8 h-8 bg-primary rounded-full overflow-hidden flex items-center justify-center'
          )}
        >
          <Image
            src={user.profile_path}
            alt={user.nickname}
            width={22}
            height={22}
            className="w-full h-full"
          />
        </div>
        {/* 닉네임 & 날짜 */}
        <div>
          <p className="font-semibold">{user.nickname}</p>
          <p className="text-xs text-primary">{date}</p>
        </div>
        {/* 좋아요 버튼 + 팔로우 버튼 */}
        <div className="ml-auto flex items-center gap-2">
          <FeedLikeBtn postId={postId} />
          <FollowToggleBtn
            currentUserId={currentUserId}
            targetUserId={user.user_id}
          />
        </div>
      </div>

      {/* 게시글 이미지 */}
      <div className="mt-3 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="게시글 이미지"
          width={288}
          height={160}
          className="rounded-xl bg-content-tertiary"
          onClick={() => onCardClick(postId)}
        />
      </div>

      {/* 게시글 내용 */}
      <div className="mt-3 text-sm text-content-secondary break-all relative">
        {isExpanded ? description : description.slice(0, MAX_TEXT_LENGTH)}
        {description.length > MAX_TEXT_LENGTH && (
          <button
            onClick={() => setExpandedPostId(isExpanded ? null : postId)}
            className="text-primary text-sm ml-1 hover:text-accent font-semibold duration-300 absolute bottom-[-20] right-0"
          >
            {isExpanded ? '접기' : '더 보기'}
          </button>
        )}
      </div>
    </div>
  );
}
