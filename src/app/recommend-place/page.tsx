import RecommendPlaceClient from '@/features/recommend-place/components/recommend-place-client';
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

  const { data: signInUser, error } = await supabase.auth.getUser();

  if (error) return;

  const { data: areaData, error: areaError } = await supabase
    .from('userinfo')
    .select('interested_area')
    .eq('user_id', signInUser.user.id);

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
