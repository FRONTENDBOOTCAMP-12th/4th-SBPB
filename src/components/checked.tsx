import Image from 'next/image';

interface CheckedProps {
  className?: string;
}

function Checked({ className }: CheckedProps) {
  return (
    <figure className={className}>
      <Image src="/checked.svg" alt="체크" width={14} height={14} priority />
    </figure>
  );
}

export default Checked;
