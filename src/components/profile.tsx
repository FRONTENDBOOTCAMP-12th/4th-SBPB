'use client';

import { useEffect, useRef, useState } from 'react';
import { useUserProfileStore } from '@/store/user-profile-store';
import Image from 'next/image';
import Link from 'next/link';

function Profile() {
  const {
    user,
    userInfo,
    stats,
    fetchUser,
    updateProfileImage,
    logout,
    updateNickname,
    triggerFeedRefresh,
  } = useUserProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nicknameInput, setNicknameInput] = useState<string>(
    userInfo?.nickname || ''
  );

  const handleNicknameSave = async () => {
    if (nicknameInput.trim() && nicknameInput !== userInfo?.nickname) {
      await updateNickname(nicknameInput); // supabase에 업데이트
      triggerFeedRefresh();
      setIsEditing(false);
    } else {
      setIsEditing(false); // 변경 없으면 취소
    }
  };

  // useEffect로 유저 정보 새로 불러왔을 때 input 초기화
  useEffect(() => {
    setNicknameInput(userInfo?.nickname || '');
  }, [userInfo]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await updateProfileImage(file);
      e.target.value = '';
    }
  };

  if (!user) {
    return (
      <div
        className={`
				w-full h-46 py-8 px-6 bg-primary text-white
				flex flex-col justify-center items-center
			`}
      >
        <h2 className={`text-center font-semibold pb-2`}>비회원</h2>
        <div className={`flex gap-3`}>
          <Link
            href="/signin"
            className={`
							w-24 px-4 py-2 bg-white text-primary text-center
							flex justify-center items-center rounded-sm hover:bg-accent/80 duration-300
						`}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className={`
							w-24 px-4 py-2 border border-white text-white text-center
							flex justify-center items-center rounded-sm hover:bg-accent/80 duration-300
						`}
          >
            회원가입
          </Link>
        </div>
        <p className={`text-sm mt-2 text-white text-center`}>
          로그인 후 <br /> 다양한 기능을 경험해보세요.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
		w-full h-46 py-8 px-6 bg-primary text-white
		flex justify-center items-center gap-5
	`}
    >
      <div
        className={`
				w-16 h-16 text-white border-5 border-white rounded-full
				flex justify-center items-center relative
			`}
      >
        {userInfo?.profile_path ? (
          <Image
            src={userInfo.profile_path}
            alt="프로필 이미지"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <span className="text-sm">img</span>
        )}

        <label
          htmlFor="file-upload"
          className={`
				bg-white rounded-full p-1.5 cursor-pointer
				hover:bg-accent duration-300 absolute -bottom-2 -right-1
				`}
          onClick={handleFileButtonClick}
        >
          <Image
            src="/pen.svg"
            alt="프로필 이미지 변경"
            width={14}
            height={14}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>

      <div className={`flex flex-col`}>
        {isEditing ? (
          <div className={`flex items-center gap-2 pb-1`}>
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              className={`w-24 px-2 py-1 text-white rounded-sm 
								text-sm border border-white`}
            />
            <button
              onClick={handleNicknameSave}
              className={`text-xs bg-white text-primary
								py-1 px-2 rounded-sm
								hover:bg-accent duration-300`}
            >
              저장
            </button>
          </div>
        ) : (
          <p
            className={`flex items-center gap-2 font-semibold pb-1`}
            onClick={() => setIsEditing(true)}
          >
            {nicknameInput || '닉네임'}{' '}
            <span
              className={`text-xs bg-white text-primary
								p-1.5 rounded-full
								hover:bg-accent duration-300`}
            >
              <Image
                src="/pen.svg"
                alt="프로필 이미지 변경"
                width={14}
                height={14}
              />
            </span>
          </p>
        )}

        <ul className={`w-full flex gap-2 text-xs`}>
          <li
            className={`relative pr-3 text-center 
							after:content-[''] after:block after:absolute 
							after:right-0	after:top-0 after:w-[1px] after:h-full after:bg-white
							`}
          >
            게시글
            <br />
            <span className={`flex justify-center pt-1 text-center`}>
              {stats.posts}
            </span>
          </li>
          <li
            className={`relative pr-3 text-center after:content-[''] 
							after:block after:absolute after:right-0 after:top-0 
							after:w-[1px] after:h-full after:bg-white
							`}
          >
            사진
            <br />
            <span className={`flex justify-center pt-1`}>{stats.photos}</span>
          </li>
          <li
            className={`relative pr-3 text-center after:content-[''] 
							after:block after:absolute after:right-0 after:top-0 
							after:w-[1px] after:h-full after:bg-white
							`}
          >
            팔로잉
            <br />
            <span className={`flex justify-center pt-1`}>
              {stats.following}
            </span>
          </li>
          <li>
            팔로워
            <br />
            <span className={`flex justify-center pt-1`}>
              {stats.followers}
            </span>
          </li>
        </ul>
        <button
          onClick={logout}
          className={`
						mt-2 px-4 py-2 bg-white text-primary 
						rounded-sm hover:bg-accent/80 duration-300
					`}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Profile;
