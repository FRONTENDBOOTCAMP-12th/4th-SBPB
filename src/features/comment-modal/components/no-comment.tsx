'use client';
import { tm } from '@/utils/tw-merge';

function NoComment() {
  return (
    <div className={tm('flex justify-center items-center flex-col h-[75px]')}>
      <p>아직 댓글이 없습니다!👀</p>
      <p className={tm('text-xs text-gray-700')}>댓글을 남겨보세요.✍️</p>
    </div>
  );
}

export default NoComment;
