import Image from 'next/image';
import TagItem from './tag-item';

interface PostCardProps {
  tags: string[];
  images: string[];
}

function PostCard({ tags, images }: PostCardProps) {
  return (
    <article className="py-3.5 px-3 bg-gray-50">
      <div className="flex gap-2">
        <Image
          src="/cities/busan.webp"
          alt="유저"
          width={30}
          height={30}
          className="rounded-2xl"
        />
        <div className="flex flex-col mr-auto">
          <span className="text-xs font-semibold">사용자 이름</span>
          <span className="text-xs text-content-tertiary">
            게시글 112 • 팔로워 46
          </span>
        </div>
        <button
          type="button"
          className="bg-content-primary text-white px-3.5 py-1.5 rounded-full text-xs self-center"
        >
          팔로우
        </button>
      </div>
      <ul className="flex gap-1 mt-3">
        {tags.map((tag) => (
          <TagItem tag={tag} key={tag} />
        ))}
      </ul>
      <div
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="rounded-l-lg overflow-x-auto scroll-snap-x mandatory whitespace-nowrap flex gap-0.5 mt-1.5"
      >
        {images.map((image, idx) => (
          <Image
            className="w-[100px] h-[100px] object-cover"
            key={idx}
            src={image}
            alt="부산"
            width={100}
            height={100}
          />
        ))}
      </div>
    </article>
  );
}

export default PostCard;
