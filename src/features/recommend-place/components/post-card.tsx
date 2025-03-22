'use client';

import { createClient } from '@/utils/supabase/client';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TagItem from './tag-item';

interface PostCardProps {
  tags: string[] | undefined;
  images: (string | null)[];
  postId: number;
  userId?: number | null;
  userInfo?: {
    id: number | string;
    nickname: string;
    profile_path: string;
  };
  isFollowing: boolean;
}

function PostCard({
  tags,
  images,
  userId,
  postId,
  userInfo,
  isFollowing,
}: PostCardProps) {
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [targetUser, setTargetUser] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/get-user');
      const user = await res.json();

      const { data: targetUser, error } = await supabase
        .from('userinfo')
        .select('user_id')
        .eq('id', userId);

      if (error) {
        console.error(error.message);
        return;
      }

      const current = user.user.id;
      const target = targetUser?.[0].user_id;

      setCurrentUser(current);
      setTargetUser(target);

      setIsLoading(false);
    };

    fetchUser();
  }, [userId, supabase]);

  const handleFollowClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({
          action: isFollow ? 'unfollow' : 'follow',
          followingUserId: currentUser,
          followUserId: targetUser,
        }),
      });
      setIsFollow((prev) => !prev);
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="relative py-3.5 px-3 bg-gray-50">
      <button
        onClick={handleFollowClick}
        type="button"
        className={tm(
          'bg-content-primary text-white px-3.5 py-1.5 rounded-full text-xs self-center absolute top-[15px] right-[10px]',
          { 'text-white bg-accent': isFollow && !isLoading },
          { 'text-white bg-gray-300': isLoading }
        )}
      >
        {isLoading ? '로딩 중..' : isFollow ? '팔로잉' : '팔로우'}
      </button>
      <Link href={`/post-detail?postId=${postId}`}>
        <div className="flex gap-2">
          <Image
            src={userInfo?.profile_path ?? '/default-profile.svg'}
            alt={userInfo?.nickname ?? '사용자'}
            width={30}
            height={30}
            className="rounded-2xl w-[30px] h-[30px] object-cover"
          />
          <div className="flex flex-col mr-auto">
            <span className="text-xs font-semibold">{userInfo!.nickname}</span>
            <span className="text-xs text-content-tertiary">
              게시글 112 • 팔로워 46
            </span>
          </div>
        </div>
        <ul className="flex gap-1 mt-3">
          {tags?.map((tag) => <TagItem tag={tag} key={tag} />)}
        </ul>
        <div
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="rounded-l-lg overflow-x-auto scroll-snap-x mandatory whitespace-nowrap flex gap-0.5 mt-1.5"
        >
          {images.map((image, idx) => (
            <Image
              key={idx}
              src={image!}
              alt={`${userInfo?.nickname ?? '사용자'}의 게시글 컨텐츠`}
              width={100}
              height={100}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          ))}
        </div>
      </Link>
    </article>
  );
}
export default PostCard;
