'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PostImageSliderProps {
  images: string[]; // images는 슬라이더에서 보여줄 이미지들의 URL 배열입니다.
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000, // 슬라이드가 오른쪽(positive direction)으로 들어올 때 x 축을 1000만큼 이동시킴
    opacity: 0, // 처음 시작할 때 투명도를 0으로 설정
  }),
  center: {
    x: 0, // 현재 이미지가 화면의 중심에 오게 x 값을 0으로 설정
    opacity: 1, // 이미지가 화면에 나타날 때 투명도를 1로 설정
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000, // 슬라이드가 왼쪽(negative direction)으로 나갈 때 x 축을 1000만큼 이동시킴
    opacity: 0, // 나갈 때 이미지가 사라지도록 opacity를 0으로 설정
  }),
};

function PostImageSlider({ images }: PostImageSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = (index: number) => (index + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]); // 페이지를 업데이트하고, 이동 방향을 설정
  };

  return (
    <div className="relative w-full h-[232px] overflow-hidden rounded-t-2xl">
      {/* 애니메이션을 적용할 슬라이더 컴포넌트 */}
      <AnimatePresence initial={false} custom={direction}>
        {/* 슬라이더에서 각 이미지는 motion.div로 감싸고, key로 page를 설정해 주면 page가 변경될 때 애니메이션이 적용됩니다. */}
        <motion.div
          key={page} // page가 변경될 때마다 새로운 key가 들어가므로 애니메이션을 재실행합니다.
          custom={direction} // 방향을 custom prop으로 전달하여, 애니메이션에서 사용할 수 있도록 합니다.
          variants={variants} // variants 객체를 사용하여 enter, center, exit 상태를 정의
          initial="enter" // 처음 애니메이션 상태는 enter로 설정 (슬라이드가 들어올 때)
          animate="center" // 애니메이션이 진행되면 center로 설정 (현재 페이지가 화면 중앙에 오게)
          exit="exit" // exit 상태에서 나갈 때 애니메이션 설정 (슬라이드가 나갈 때)
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 50 }, // x 이동 애니메이션에 대한 세부 설정 (스프링 애니메이션)
            opacity: { duration: 0.2 }, // 투명도 변화에 대한 설정 (0.2초 동안 opacity를 변경)
          }}
          className="absolute w-full h-full" // 이미지가 전체 슬라이더 크기에 맞게 커버되도록 설정
        >
          <Image
            src={images[imageIndex(page)]}
            alt="게시글 이미지"
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 왼쪽 화살표 버튼 (슬라이드 왼쪽으로 이동) */}
      <div
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-[50%] h-[100%] cursor-pointer"
        onClick={() => paginate(-1)} // 왼쪽으로 슬라이드 이동
      ></div>

      {/* 오른쪽 화살표 버튼 (슬라이드 오른쪽으로 이동) */}
      <div
        className="absolute top-0 right-0 z-10 flex items-center justify-center w-[50%] h-[100%] cursor-pointer"
        onClick={() => paginate(1)} // 오른쪽으로 슬라이드 이동
      ></div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${imageIndex(page) === i ? 'bg-gray-200' : 'bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PostImageSlider;
