'use client';

import NavItems from '@/components/nav-items';
import Profile from '@/components/profile';
import PostContent from '@/features/post-detail/components/post-content';
import PostHeader from '@/features/post-detail/components/post-header';
import PostImageSlider from '@/features/post-detail/components/post-image-slider';
import PostSubsection from '@/features/post-detail/components/post-subsection';
import { PostData } from '@/types/post-data-types';
import formatDate from '@/utils/format-date';
import { useState, useEffect } from 'react';

export default function PostDetail() {
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    setPostId(postId);
  }, []);

  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    if (postId) {
      const fetchPostData = async () => {
        const response = await fetch(`/api/post-detail?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPostData(data);
        } else {
          console.error('게시글 불러오기 오류:', await response.text());
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
        <PostHeader createdAt={formatDate(postData.created_at)} />
      </div>

      <div className="post-detail-card bg-white h-[50%] min-h-[540px] w-[40%] min-w-[288px] rounded-2xl mx-auto shadow">
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
