import PostContent from '@/features/post-detail/components/post-content';
import PostHeader from '@/features/post-detail/components/post-header';
import PostImageSlider from '@/features/post-detail/components/post-image-slider';
import PostSubsection from '@/features/post-detail/components/post-subsection';

export default function PostDetail() {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="pt-3 pb-4">
        <PostHeader />
      </div>

      <div className="post-detail-card bg-white h-[50%] min-h-[540px] w-[40%] min-w-[288px] rounded-2xl mx-auto">
        <div className="rounded-2xl">
          <PostImageSlider
            images={['/sample.jpg', '/sample2.jpg', '/sample3.jpg']}
          />
        </div>

        <PostContent
          title="컨텐츠 제목"
          content="지나가다 보고 너무 예뻐서 저장해 놓았다가 이번에 가게 되었는데 너무 예쁘고 좋았어요. 분위기도 힙하고 새로 생겼는데 오래 동안 올 것 같아요"
        />

        <div className="pl-3 pb-8 pt-2 rounded-b-2xl border-dashed border-t-1 border-gray-400">
          <PostSubsection
            location="SANHO ST"
            locationDetail="산호지방 23구 2리"
            thumb={3032}
            comment={27}
          />
        </div>
      </div>
    </div>
  );
}
