import React, { useState } from 'react';
import Image from 'next/image';
import { PlaceItemProps } from '@/features/post-place/types/place-type';

const PlaceItem: React.FC<PlaceItemProps> = ({
  index,
  place,
  onClick,
  marker,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick(place, marker);
  };

  return (
    <li
      className={`item ${isSelected ? 'selected' : ''} rounded-lg`}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        backgroundColor: isSelected ? '#0D0E0F' : 'white',
        color: isSelected ? 'white' : 'black',
      }}
    >
      <div className="flex flex-row items-center justify-center">
        <span className={`markerbg marker_${index + 1}`}></span>
      </div>

      <div className="info">
        <div className="flex flex-row justify-between">
          <h5 className="font-bold">{place.place_name}</h5>
          {isSelected ? (
            <Image
              src="/checked.svg"
              width={12}
              height={12}
              alt="장소 검색"
              priority={true}
            />
          ) : (
            ''
          )}
        </div>
        {place.road_address_name ? (
          <>
            <span>{place.road_address_name}</span>
            <span className="jibun gray">{place.address_name}</span>
          </>
        ) : (
          <span>{place.address_name}</span>
        )}
      </div>
    </li>
  );
};

export default PlaceItem;
