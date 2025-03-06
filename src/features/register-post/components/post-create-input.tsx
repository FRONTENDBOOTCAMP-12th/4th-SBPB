'use client'

import { useState, useEffect } from 'react'
import { PostCreateInputProps } from '@/features/register-post/types/post-create-input-field-props'

function PostCreateInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  customClass = '',
  textLimit = 20,
  isVisible = '',
}: PostCreateInputProps) {
  const [charCount, setCharCount] = useState(value.length)

  useEffect(() => {
    setCharCount(value.length)
  }, [value])

  return (
    <div>
      <label className="hidden">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-white w-[100%] h-[100%] rounded-tl-xl rounded-tr-xl p-3 placeholder-gray-600 "
          rows={20}
        />
      ) : (
        <div className="relative border-solid border-b-[0.2px] border-gray-200 mx-3 mt-[20px]">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-[90%] relative  item-center pb-1.5 ${customClass}`}
          />

          <div
            className={`absolute right-0 bottom-0 text-gray-400 text-sm ${isVisible}`}
          >
            <span className="text-white">{charCount}</span>
            {textLimit && `/${textLimit}`}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCreateInput
