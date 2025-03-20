import Image from 'next/image';
import TagItem from './tag-item';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

interface PostCardProps {
  postData: {
    tags: string[];
    images: string[];
    userId: string;
    postId: string;
  };
}

async function PostCard({ postData }: PostCardProps) {
  const supabase = await createClient();

  const { tags, images, userId, postId } = postData;

  // 유저 정보 가져오기
  const { data: user, error } = await supabase
    .from('userinfo')
    .select('nickname, profile_path')
    .eq('id', userId);

  if (error) {
    console.error('유저 정보를 갖고 오는 중 에러발생 :', error);
  }

  const profile = user?.[0].profile_path ?? '';
  const nickname = user?.[0].nickname ?? '닉네임 없음';

  return (
    <article className="relative py-3.5 px-3 bg-gray-50">
      <button
        type="button"
        className="bg-content-primary text-white px-3.5 py-1.5 rounded-full text-xs self-center absolute top-[15px] right-[10px]"
      >
        팔로우
      </button>
      <Link href={`/post-detail?postId=${postId}`}>
        <div className="flex gap-2">
          <Image
            src={profile}
            alt={nickname}
            width={30}
            height={30}
            className="rounded-2xl w-[30px] h-[30px] object-cover"
          />
          <div className="flex flex-col mr-auto">
            <span className="text-xs font-semibold">{nickname}</span>
            <span className="text-xs text-content-tertiary">
              게시글 112 • 팔로워 46
            </span>
          </div>
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
      </Link>
    </article>
  );
}
export default PostCard;
