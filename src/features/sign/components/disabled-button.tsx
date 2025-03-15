import { tm } from '@/utils/tw-merge';
import type { DisabledButtonProps } from '../types/disabled-button-props';

function DisabledButton({
  label,
  className,
  ...restProps
}: DisabledButtonProps) {
  return (
    <button
      className={tm(
        'flex justify-center gap-2 w-[15.625rem] py-3 rounded-sm bg-gray-200 text-gray-500 text-xs cursor-not-allowed',
        className
      )}
      {...restProps}
    >
      {label}
    </button>
  );
}

export default DisabledButton;
