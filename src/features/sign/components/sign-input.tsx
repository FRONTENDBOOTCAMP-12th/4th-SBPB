'use client';

import { useId, useState } from 'react';
import { tm } from '@/utils/tw-merge';

type SignInputProps = React.ComponentProps<'input'> & {
  label?: string;
  isLabelShow?: boolean;
};

function SignInput({
  label = '',
  type = 'text',
  isLabelShow = false,
  ...restProps
}: SignInputProps) {
  const id = useId();
  const [userInput, setUserInput] = useState<string | number>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="flex flex-col gap-0.5 w-[15.625rem]">
      <label
        className={tm('text-xs text-white', { 'sr-only': !isLabelShow })}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="border border-white py-3 px-5 text-white rounded-sm text-xs placeholder:text-white"
        id={id}
        type={type}
        onChange={handleInputChange}
        value={userInput}
        {...restProps}
      />
    </div>
  );
}

export default SignInput;
