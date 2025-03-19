import { create } from 'zustand';

interface LikeStore {
  likedPosts: Record<string, boolean>;
  likeCounts: Record<string, number>;
  toggleLike: (postId: string, currentLikes: number) => void;
  setLikes: (postId: string, count: number) => void;
}

export const useLikeStore = create<LikeStore>((set) => ({
  likedPosts: {}, // 사용자가 좋아요를 눌렀는지 저장
  likeCounts: {}, // 게시물별 좋아요 개수 저장

  toggleLike: (postId, currentLikes) =>
    set((state) => {
      const isLiked = state.likedPosts[postId] ?? false;
      const newCount = isLiked
        ? Math.max(currentLikes - 1, 0)
        : currentLikes + 1;

      return {
        likedPosts: { ...state.likedPosts, [postId]: !isLiked },
        likeCounts: { ...state.likeCounts, [postId]: newCount },
      };
    }),

  setLikes: (postId, count) =>
    set((state) => ({
      likeCounts: { ...state.likeCounts, [postId]: Math.max(count, 0) },
    })),
}));
