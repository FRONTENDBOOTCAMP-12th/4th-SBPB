export interface FeedCardProps {
  id: number;
  user: {
    nickname: string;
    image: string;
  };
  post: {
    content: string;
    imageUrl: string;
    date: string;
  };
  onExpand?: () => void;
  onCollapse?: () => void;
  className?: string;
}
