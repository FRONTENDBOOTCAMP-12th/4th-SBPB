import { create } from 'zustand';

interface LikeStore {
  likedPosts: Record<string, boolean>;
  likeCounts: Record<string, number>;
  setLikes: (postId: string, count: number) => void;
}

export const useLikeStore = create<LikeStore>((set) => ({
  likedPosts: {}, // 사용자가 좋아요를 눌렀는지 저장
  likeCounts: {}, // 게시물별 좋아요 개수 저장

  setLikes: (postId, count) =>
    set((state) => ({
      likeCounts: { ...state.likeCounts, [postId]: Math.max(count, 0) },
    })),
}));
