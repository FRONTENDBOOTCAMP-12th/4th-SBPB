'use client';

import BackPageButton from '@/features/register-post/components/back-page-button';
import LocationButton from '@/features/register-post/components/location-button';
import PostCreateButton from '@/features/register-post/components/post-create-button';
import PostCreateInput from '@/features/register-post/components/post-create-input';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

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

export default function Home() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [bgImage, setBgImage] = useState<string | null>(null);

  // 페이지가 로드될 때 IndexedDB에서 파일을 불러와 첫 번째 이미지를 배경으로 설정
  useEffect(() => {
    const fetchFilesAndSetBgImage = async () => {
      try {
        const files = await loadFilesFromIndexedDB();
        if (files.length > 0) {
          // 첫 번째 파일을 선택하여 배경 이미지로 설정
          const file = files[0].content;
          const imageUrl = URL.createObjectURL(file); // File을 URL로 변환
          setBgImage(imageUrl);
        }
      } catch (error) {
        console.error('IndexedDB에서 로딩 중 에러:', error);
      }
    };
    fetchFilesAndSetBgImage();
  }, []);

  const handleUpload = async () => {
    const supabase = await createClient();

    if (!bgImage) {
      alert('배경 이미지가 없습니다!!');
      return;
    }

    // IndexedDB에서 파일을 불러와 Supabase에 업로드할 준비
    try {
      const files = await loadFilesFromIndexedDB();

      const fileNames: string[] = [];

      // 파일들을 Supabase에 업로드
      for (const fileObj of files) {
        const file = fileObj.content;
        const fileName = `images/${Date.now()}-${file.name}`;

        // 파일을 Supabase에 업로드
        const { error } = await supabase.storage
          .from('images')
          .upload(fileName, file);

        if (error) {
          console.error('storage 이미지 업로드 중 에러:', error);
          return;
        }
        fileNames.push(fileName); // 업로드된 파일 이름을 기록
      }

      // 이미지 URL 얻기
      const imageUrls = fileNames.map((fileName) => {
        return supabase.storage.from('images').getPublicUrl(fileName).data
          .publicUrl;
      });

      // 게시글 데이터 Supabase에 삽입
      const { error: insertError } = await supabase.from('post').insert([
        {
          title,
          tags,
          description,
          image_url: imageUrls[0],
          other_images: imageUrls.slice(1),
        },
      ]);

      if (insertError) {
        console.error('insert 중 에러 발생:', insertError);
      } else {
        alert('슈퍼베이스 테이블에 성공적으로 반영되었습니다.');

        setTitle('');
        setTags('');
        setDescription('');
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
            backgroundImage: `url(${bgImage || '/sample.jpg'})`, // 배경 이미지 설정
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

      <div className="relative top-10 z-10 flex flex-col overflow-y-auto ">
        <PostCreateInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          textLimit={20}
          customClass="text-3xl placeholder-white text-white"
          isVisible=""
        />

        <PostCreateInput
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다."
          customClass="text-sm placeholder-gray-400 text-gray-400"
          isVisible="hidden"
        />

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
