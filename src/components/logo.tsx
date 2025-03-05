import Image from 'next/image';

function Logo() {
  return (
    <figure className="flex justify-center">
      <Image src="/logo.svg" alt="로고" width={245} height={140} />
      <figcaption className="sr-only">로고</figcaption>
    </figure>
  );
}

export default Logo;
