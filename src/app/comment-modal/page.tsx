//import { tm } from '@/utils/tw-merge';
//import Image from 'next/image';
'use client';
import CommentModalPage from '@/features/comment-modal/components/comment-modal-page';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const supabase = createClient();
//async;

export default function CommentModal() {
  //const supabase = await createClient();
  interface SupabaseUser {
    id: string;
    email?: string;
    nickname?: string;
  }
  const [postId, setPostId] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pid = urlParams.get('postId');
    setPostId(pid);

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      const { data: userInfoData } = await supabase
        .from('userinfo')
        .select('*')
        .eq('user_id', (data.user as SupabaseUser).id);

      if (error) {
        console.error('사용자 정보 가져오기 오류:', error);
      } else {
        const user = data.user;
        let nickname: string = '';
        if (userInfoData) {
          const [userinfo] = userInfoData;
          nickname = userinfo.nickname;
        }
        //setUser(data.user as SupabaseUser);
        setUser({ ...user, nickname } as SupabaseUser);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  console.log('로그인 유저:', user.id);
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  //console.log(user?.id);

  return (
    <>
      <CommentModalPage
        userId={user.id}
        nickname={user.nickname}
        postId={postId}
      />
    </>
  );
}

//export default CommentModal;
