import PhotoEdit from '@/features/register-post/components/photo-edit';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '사진 선택',
};
export default function PhotoEditPage() {
  return (
    <div className="photo-edit">
      <PhotoEdit />
    </div>
  );
}
