export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const POST = async (req: NextRequest) => {
  console.log('API 호출됨');
  const body = await req.json();
  console.log('요청 데이터:', body);

  const {
    action,
    followingUserId,
    followUserId,
  }: {
    action: 'follow' | 'unfollow' | 'check';
    followingUserId: string;
    followUserId: string;
  } = body;

  const supabase = await createClient();

  try {
    if (action === 'follow') {
      const { error } = await supabase.from('follow').insert([
        {
          following_user_uuid: followingUserId,
          follow_user_uuid: followUserId,
        },
      ]);

      if (error) {
        console.error('팔로우 insert 실패:', error.message);
        throw new Error('팔로우 요청에 실패했습니다.');
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'unfollow') {
      const { error } = await supabase
        .from('follow')
        .delete()
        .eq('following_user_uuid', followingUserId)
        .eq('follow_user_uuid', followUserId);

      if (error) {
        console.error('언팔로우 삭제 실패:', error.message);
        throw new Error('언팔로우 요청에 실패했습니다.');
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'check') {
      const { count, error } = await supabase
        .from('follow')
        .select('*', { count: 'exact', head: true })
        .eq('following_user_uuid', followingUserId)
        .eq('follow_user_uuid', followUserId);

      if (error) {
        console.error('팔로우 상태 조회 실패:', error.message);
        throw new Error('팔로우 상태 확인에 실패했습니다.');
      }

      return NextResponse.json({
        success: true,
        isFollowing: (count ?? 0) > 0,
      });
    }

    console.error('잘못된 action 요청:', action);
    return NextResponse.json(
      { success: false, error: '유효하지 않은 요청입니다.' },
      { status: 400 }
    );
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : '서버에서 알 수 없는 에러가 발생했습니다.';
    console.error('서버 처리 에러:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
};
