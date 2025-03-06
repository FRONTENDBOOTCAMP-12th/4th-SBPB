'use client'

import BackPageButton from '@/features/register-post/components/back-page-button'
import LocationButton from '@/features/register-post/components/location-button'
import PostCreateButton from '@/features/register-post/components/post-create-button'
import PostCreateInput from '@/features/register-post/components/post-create-input'
import { useState } from 'react'

export default function Home() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="inset-0 h-screen flex flex-col gap-3 pt-16">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/sample.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between p-3">
        <BackPageButton />

        <div className="ml-auto m-2 top-0 z-20">
          <PostCreateButton />
        </div>
      </div>

      <div className="relative top-10 z-10 flex flex-col flex-grow  overflow-y-auto">
        <PostCreateInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          textLimit={20}
          customClass="text-3xl placeholder-white text-white"
          isVisible=""
        />

        <PostCreateInput
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다."
          customClass="text-sm placeholder-gray-400 text-gray-400"
          isVisible="hidden"
        />

        <div className="pt-[33px] pb-[53px]">
          <LocationButton />
        </div>

        <PostCreateInput
          label="description"
          value={description}
          type="textarea"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="내용 작성하기"
          customClass="text-sm placeholder-gray-400 text-gray-400"
          isVisible="hidden"
        />
      </div>
    </div>
  )
}
