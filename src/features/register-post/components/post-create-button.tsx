import Image from 'next/image';

interface PostCreateButtonProps {
  onClick: () => void;
}

function PostCreateButton({ onClick }: PostCreateButtonProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="p-3 border-1 border-solid border-white rounded-3xl w-[89px] cursor-pointer"
    >
      <figure className="flex">
        <Image src="/check.svg" width={24} height={24} alt="체크 아이콘" />
        <figcaption className="text-white">등록</figcaption>
      </figure>
    </button>
  );
}

export default PostCreateButton;
