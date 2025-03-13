'use client';

import { useEffect, useState, useRef } from 'react';
import { useLikeStore } from '@/store/like-store';
import { createClient } from '@/utils/supabase/client';
import { FeedLikeBtnProps } from '../types/feed-like-btn-props';
import Image from 'next/image';

export default function FeedLikeBtn({ postId }: FeedLikeBtnProps) {
  const { likedPosts, likeCounts, toggleLike, setLikes } = useLikeStore();
  const [, setLoading] = useState(false); // 비동기 작업 중 인지 확인
  const loadingRef = useRef(false); // useRef로 중복 클릭 방지
  const supabase = createClient();

  // Supabase에서 좋아요 개수 가져오기
  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('post')
        .select('thumbs')
        .eq('id', postId)
        .single();

      if (!error && data) {
        setLikes(postId, data.thumbs);
      }
    };

    fetchLikes();
  }, [postId, setLikes, supabase]);

  // 좋아요 버튼 클릭 이벤트 처리
  const handleLike = async () => {
    if (loadingRef.current) return; // 중복 클릭 방지
    loadingRef.current = true;
    setLoading(true);

    const newCount = likedPosts[postId]
      ? likeCounts[postId] - 1
      : likeCounts[postId] + 1;

    const { error } = await supabase
      .from('post')
      .update({ thumbs: newCount })
      .eq('id', postId);

    if (!error) {
      toggleLike(postId, newCount);
    }

    loadingRef.current = false;
    setLoading(false);
  };

  return (
    <div
      className="flex items-center gap-2 text-sm absolute right-14 cursor-pointer select-none"
      onClick={handleLike}
    >
      <Image
        src={likedPosts[postId] ? '/heart.svg' : '/heart-outline.svg'}
        width={20}
        height={20}
        alt="좋아요"
      />
      <p>{likeCounts[postId] || 0}</p>
    </div>
  );
}
