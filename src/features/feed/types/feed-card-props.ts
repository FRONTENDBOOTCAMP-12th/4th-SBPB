export interface FeedCardProps {
  id: number;
  user: {
    nickname: string;
    image: string;
  };
  post: {
    id: string;
    content: string;
    imageUrl: string;
    date: string;
  };
  onExpand?: () => void;
  onCollapse?: () => void;
  className?: string;
}
