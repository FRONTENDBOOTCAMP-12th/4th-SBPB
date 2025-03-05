'use client'

import { useState } from 'react'
import Image from 'next/image'

interface NavItem {
  id: string
  src: string
  alt: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'feed', src: '/paper.svg', alt: '피드', label: '피드' },
  { id: 'search', src: '/search.svg', alt: '검색', label: '검색' },
  { id: 'plus', src: '/plus.svg', alt: '피드작성', label: '피드작성' },
  { id: 'subway', src: '/subway.svg', alt: '여행지추천', label: '여행지추천' },
  { id: 'my', src: '/my.svg', alt: 'MY', label: 'MY' },
]

function NavItems() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setSelectedItem(id)
  }

  return (
    <nav className="bg-white fixed bottom-0 left-0 right-0">
      <ul className="flex flex-row items-center justify-center pb-4">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={` ${selectedItem === item.id ? 'shadow-[0_-2px_0_0_black]' : ''} `}
          >
            <a href="#">
              <figure className="flex flex-col items-center px-3 py-2">
                <Image src={item.src} width={24} height={24} alt={item.alt} />
                <figcaption>{item.label}</figcaption>
              </figure>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavItems
