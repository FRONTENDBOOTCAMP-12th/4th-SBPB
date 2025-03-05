'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

const PreviousPageButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <button
      onClick={handleGoBack}
      className="bg-transparent fixed top-0 left-0 m-1"
    >
      <Image src="/left.svg" width={46} height={46} alt="이전 페이지" />
    </button>
  )
}

export default PreviousPageButton
