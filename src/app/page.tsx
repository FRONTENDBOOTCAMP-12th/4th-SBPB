'use client';

import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import FeedCardList from '@/features/feed/components/feed-card-list';
import { tm } from '@/utils/tw-merge';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth) {
      setIsLoading(false);
    } else {
      router.push('/signin');
    }
  }, [router]);

  if (!isLoading) {
    return (
      <div className={tm('w-80 m-auto flex flex-col items-center pb-24')}>
        <Profile />
        <FeedCardList />
        <NavItems />
      </div>
    );
  }
}
