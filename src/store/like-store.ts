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
    set((state) => ({
      likedPosts: {
        ...state.likedPosts,
        [postId]: !state.likedPosts[postId],
      },
      likeCounts: {
        ...state.likeCounts,
        [postId]: state.likedPosts[postId]
          ? currentLikes - 1
          : currentLikes + 1,
      },
    })),
  setLikes: (postId, count) =>
    set((state) => ({
      likeCounts: { ...state.likeCounts, [postId]: count },
    })),
}));
