import Image from 'next/image'

interface UploadImageButtonProps {
  placeholderSrc: string
}
function UploadImageButton({
  placeholderSrc = '/photo.svg',
}: UploadImageButtonProps) {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div
        className="flex flex-row items-center justify-center border-2 border-solid border-white rounded-3xl h-10 p-2 
      "
      >
        <Image
          src={placeholderSrc}
          width={24}
          height={24}
          alt="사진 아이콘"
          className="mr-1"
        />
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
        />
        <label
          htmlFor="upload-image"
          className="cursor-pointer bg-transparent border-none p-0 m-0 text-white"
        >
          사진을 선택하세요
        </label>
      </div>
    </div>
  )
}

export default UploadImageButton
