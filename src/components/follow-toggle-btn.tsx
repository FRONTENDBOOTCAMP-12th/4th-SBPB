'use client';

import { useState } from 'react';

interface FollowToggleBtnProps {
  currentUserId: string; // 로그인 유저 ID (uuid)
  targetUserId: string; // 게시글 작성자 ID (uuid)
}

function FollowToggleBtn({
  currentUserId,
  targetUserId,
}: FollowToggleBtnProps) {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const isLoggedIn = currentUserId !== '';

  // 버튼 클릭 시 팔로우 or 언팔로우 처리
  const handleClick = async () => {
    if (!isLoggedIn) return;

    setLoading(true);

    try {
      const action = isFollowing ? 'unfollow' : 'follow';

      const res = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          followingUserId: currentUserId,
          followUserId: targetUserId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsFollowing(!isFollowing);
      } else {
        console.error('API 실패:', data.error);
      }
    } catch (err) {
      console.error('팔로우 처리 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  // 본인 글에는 버튼 안 보이게 처리 (선택사항)
  if (isLoggedIn && currentUserId === targetUserId) return null;

  return (
    <button
      className={`px-3 py-1 rounded-full text-sm
  ${
    !isLoggedIn
      ? 'opacity-50 bg-gray-500 text-white cursor-not-allowed'
      : isFollowing
        ? 'bg-white text-accent border border-accent hover:bg-accent hover:text-white hover:duration-300'
        : 'bg-primary text-white hover:bg-accent'
  }
`}
      onClick={handleClick}
      disabled={loading || !isLoggedIn}
    >
      {loading ? '처리 중...' : isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
}

export default FollowToggleBtn;
