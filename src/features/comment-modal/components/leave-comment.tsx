'use client';
import { useState } from 'react';
import { tm } from '@/utils/tw-merge';
import Image from 'next/image';

function LeaveComment() {
  const [comment, setComment] = useState('');
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 동작(페이지 새로고침) 막기

    if (!comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      // 1. /api/comment 라우트로 POST 요청 보내기
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          parent_comment_id: null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`에러 발생: ${errorData.error}`);
        return;
      }

      // 2. 응답 데이터 받아오기
      const result = await res.json();
      console.log('댓글 insert 결과:', result);

      // 3. 댓글 입력란 초기화
      setComment('');

      // 4. 만약 댓글 목록을 다시 불러오거나, 상태를 갱신해야 한다면
      //    부모 컴포넌트나 context 등을 통해 댓글 리스트를 리프레시하는 로직을 추가할 수도 있습니다.
    } catch (error) {
      console.error('댓글 전송 중 에러:', error);
      alert('댓글 전송에 실패했습니다.');
    }
  };

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
