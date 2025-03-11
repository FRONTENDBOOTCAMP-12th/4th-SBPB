'use client';

import { useState, useEffect } from 'react';
import { FileInfo } from '@/features/register-post/types/file-info';
import ForwardPageButton from '@/features/register-post/components/forward-page-button';
import BackPageButton from '@/features/register-post/components/back-page-button';
import PhotoEditDisPlay from '@/features/register-post/components/photo-edit-display';
import PhotoEditThumbnail from '@/features/register-post/components/photo-edit-thumbnail';

export default function PhotoEdit() {
  const [, setSelectedFiles] = useState<FileInfo[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // IndexedDB에서 파일 데이터를 가져오는 함수
  const loadFilesFromIndexedDB = () => {
    const request = indexedDB.open('fileDatabase', 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      const transaction = db.transaction('files', 'readonly');
      const store = transaction.objectStore('files');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const files = getAllRequest.result;

        const fileData = files.map(
          (file: {
            content: Blob;
            name: string;
            type: string;
            size: number;
          }) => {
            // Blob을 URL로 변환하여 저장
            const objectURL = URL.createObjectURL(file.content);
            return {
              name: file.name,
              content: objectURL, // Blob을 URL로 변환하여 content에 저장
              type: file.type,
              size: file.size,
            };
          }
        );

        setSelectedFiles(fileData);

        const images = fileData.map((file) => file.content); // URL 목록
        setSelectedImages(images);

        console.log(selectedImage);

        if (images.length > 0) {
          setSelectedImage(images[0]); // 첫 번째 이미지를 기본 이미지로 설정
        }
      };

      getAllRequest.onerror = (e) => {
        console.error('파일을 가져오는 데 실패했습니다.', e);
      };
    };

    request.onerror = (event) => {
      console.error('IndexedDB 에러:', event);
    };
  };

  // 이미지 클릭 시 큰 이미지를 설정하는 함수
  const handleImageClick = (src: string) => {
    setSelectedImage(src); // 클릭한 작은 이미지를 큰 이미지로 설정
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 IndexedDB에서 파일 데이터를 불러옴
    loadFilesFromIndexedDB();
  });

  return (
    <div className="bg-primary h-screen">
      {selectedImage && <PhotoEditDisPlay src={selectedImage} />}

      <div className="flex justify-between">
        <div className="text-white flex justify-center items-center">
          <BackPageButton />
          <span>다시 사진선택</span>
        </div>
        <ForwardPageButton link="/register-post/post-create" />
      </div>

      <PhotoEditThumbnail
        photos={selectedImages}
        onImageClick={handleImageClick}
      />
    </div>
  );
}
