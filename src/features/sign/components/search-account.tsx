'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProfileModal from './profile-modal';
import SignButton from './sign-button';

function SearchAccount() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 my-6">
      <SignButton
        label="회원가입"
        className="mx-auto"
        onClick={handleModalOpen}
      />
      <ProfileModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <Link
        className="flex justify-center gap-2 w-[15.625rem] py-3 rounded-sm bg-content-primary text-white border border-white text-xs mx-auto"
        href="/feed"
      >
        비회원으로 시작하기
      </Link>
    </div>
  );
}

export default SearchAccount;
