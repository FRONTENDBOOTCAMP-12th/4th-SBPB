'use client';
import { useState } from 'react';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';

function LeaveComment() {
  const [comment, setComment] = useState('');
  //const { user } = useUser(); //인증된 사용자 정보

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return;
    alert('댓글을 입력해주세요.');

    try {
      const res = await fetch('/api/comment-modal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          parent_comment_id: null,
          //post_id: postId,
          //user_id: user?.id, //인증된 사용자라면 user.id
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`에러 발생: ${errorData.error}`);
        return;
      }

      const result = await res.json();
      console.log('댓글 insert 결과:', result);

      setComment('');
    } catch (error) {
      console.error('댓글 전송 중 에러:', error);
      alert('댓글 전송에 실패했습니다.');
    }
  };

  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log(user.id);

  return (
    <form className={tm('flex gap-[10px]')} onSubmit={handleSubmit}>
      <Image
        src="./thum-img-02.svg"
        width={49}
        height={48}
        alt="사용자 이미지"
        priority={true}
      />
      <div
        className={tm(
          'inline-flex items-center bg-[#ECECEC] rounded-[5px] text-xs h-[30px] grow-1 px-[7px]'
        )}
      >
        <input
          type="text"
          placeholder="댓글 달기..."
          className={tm('grow-[26]')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className={tm(
            'bg-[#0D0E0F] h-[20px] rounded-[50px] grow-1 text-center cursor-pointer'
          )}
        >
          <Image
            src="./comment-button.svg"
            width={14}
            height={14}
            alt="댓글 버튼"
            priority={true}
            className={tm('inline-block')}
          />
        </button>
      </div>
    </form>
  );
}

export default LeaveComment;
