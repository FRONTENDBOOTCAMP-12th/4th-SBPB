'use client'

import { useState } from 'react'
import Image from 'next/image'

function NavItems() {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleClick = (item) => {
    setSelectedItem(item)
  }
  return (
    <nav className="bg-white fixed bottom-0 left-0 right-0">
      <ul className="flex flex-row items-center justify-center pb-4">
        <li
          onClick={() => handleClick('feed')}
          className={` ${selectedItem === 'feed' ? ' shadow-top' : ''} `}
        >
          <a href="#">
            <figure className="flex flex-col items-center px-3 py-2">
              <Image src="/paper.svg" width={24} height={24} alt="피드" />
              <figcaption>피드</figcaption>
            </figure>
          </a>
        </li>
        <li
          onClick={() => handleClick('search')}
          className={`relative ${selectedItem === 'search' ? 'mt-2 border-t-2 border-black' : ''} box-border`}
        >
          <a href="#">
            <figure className="flex flex-col items-center px-3 py-2">
              <Image src="/search.svg" width={24} height={24} alt="검색" />
              <figcaption>검색</figcaption>
            </figure>
          </a>
        </li>
        <li
          onClick={() => handleClick('plus')}
          className={`relative ${selectedItem === 'plus' ? 'border-t-2 border-black' : ''} box-border`}
        >
          <a href="#">
            <figure className="flex flex-col items-center px-3 py-2">
              <Image src="/plus.svg" width={24} height={24} alt="피드작성" />
              <figcaption>피드작성</figcaption>
            </figure>
          </a>
        </li>
        <li
          onClick={() => handleClick('subway')}
          className={`relative mt-2${selectedItem === 'subway' ? 'border-t-2 border-black' : ''} box-border`}
        >
          <a href="#">
            <figure className="flex flex-col items-center px-3 py-2">
              <Image
                src="/subway.svg"
                width={24}
                height={24}
                alt="여행지추천"
              />
              <figcaption>여행지추천</figcaption>
            </figure>
          </a>
        </li>
        <li
          onClick={() => handleClick('my')}
          className={`relative ${selectedItem === 'my' ? 'border-t-2 border-black' : ''} box-border`}
        >
          <a href="#">
            <figure className="flex flex-col items-center px-3 py-2">
              <Image src="/my.svg" width={24} height={24} alt="MY" />
              <figcaption>MY</figcaption>
            </figure>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavItems
