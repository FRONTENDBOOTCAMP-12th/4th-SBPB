'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

function BackPageButton() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <button onClick={handleGoBack} className="bg-transparent ">
      <Image src="/left.svg" width={46} height={46} alt="이전 페이지" />
    </button>
  )
}

export default BackPageButton
