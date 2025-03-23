'use client';

import Image from 'next/image';

interface PhotoEditThumbnailProps {
  photos: { src: string; id: number }[];
  onImageClick: (src: string) => void;
  onDeleteClick: (fileId: number) => void;
}
function PhotoEditThumbnail({
  photos,
  onImageClick,
  onDeleteClick,
}: PhotoEditThumbnailProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 ml-auto justify-items-center items-center">
      {photos.map((image, index) => (
        <div key={index} className="relative">
          <div onClick={() => onImageClick(image.src)}>
            <Image
              src={image.src}
              alt={`선택할 ${index}번째 사진`}
              width={100}
              height={100}
            />
          </div>
          <div
            className="absolute top-0.5 right-0.5"
            onClick={() => onDeleteClick(image.id)}
          >
            <Image src="/close-solid.svg" alt="닫기" width={18} height={18} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoEditThumbnail;
