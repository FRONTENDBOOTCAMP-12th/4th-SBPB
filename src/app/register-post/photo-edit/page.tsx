'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { FileInfo } from '@/features/register-post/types/file-info';
import ForwardPageButton from '@/features/register-post/components/forward-page-button';
import BackPageButton from '@/features/register-post/components/back-page-button';
import PhotoEditDisPlay from '@/features/register-post/components/photo-edit-display';
import PhotoEditThumbnail from '@/features/register-post/components/photo-edit-thumbnail';

export default function PhotoEdit() {
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageClick = (src: string) => {
    setSelectedImage(src); // 클릭한 작은 이미지를 큰 이미지로 설정
  };
  useEffect(() => {
    const fileData = JSON.parse(localStorage.getItem('selectedFiles') || '[]');
    setSelectedFiles(fileData);

    const images = fileData.map((file: { content: string }) => file.content);
    setSelectedImages(images);

    setSelectedImage(images[0]);
  }, []);

  return (
    <div className="bg-accent">
      <h1>이미지 미리보기</h1>
      <div>
        <PhotoEditDisPlay src={selectedImage} />
      </div>
      {/* <div>
        {selectedFiles.length > 0 ? (
          selectedFiles.map((file, index) => (
            <div key={index}>
              <p>{file.name}</p>
              <Image
                src={file.content}
                alt={file.name}
                width="200"
                height="200"
              />
            </div>
          ))
        ) : (
          <p>이미지 로딩중...</p>
        )}
      </div> */}
      <BackPageButton />
      <ForwardPageButton link="/register-post/post-create" />
      <PhotoEditThumbnail
        photos={selectedImages}
        onImageClick={handleImageClick}
      />
    </div>
  );
}
