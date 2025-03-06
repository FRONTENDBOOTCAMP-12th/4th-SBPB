import Image from 'next/image';

interface PlusProps {
  className?: string;
}

function Plus({ className }: PlusProps) {
  return (
    <figure className={className}>
      <Image
        src="/plus-white.svg"
        alt="더하기"
        width={14}
        height={14}
        priority
      />
    </figure>
  );
}

export default Plus;
