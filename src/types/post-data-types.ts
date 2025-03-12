import { userData } from './user-data-types';

export interface PostData {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  thumbs: number | null;
  created_at: string;
  other_images: (string | null)[];
  location: string;
  user: userData[];
}
