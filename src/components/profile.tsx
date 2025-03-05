'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GuestProfile = () => (
  <div
    className={`
		w-full h-46 py-8 px-6 bg-primary text-white
		flex flex-col justify-center items-center
	`}
  >
    <h2 className={`text-center font-semibold pb-2`}>비회원</h2>
    <div className={`flex gap-3`}>
      <Link
        href={`/signin`}
        className={`
					w-24 px-4 py-2 bg-white text-primary text-center
					flex justify-center items-center rounded-sm hover:bg-accent/80 duration-300
				`}
      >
        로그인
      </Link>
      <Link
        href={`/signup`}
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

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [nickname, setNickname] = useState<string | null>('닉네임');

  interface StatsTypes {
    posts: number;
    photos: number;
    following: number;
    followers: number;
  }

  const [stats, setStats] = useState<StatsTypes>({
    posts: 1000,
    photos: 10000,
    following: 1,
    followers: 10,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

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
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필 이미지"
            width={100}
            height={100}
            className={`rounded-full`}
          />
        ) : (
          <span className="text-sm">img</span>
        )}
        <label
          htmlFor="file-upload"
          aria-label="프로필 이미지 선택"
          className={`
				bg-white rounded-full p-1.5 cursor-pointer
				hover:bg-accent duration-300 absolute -bottom-2 -right-1
				`}
        >
          <Image
            src="/pen.svg"
            alt="프로필 이미지 선택"
            width={14}
            height={14}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className={`flex flex-col`}>
        <p className={`font-semibold pb-1`}>{nickname}</p>
        <ul className={`w-full flex gap-2 text-xs`}>
          <li
            className={`relative pr-3 text-center
							after:content-[''] after:block after:absolute 
							after:right-0 after:top-0 after:w-[1px] after:h-full after:bg-white
							`}
          >
            게시글
            <br />
            <span className={`flex justify-center pt-1 text-center`}>
              {stats.posts}
            </span>
          </li>
          <li
            className={`relative pr-3 text-center
							after:content-[''] after:block after:absolute after:right-0 after:top-0
							after:w-[1px] after:h-full after:bg-white
							`}
          >
            사진
            <br />
            <span className={`flex justify-center pt-1`}>{stats.photos}</span>
          </li>
          <li
            className={`relative pr-3 text-center
							after:content-[''] after:block after:absolute after:right-0 after:top-0
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
      </div>
    </div>
  );
};

function Profile() {
  return (
    <>
      <GuestProfile />
      <UserProfile />
    </>
  );
}

export default Profile;
