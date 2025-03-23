'use client';

import { useEffect, useState, useRef } from 'react';
import { useLikeStore } from '@/store/like-store';
import { FeedLikeBtnProps } from '../types/feed-like-btn-props';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify';

export default function FeedLikeBtn({ postId }: FeedLikeBtnProps) {
  const { likedPosts, likeCounts, setLikes } = useLikeStore();
  const [, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // 로그인 여부 상태
  const loadingRef = useRef(false);
  const supabase = createClient();

  // 로그인 상태 확인 (로그인/로그아웃 감지)
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    checkAuth();

    // 로그인/로그아웃 감지하여 즉시 반영
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setIsAuthenticated(!!session?.user);
      }
    );

    return () => {
      authListener.subscription.unsubscribe(); // 리스너 해제
    };
  }, [supabase]);

  // API에서 좋아요 개수 가져오기
  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`/api/feed-like-btn?postId=${postId}`);
      const data = await res.json();

      if (!res.ok) {
        console.error('좋아요 개수 불러오기 오류:', data.error);
        return;
      }

      setLikes(postId, data.thumbs);
    };

    fetchLikes();
  }, [postId, setLikes]);

  // 좋아요 버튼 클릭 이벤트 처리
  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.info('로그인 후 다양한 기능을 경험해보세요.');
      return;
    }

    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const isLiked = likedPosts[postId] ?? false;
    const newCount = isLiked ? likeCounts[postId] - 1 : likeCounts[postId] + 1;

    const res = await fetch('/api/feed-like-btn', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, newCount }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('좋아요 업데이트 오류:', data.error);
    } else {
      // 여기에서 setLikes만 사용하여 정확히 반영
      setLikes(postId, newCount);
      // likedPosts 업데이트
      useLikeStore.setState((state) => ({
        likedPosts: { ...state.likedPosts, [postId]: !isLiked },
      }));
    }

    loadingRef.current = false;
    setLoading(false);
  };

  return (
    <div
      className={`flex items-center gap-2 text-sm cursor-pointer select-none ${
        !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
      }`}
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
