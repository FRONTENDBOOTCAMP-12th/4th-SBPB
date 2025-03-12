'use client';

import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import PostContent from '@/features/post-detail/components/post-content';
import PostHeader from '@/features/post-detail/components/post-header';
import PostImageSlider from '@/features/post-detail/components/post-image-slider';
import PostSubsection from '@/features/post-detail/components/post-subsection';
import { PostData } from '@/types/post-data-types';
import { createClient } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const supabase = createClient();

export default function PostDetail() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  console.log(searchParams);
  console.log(postId);

  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    if (postId) {
      const fetchPostData = async () => {
        const { data, error } = await supabase
          .from('post')
          .select(
            `
            id, title, description, image_url, thumbs, created_at, image_url, other_images, location
          `
          )
          .eq('id', postId)
          .single(); // 하나의 데이터만 가져오기

        if (error) {
          console.error('게시글 불러오기 오류:', error);
        } else {
          setPostData(data); // 데이터 설정
        }
      };

      fetchPostData();
    }
  }, [postId]);

  if (!postData) {
    return <div>Loading...</div>; // 데이터가 없으면 로딩 상태 표시
  }

  const images: string[] = [
    postData.image_url,
    ...(postData.other_images?.filter((img): img is string => img != null) ||
      []), // null, undefined 제거하고 string만 필터링
  ];

  return (
    <div className="bg-gray-50 h-screen">
      <Profile />
      <div className="pt-3 pb-4">
        <PostHeader />
      </div>

      <div className="post-detail-card bg-white h-[50%] min-h-[540px] w-[40%] min-w-[288px] rounded-2xl mx-auto">
        <div className="rounded-2xl">
          <PostImageSlider images={images} />
        </div>

        <PostContent title={postData.title} content={postData.description} />

        <div className="pl-3 pb-8 pt-2 rounded-b-2xl border-dashed border-t-1 border-gray-400">
          <PostSubsection
            location={postData.location}
            locationDetail={postData.location}
            thumb={postData.thumbs}
            comment={27}
          />
        </div>
      </div>
      <NavItems />
    </div>
  );
}
