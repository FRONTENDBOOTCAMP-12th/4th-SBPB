export type SortOption = 'latest' | 'popular';

export interface UserProps {
  id: string;
  nickname: string;
  profile_path: string;
  image?: string;
}

export interface FeedCardProps {
  postId: string;
  sortType: SortOption;
  id: string;
  description: string;
  imageUrl: string;
  date: string;
  thumbs: number;
  user: UserProps;
  onExpand?: () => void;
  onCollapse?: () => void;
  className?: string;
}
