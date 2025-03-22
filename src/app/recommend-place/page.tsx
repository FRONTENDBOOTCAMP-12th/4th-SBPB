import RecommendPlaceClient from '@/features/recommend-place/components/recommend-place-client';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '여행지 추천',
};

async function RecommendPlacePage() {
  const supabase = await createClient();

  // tag 프로미스
  const tagPromise = supabase.from('post').select('tags').range(0, 49);

  // post 프로미스
  const postPromise = supabase
    .from('post')
    .select('*')
    .order('thumbs', { ascending: false });

  // user 프로미스
  const userPromise = supabase.auth.getUser();

  const [{ data: tagData }, { data: posts }, { data: signInUser }] =
    await Promise.all([tagPromise, postPromise, userPromise]);

  if (!signInUser.user) {
    redirect('/signin');
  }

  const tags = Array.from(
    new Set(
      tagData?.flatMap((tag) => {
        return tag.tags.split(',');
      })
    )
  );

  const userIds = [...new Set(posts?.map((post) => post.user_id))];

  // 유저 정보 가져오기
  const { data: userData, error: userError } = await supabase
    .from('userinfo')
    .select('id, nickname, profile_path')
    .in('id', userIds);

  if (userError) {
    console.error('유저 정보 로드 중 에러 :', userError);
    return;
  }

  const userMap = new Map(userData?.map((user) => [user.id, user]));

  const { data: areaData, error: areaError } = await supabase
    .from('userinfo')
    .select('interested_area')
    .eq('user_id', signInUser?.user?.id);

  if (areaError) {
    console.error(areaError);
    return;
  }

  return (
    <RecommendPlaceClient
      posts={posts}
      tags={tags}
      areas={areaData[0]}
      userMap={Object.fromEntries(userMap)}
    />
  );
}

export default RecommendPlacePage;
