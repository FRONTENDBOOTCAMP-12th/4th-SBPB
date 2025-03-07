import { PostModalProps } from '../types/post-modal-types';

function PostModal({ onEdit, onDelete }: PostModalProps) {
  return (
    <div className="bg-[url('/union.svg')] w-[66px] h-[100px] flex flex-col shadow-right">
      <button
        onClick={onEdit}
        className="pt-8 py-2 mx-3 text-sm font-semibold border-solid border-b-2 cursor-pointer"
      >
        수정
      </button>
      <button
        onClick={onDelete}
        className="py-2 mx-3 text-sm font-semibold cursor-pointer"
      >
        삭제
      </button>
    </div>
  );
}

export default PostModal;
