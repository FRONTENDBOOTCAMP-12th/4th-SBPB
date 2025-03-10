'use client';

import { useState } from 'react';
import Image from 'next/image';
import { tm } from '@/utils/tw-merge';
import { FeedCardProps } from '@/features/feed/types/feed-card-props';
import FeedLikeBtn from './feed-like-btn';

// 더미데이터
export function getDummyFeedData(): FeedCardProps[] {
  return [
    {
      id: 1,
      user: { nickname: '닉네임1', image: '/default-image.svg' },
      post: {
        id: '1',
        content:
          '샘플 게시글입니다. 더 많은 내용을 추가할 수 있습니다. 현재 60자 이후 숨김 처리 내용 더 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 있음.',
        imageUrl: '/default-image.svg',
        date: '2025-03-06',
      },
    },
    {
      id: 2,
      user: { nickname: '닉네임2', image: '/default-image.svg' },
      post: {
        id: '2',
        content:
          '샘플 게시글입니다. 더 많은 내용을 추가할 수 있습니다. 현재 60자 이후 숨김 처리 내용 더 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 있음.',
        imageUrl: '/default-image.svg',
        date: '2025-03-06',
      },
    },
    {
      id: 3,
      user: { nickname: '닉네임3', image: '/default-image.svg' },
      post: {
        id: '3',
        content: `샘플 게시글입니다. 더 많은 내용을 추가할 수 있습니다. 현재 60자 이후 숨김 처리 내용 더 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 있음.
					샘플 게시글입니다.더 많은 내용을 추가할 수 있습니다.현재 60자 이후 숨김 처리 내용 더 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~있음.`,
        imageUrl: '/default-image.svg',
        date: '2025-03-06',
      },
    },
    {
      id: 4,
      user: { nickname: '닉네임4', image: '/default-image.svg' },
      post: {
        id: '4',
        content: `샘플 게시글입니다. 더 많은 내용을 추가할 수 있습니다. 현재 60자 이후 숨김 처리 내용 더 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 있음.
					샘플 게시글입니다.더 많은 내용을 추가할 수 있습니다.현재 60자 이후 숨김 처리 내용 더 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~있음.`,
        imageUrl: '/default-image.svg',
        date: '2025-03-06',
      },
    },
  ];
}

export default function FeedCard({
  user,
  post,
  onExpand,
  onCollapse,
}: FeedCardProps) {
  const [showFullText, setShowFullText] = useState(false);
  const MAX_TEXT_LENGTH = 60;
  const userImage = user?.image || 'img';
  const postImage = post?.imageUrl || 'img';
  const userNickname = user?.nickname || '닉네임';
  const postDate = post?.date || '날짜 없음';

  const handleExpand = () => {
    setShowFullText(true);
    if (typeof onExpand === 'function') {
      onExpand();
    }
  };

  const handleCollapse = () => {
    setShowFullText(false);
    if (typeof onCollapse === 'function') {
      onCollapse();
    }
  };

  return (
    <div className="py-4 px-4 bg-white">
      <div className="flex items-center gap-3 relative">
        {/* 프로필 이미지 */}
        <div
          className={tm(
            'w-8 h-8 bg-primary rounded-full overflow-hidden flex items-center justify-center'
          )}
        >
          <Image src={userImage} alt={userNickname} width={22} height={22} />
        </div>
        {/* 닉네임 & 날짜 */}
        <div>
          <p className="font-semibold">{userNickname}</p>
          <p className="text-xs text-primary">{postDate}</p>
        </div>
        <FeedLikeBtn postId={post.id} />
      </div>
      {/* 게시글 이미지 */}
      <div className="mt-3 flex items-center justify-center">
        <Image
          src={postImage}
          alt="게시글 이미지"
          width={288}
          height={160}
          className="rounded-xl bg-content-tertiary"
        />
      </div>
      {/* 게시글 내용 */}
      <div
        className={tm('mt-3 text-sm text-content-tertiary break-all relative')}
      >
        {showFullText ? post.content : post.content.slice(0, MAX_TEXT_LENGTH)}
        {post.content.length > MAX_TEXT_LENGTH && (
          <button
            onClick={showFullText ? handleCollapse : handleExpand}
            className={tm(
              'text-primary text-sm ml-1 hover:text-accent font-semibold duration-300',
              'absolute bottom-[-16] right-0 duration-300'
            )}
          >
            {showFullText ? '접기' : '더 보기'}
          </button>
        )}
      </div>
    </div>
  );
}
