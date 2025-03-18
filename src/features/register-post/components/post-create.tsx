'use client';

import BackPageButton from '@/features/register-post/components/back-page-button';
import LocationButton from '@/features/register-post/components/location-button';
import PostCreateButton from '@/features/register-post/components/post-create-button';
import PostCreateInput from '@/features/register-post/components/post-create-input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TagInput from './tag-input';

// IndexedDB에서 파일을 불러오는 함수
const loadFilesFromIndexedDB = () => {
  return new Promise<{ content: File }[]>((resolve, reject) => {
    const request = indexedDB.open('fileDatabase', 1);
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      const transaction = db.transaction('files', 'readonly');
      const store = transaction.objectStore('files');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result as { content: File }[]);
      };

      getAllRequest.onerror = () => {
        reject('IndexedDB에서 파일을 불러오는 것에 실패했습니다.');
      };
    };

    request.onerror = () => {
      reject('IndexedDB를 open 하는 것에 실패했습니다.');
    };
  });
};

export default function PostCreate() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const router = useRouter();

  // 페이지가 로드될 때 IndexedDB에서 파일을 불러와 첫 번째 이미지를 배경으로 설정
  useEffect(() => {
    const fetchFilesAndSetBgImage = async () => {
      try {
        const files = await loadFilesFromIndexedDB();

        console.log(files);
        if (files.length > 0) {
          const file = files[0].content;
          const imageUrl = URL.createObjectURL(file);
          setBgImage(imageUrl);
        }
      } catch (error) {
        console.error('IndexedDB에서 로딩 중 에러:', error);
      }
    };
    fetchFilesAndSetBgImage();
  }, []);

  const handleUpload = async () => {
    if (!bgImage) {
      alert('배경 이미지가 없습니다!!');
      return;
    }

    try {
      const files = await loadFilesFromIndexedDB();
      const formData = new FormData();

      formData.append('title', title);
      formData.append('tags', tags.join(','));
      formData.append('description', description);

      files.forEach((fileObj) => {
        formData.append('files', fileObj.content);
      });

      const response = await fetch('/api/post-create', {
        method: 'POST',
        body: formData,
      });

      // Check if response is successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert('서버에서 에러가 발생했습니다.');
        return;
      }

      const result = await response.json();

      if (result.postId) {
        alert('게시물이 성공적으로 업로드되었습니다!');
        router.push(`/post-detail?postId=${result.postId}`);
      } else {
        alert('게시물 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('파일 업로드 중 에러:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col pt-16 bg-primary">
      <div className="fixed inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage || '/sample.jpg'})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between p-3">
        <BackPageButton />

        <div className="ml-auto m-2 top-0 z-20">
          <PostCreateButton onClick={handleUpload} />
        </div>
      </div>

      <div className="relative top-10 z-10 flex flex-col overflow-y-auto">
        <PostCreateInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          textLimit={20}
          customClass="text-3xl placeholder-white text-white"
          isVisible=""
        />

        <TagInput label="태그" tags={tags} setTags={setTags} />

        <div className="pt-[33px] pb-[53px]">
          <LocationButton />
        </div>

        <PostCreateInput
          label="description"
          value={description}
          type="textarea"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="내용 작성하기"
          customClass="text-sm placeholder-gray-400 text-gray-400"
          isVisible="hidden"
        />
      </div>
    </div>
  );
}
