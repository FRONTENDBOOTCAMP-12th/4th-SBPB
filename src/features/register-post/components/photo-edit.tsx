'use client';

import { useState, useEffect } from 'react';
import { FileInfo } from '@/features/register-post/types/file-info';
import ForwardPageButton from '@/features/register-post/components/forward-page-button';
import BackPageButton from '@/features/register-post/components/back-page-button';
import PhotoEditDisPlay from '@/features/register-post/components/photo-edit-display';
import PhotoEditThumbnail from '@/features/register-post/components/photo-edit-thumbnail';

export default function PhotoEdit() {
  const [, setSelectedFiles] = useState<FileInfo[]>([]);
  const [selectedImages, setSelectedImages] = useState<
    { src: string; id: number }[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [, setFileIds] = useState<number[]>([]); // 파일 ID를 저장하는 배열

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
            id: number;
          }) => {
            // Blob을 URL로 변환하여 저장
            const objectURL = URL.createObjectURL(file.content);
            return {
              id: file.id,
              name: file.name,
              content: objectURL, // Blob을 URL로 변환하여 content에 저장
              type: file.type,
              size: file.size,
            };
          }
        );

        setSelectedFiles(fileData);
        setFileIds(fileData.map((file) => file.id));

        const images = fileData.map((file) => ({
          src: file.content,
          id: file.id,
        })); // URL 목록
        setSelectedImages(images);

        if (images.length > 0) {
          setSelectedImage(images[0].src); // 첫 번째 이미지를 기본 이미지로 설정
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

  // 파일 삭제 함수
  const handleDelete = (fileId: number) => {
    const request = indexedDB.open('fileDatabase', 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');

      // 파일을 ID로 삭제
      const deleteRequest = store.delete(fileId);

      deleteRequest.onsuccess = () => {
        console.log(`ID가 ${fileId}인 파일이 삭제되었습니다`);

        // 삭제 후 상태 업데이트: selectedFiles에서 해당 파일을 제외
        setSelectedFiles((prevFiles) => {
          const updatedFiles = prevFiles.filter((file) => file.id !== fileId);

          // selectedImages도 해당 파일을 제외한 이미지를 업데이트
          const updatedImages = updatedFiles.map((file) => ({
            src: file.content,
            id: file.id,
          }));
          setSelectedImages(updatedImages);

          return updatedFiles;
        });
      };

      deleteRequest.onerror = (e) => {
        console.error('파일 삭제 실패', e);
      };
    };
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 IndexedDB에서 파일 데이터를 불러옴
    loadFilesFromIndexedDB();
  }, []);

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
        onDeleteClick={handleDelete}
      />
    </div>
  );
}
