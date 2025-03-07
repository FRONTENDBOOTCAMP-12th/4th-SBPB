import { PostContentProps } from '../types/post-content-types';

function PostContent({ title, content }: PostContentProps) {
  return (
    <div className="content flex flex-col items-center py-8 px-12">
      <h1 className="post-title text-accent pb-2">{title}</h1>
      <p className="content">{content}</p>
    </div>
  );
}

export default PostContent;
