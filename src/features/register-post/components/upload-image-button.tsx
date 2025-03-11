'use client';

import { useState, useRef, useCallback } from 'react';
import { UploadImageButtonProps } from '../types/upload-image-button-props';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function UploadImageButton({ onFilesSelected }: UploadImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [, setSelectedFiles] = useState<File[]>([]);

  // IndexedDB에 파일 저장 함수
  const saveFileToIndexedDB = (file: File) => {
    const request = indexedDB.open('fileDatabase', 1);

    // 데이터베이스가 없으면 생성
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
    };

    request.onerror = (event) => {
      console.error('IndexedDB 에러:', event);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');

      // 파일을 IndexedDB에 저장
      const fileData = {
        id: file.name,
        name: file.name,
        type: file.type,
        size: file.size,
        content: file, // 파일 자체를 저장
      };

      store.put(fileData);
    };
  };

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles(newFiles);

      // IndexedDB에 파일 저장
      newFiles.forEach((file) => {
        saveFileToIndexedDB(file); // IndexedDB에 파일 저장
      });

      onFilesSelected(newFiles); // 부모 컴포넌트로 파일 전달

      const fileNames = newFiles.map((file) => file.name);
      router.push(
        '/register-post/photo-edit' +
          '?' +
          createQueryString('image', JSON.stringify(fileNames))
      );
    } else {
      onFilesSelected(null); // 파일이 없으면 null 전달
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-row items-center justify-center border-2 border-solid border-white rounded-3xl h-10 p-2">
        <Image
          src="/photo.svg"
          width={24}
          height={24}
          alt="사진 아이콘"
          className="mr-1"
        />
        <input
          ref={fileInputRef}
          key={Date.now()}
          type="file"
          multiple
          accept="image/*"
          id="upload-image"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="upload-image"
          className="cursor-pointer bg-transparent border-none p-0 m-0 text-white "
        >
          사진을 선택하세요
        </label>
      </div>
    </div>
  );
}

export default UploadImageButton;
