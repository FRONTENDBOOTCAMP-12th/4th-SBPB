'use client';

import Image from 'next/image';
import PostModal from '@/features/post-detail/components/post-modal';
import { useState } from 'react';

function PostHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);
  const handleEdit = (): void => {
    console.log('수정');
  };

  const handleDelete = (): void => {
    console.log('삭제');
  };
  return (
    <div className="flex flex-row items-center px-3.5 z-10000 relative">
      <div className="bg-black rounded-full flex items-center justify-center w-10 h-10 mr-1">
        <Image
          src="/paper-white.svg"
          width={18}
          height={18}
          alt="목록 아이콘"
        />
      </div>
      <p className="font-Pretendard font-semibold">작성 일자</p>
      <button
        type="button"
        className="ml-auto cursor-pointer"
        onClick={toggleModal}
      >
        <Image
          src="/menu.svg"
          width={15}
          height={15}
          alt="메뉴"
          className="mx-2"
        />
      </button>

      {isModalOpen && (
        <div className="absolute top-full mt-1 right-2 z-100">
          <PostModal onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default PostHeader;
