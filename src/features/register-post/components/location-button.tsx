import Image from 'next/image'
import Link from 'next/link'

function LocationButton() {
  return (
    <Link
      href="#"
      className="text-white flex flex-row items-center justify-center"
    >
      <Image src="/map.svg" width={18} height={18} alt="지도 아이콘" />
      <span>장소 검색</span>
    </Link>
  )
}

export default LocationButton
