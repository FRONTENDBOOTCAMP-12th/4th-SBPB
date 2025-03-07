import { PostSubsectionProps } from '../types/post-subsection-types';
import Image from 'next/image';

function PostSubsection({
  location,
  locationDetail,
  thumb,
  comment,
}: PostSubsectionProps) {
  return (
    <section className="flex flex-row items-center justify-between">
      <dl>
        <dt className="font-semibold text-xl">{location}</dt>
        <dd className="text-gray-600">{locationDetail}</dd>
      </dl>

      <div className="button flex flex-row">
        <button
          type="button"
          className="cursor-pointer flex flex-row gap-1 justify-center items-center mr-[17px]"
        >
          <Image src="/heart.svg" width={18} height={18} alt="좋아요" />
          {thumb}
        </button>

        <button
          type="button"
          className="cursor-pointer flex flex-row gap-1 justify-center items-center mr-[17px]"
        >
          <Image src="/comments-black.svg" width={18} height={18} alt="댓글" />
          {comment}
        </button>
      </div>
    </section>
  );
}

export default PostSubsection;
