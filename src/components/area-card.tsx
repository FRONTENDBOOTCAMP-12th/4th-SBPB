'use client';

import { AreaType } from '@/types/area-data-type';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';
import { SetStateAction } from 'react';
import Checked from './checked';
import Plus from './plus';

interface AreaCardProps {
  area: AreaType;
  areas: AreaType[];
  setAreas: React.Dispatch<SetStateAction<AreaType[]>>;
}

function AreaCard({ area, setAreas }: AreaCardProps) {
  const { name: cityName, enName: cityEnName, isSelected } = area;

  const bgColor = isSelected ? 'bg-gray-200' : 'bg-white';

  const handleClick = () => {
    setAreas((prevAreas) => {
      const selectedNum = prevAreas.filter((area) => area.isSelected).length;
      return prevAreas.map((area) => {
        if (area.name === cityName) {
          if (area.isSelected) return { ...area, isSelected: false };
          if (selectedNum < 3) return { ...area, isSelected: true };
        }
        return area;
      });
    });
  };

  return (
    <button
      className={tm(
        'rounded-xl size-[5.625rem] content-center relative',
        bgColor
      )}
      aria-pressed={isSelected}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-2 mt-2.5">
        <Image
          src={`/cities/${cityEnName}.webp`}
          alt={cityName}
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
        <h2 className="text-content-primary text-xs font-semibold">
          {cityName}
        </h2>
        {isSelected ? (
          <Checked className="absolute top-1 right-1 flex flex-col justify-center items-center bg-content-primary rounded-full p-0.5" />
        ) : (
          <Plus className="absolute top-1 right-1 flex flex-col justify-center items-center bg-content-primary rounded-full p-0.5" />
        )}
      </div>
    </button>
  );
}

export default AreaCard;
