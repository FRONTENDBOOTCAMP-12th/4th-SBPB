'use client';
import { useState, useEffect } from 'react';
import { useUserProfileStore } from '@/store/user-profile-store';
import { PostData } from '@/types/post-data-types';
import PostHeader from '@/features/post-detail/components/post-header';
import PostImageSlider from '@/features/post-detail/components/post-image-slider';
import PostContent from '@/features/post-detail/components/post-content';
import PostSubsection from '@/features/post-detail/components/post-subsection';
import BackPageButton from '@/features/register-post/components/back-page-button';
import SubscriptDay from './subscript-day';

export default function MyPostList() {
  const { userInfo, fetchUser } = useUserProfileStore();

  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      await fetchUser();
      if (userInfo?.id) {
        const response = await fetch(`/api/user-posts?userId=${userInfo.id}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('게시글 불러오기 오류:', await response.text());
        }
      }
    };

    fetchPostData();
  }, [fetchUser, userInfo?.id]); // user.id가 변경되면 다시 요청

  if (posts.length === 0) {
    return <div>게시글 로딩 중...</div>; // 게시글 로딩 중
  }

  return (
    <div className="post-list">
      <div
        className="w-full h-70 bg-cover bg-center mb-[38px]"
        style={{ backgroundImage: `url('/cities/chungcheongbukdo.webp')` }}
      >
        <BackPageButton />
        <h1 className="border-solid border-b-[0.2px] text-2xl border-gray-400 mx-3 pt-8 mb-3 text-white">
          나의 게시글
        </h1>
        <SubscriptDay createdAt={userInfo?.created_at || ''} />
      </div>

      <h3 className="text-lg font-bold ml-4">게시글</h3>

      {posts.map((postData, index) => {
        // Process the images array here
        const images: string[] = [
          postData.image_url,
          ...(postData.other_images?.filter(
            (img): img is string => img != null
          ) || []), // null, undefined 제거하고 string만 필터링
        ];

        return (
          <div key={index}>
            <div className="pt-3 pb-4">
              <PostHeader postNumber={index + 1} />
            </div>

            <div className="post-detail-card bg-white h-[50%] min-h-[540px] w-[40%] min-w-[288px] rounded-2xl mx-auto shadow-right mb-10">
              <div className="rounded-2xl">
                <PostImageSlider images={images} />
              </div>

              <div className="h-[138px] overflow-scroll">
                <PostContent
                  title={postData.title}
                  content={postData.description}
                />
              </div>

              <div className="pl-3 pb-8 pt-2 rounded-b-2xl border-dashed border-t-1 border-gray-400">
                <PostSubsection
                  location={postData.location}
                  locationDetail={postData.location}
                  thumb={postData.thumbs}
                  comment={27}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
