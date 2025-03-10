'use client';

import BackPageButton from '@/features/register-post/components/back-page-button';
import UploadImageButton from '@/features/register-post/components/upload-image-button';
import { useState } from 'react';

export default function PhotoUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const handleFilesSelected = (files: File[] | null) => {
    if (files) {
      setSelectedFiles(files); // 선택된 파일들을 상태로 저장
    } else {
      setSelectedFiles(null); // 파일이 없으면 null로 설정
    }
  };

  return (
    <div className="bg-(--color-primary)">
      <BackPageButton />
      <UploadImageButton onFilesSelected={handleFilesSelected} />
    </div>
  );
}
