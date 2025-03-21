'use client';
import { tm } from '@/utils/tw-merge';
import { useEffect } from 'react';
//import { createClient } from '@/utils/supabase/client';
import CommentProfile from './comment-profile';
import NoComment from './no-comment';
import LeaveComment from './leave-comment';

interface CommentModalPageProps {
  user: string | null;
  postId: string | null;
  nickname?: string;
}

export default function CommentModalPage({
  user,
  postId,
  nickname,
}: CommentModalPageProps) {
  //const supabase = createClient();
  //const [data, setData] = useState(null);
  //const [error, setError] = useState(null);
  console.log('postId:', postId);

  useEffect(() => {
    async function insertComment() {
      //const { data, error } = await supabase
      // .from('comment')
      // .insert([{ content: 'text', parent_comment_id: null }])
      // .select();
      //setData(data);
      //setError(error);
    }
    insertComment();
  }, []);

  return (
    <>
      <div className={tm('relative bg-[#313131]/70 h-screen')}>
        <div
          className={tm(
            'absolute bottom-[0px] left-[0px] right-[0px] bg-white min-h-[75px] rounded-t-3xl'
          )}
        >
          <div className={tm('text-center')}>
            <div
              className={tm('inline-block bg-[#D9D9D9] h-[4px] w-[42px]')}
            ></div>
            <h2 className={tm('text-xs')}>댓글</h2>
          </div>
          <ul
            className={tm(
              'px-[10px] py-[20px] border-solid border-[#BEC2C8] border-t-1'
            )}
          >
            <CommentProfile userId={user} nickname={nickname} />
          </ul>
          <NoComment />

          <div
            className={tm(
              'border-solid border-[#D9D9D9] border-t-1 px-[16px] py-[17px] items-center'
            )}
          >
            <LeaveComment />
          </div>
        </div>
      </div>
    </>
  );
}

//export default CommentModalPage;
