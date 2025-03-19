import NavItems from '@/components/nav-items';
import PostCard from '@/features/recommend-place/components/post-card';
import TagFilter from '@/features/recommend-place/components/tag-filter';
import ThemeBar from '@/features/recommend-place/components/theme-bar';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '여행지 추천',
};

async function RecommendPlacePage() {
  const supabase = await createClient();

  // 태그 정보 가져오기
  const { data: tagData, error: tagError } = await supabase
    .from('post')
    .select('tags')
    .range(0, 49);

  if (tagError) {
    console.error(tagError);
    return;
  }

  const tagArr = tagData.flatMap((tag) => {
    return tag.tags.split(',');
  });

  const tags = Array.from(new Set(tagArr));

  // 게시글 정보 가져오기
  const { data: posts, error: postError } = await supabase
    .from('post')
    .select('*')
    .order('thumbs', { ascending: false })
    .limit(20);

  if (postError) {
    console.error(
      '게시글 정보를 갖고 오는 중 오류가 발생하였습니다 :',
      postError
    );
  }

  return (
    <section>
      <ThemeBar />
      <TagFilter tags={tags} />
      <ul>
        {posts?.map((post) => {
          const tags = post.tags.split(',');
          const images = [post.image_url, ...post.other_images];
          const userId = post.user_id;

          return (
            <PostCard
              key={post.id}
              tags={tags}
              images={images}
              userId={userId}
            />
          );
        })}
      </ul>
      <NavItems />
    </section>
  );
}

export default RecommendPlacePage;
