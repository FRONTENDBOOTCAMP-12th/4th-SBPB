import BackPageButton from '@/features/register-post/components/back-page-button'
import UploadImageButton from '@/features/register-post/components/upload-image-button'

export default function PhotoUpload() {
  return (
    <div className="bg-(--color-primary)">
      <BackPageButton />
      <UploadImageButton />
    </div>
  )
}
