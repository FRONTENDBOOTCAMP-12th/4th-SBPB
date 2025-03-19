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

  const { data, error } = await supabase
    .from('post')
    .select('tags')
    .range(0, 49);

  if (error) {
    console.error(error);
    return;
  }

  const tagArr = data.flatMap((tag) => {
    return tag.tags.split(',');
  });

  const tags = Array.from(new Set(tagArr));

  return (
    <section>
      <ThemeBar />
      <TagFilter tags={tags} />
      <PostCard />
      <NavItems />
    </section>
  );
}

export default RecommendPlacePage;
