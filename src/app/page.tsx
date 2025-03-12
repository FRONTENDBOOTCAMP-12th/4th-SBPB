'use client';

import Nav from '@/components/nav-items';
import PostPlace from '@/app/post-place/page';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth) {
      setIsLoading(false);
      router.push('/feed');
    } else {
      router.push('/signin');
    }
  }, []);

  if (!isLoading) {
    return (
      <>
        <Nav />
        <PostPlace />
      </>
    );
  }
}
