'use client';

import Image from 'next/image';

interface PhotoEditThumbnailProps {
  photos: string[];
  onImageClick: (src: string) => void;
}
function PhotoEditThumbnail({ photos, onImageClick }: PhotoEditThumbnailProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 ml-auto justify-items-center items-center">
      {photos.map((image, index) => (
        <div key={index} onClick={() => onImageClick(image)}>
          <Image
            src={image}
            alt={`선택할 ${index}번째 사진`}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
}

export default PhotoEditThumbnail;
