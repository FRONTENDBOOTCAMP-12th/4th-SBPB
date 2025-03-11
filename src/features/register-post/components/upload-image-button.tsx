'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { UploadImageButtonProps } from '../types/upload-image-button-props';
import { useRouter } from 'next/navigation';
import { FileInfo } from '../types/file-info';

function UploadImageButton({ onFilesSelected }: UploadImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [, setSelectedFiles] = useState<File[]>([]);

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    console.log(params);
    params.set(name, value);
    console.log(params);
    return params.toString();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles(newFiles);

      const filePromises: Promise<FileInfo>[] = newFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              content: base64data,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then((fileData) => {
        localStorage.setItem('selectedFiles', JSON.stringify(fileData)); // 파일 데이터(localStorage에 저장)
        onFilesSelected(newFiles); // 부모 컴포넌트로 파일 전달

        const fileNames = newFiles.map((file) => file.name);
        router.push(
          '/register-post/photo-edit' +
            '?' +
            createQueryString('image', JSON.stringify(fileNames))
        );
      });
    } else {
      onFilesSelected(null); // 파일이 없으면 null 전달
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div
        className="flex flex-row items-center justify-center border-2 border-solid border-white rounded-3xl h-10 p-2 
      "
      >
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
