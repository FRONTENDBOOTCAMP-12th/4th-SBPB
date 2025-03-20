import { usePlacesStore } from '@/store/user-place-store';
import Image from 'next/image';
import Link from 'next/link';

function LocationButton() {
  const { places } = usePlacesStore(); // zustand에서 places 상태 가져오기

  console.log(places);
  console.log(JSON.stringify(places));
  const placeNames = places.map((place) => place.place_name).join(', '); // places가 있으면 place_name을 쉼표로 구분하여 출력

  return (
    <Link
      href="/register-post/post-place"
      className="text-white flex flex-row items-center justify-center"
    >
      <Image src="/map.svg" width={18} height={18} alt="지도 아이콘" />
      <span>{placeNames || '장소 검색'}</span>
    </Link>
  );
}

export default LocationButton;
