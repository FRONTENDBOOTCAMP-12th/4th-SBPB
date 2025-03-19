export type SortOption = 'latest' | 'popular';

export interface UserProps {
  id: string;
  user_id: string;
  nickname: string;
  profile_path: string;
  image?: string;
  email?: string;
  createdAt?: string;
}

// Supabase에서 가져오는 원본 데이터 타입 정의
export interface PostType {
  id: string;
  description: string;
  image_url: string;
  thumbs: number;
  created_at: string;
  updated_at?: string;
  comments_count?: number;
  user: UserProps[];
}

// FeedCard에서 사용할 최종 변환된 타입
export interface FeedCardProps {
  postId: string;
  sortType: SortOption;
  id: string;
  description: string;
  imageUrl: string;
  date: string;
  thumbs: number;
  user: UserProps;
  createdAt?: string;
  updatedAt?: string;
  commentsCount?: number;
  onExpand?: () => void;
  onCollapse?: () => void;
  className?: string;
}
