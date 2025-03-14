import PhotoUpload from '@/features/register-post/components/photo-upload';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '사진 업로드',
};
export default function PhotoUploadPage() {
  return (
    <div className="photo-upload">
      <PhotoUpload />
    </div>
  );
}
