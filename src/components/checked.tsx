import Image from 'next/image';

interface CheckedProps {
  className?: string;
}

function Checked({ className }: CheckedProps) {
  return (
    <Image
      className={className}
      src="/checked.svg"
      alt="체크"
      width={14}
      height={14}
      priority
    />
  );
}

export default Checked;
