'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'react-toastify'; // react-toastify import

interface NavItem {
  id: string;
  src: string;
  href: string;
  alt: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'feed', src: '/paper.svg', href: '/feed', alt: '피드', label: '피드' },
  { id: 'search', src: '/search.svg', href: '#', alt: '검색', label: '검색' },
  {
    id: 'plus',
    src: '/plus.svg',
    href: '/register-post/photo-upload',
    alt: '피드작성',
    label: '피드작성',
  },
  {
    id: 'subway',
    src: '/subway.svg',
    href: '#',
    alt: '여행지추천',
    label: '여행지추천',
  },
  { id: 'my', src: '/my.svg', href: '#', alt: 'MY', label: 'MY' },
];

function NavItems() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth');
    setIsAuthenticated(authStatus === 'true'); // 'true'로 저장된 값이 있으면 로그인 상태로 간주
  }, []);

  const handleClick = (id: string) => {
    setSelectedItem(id);

    // 피드작성(plus)와 MY(my)만 인증 여부 체크
    if ((id === 'plus' || id === 'my') && !isAuthenticated) {
      toast.error('로그인이 필요합니다!'); // 경고 메시지 표시
      return; // 링크로 진입하지 않음
    }
  };

  return (
    <nav className="bg-white fixed bottom-0 left-0 right-0">
      <ul className="flex flex-row items-center justify-center pb-4">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item.id)} // 클릭 시 로직 추가
            className={` ${selectedItem === item.id ? 'shadow-[0_-2px_0_0_black]' : ''} `}
          >
            <Link
              href={
                // 인증되지 않으면 '피드작성'과 'MY' 메뉴는 #으로 막고, 나머지는 정상 동작
                (item.id === 'plus' || item.id === 'my') && !isAuthenticated
                  ? '#'
                  : item.href
              }
            >
              <figure className="flex flex-col items-center px-2 py-2">
                <Image src={item.src} width={24} height={24} alt={item.alt} />
                <figcaption>{item.label}</figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavItems;
