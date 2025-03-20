import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

export async function GET(req: NextRequest) {
  // zustand에서 인증된 사용자 정보 가져오기
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    // 인증되지 않았거나 user.id가 없으면 401 Unauthorized 반환
    return NextResponse.json(
      { error: 'User is not authenticated' },
      { status: 401 }
    );
  }

  const supabase = createClient();

  try {
    // user.id를 사용하여 해당 사용자에 속한 게시글만 가져오기
    const { data, error } = await supabase
      .from('post')
      .select(
        `id, title, description, image_url, thumbs, created_at, image_url, other_images, location`
      )
      .eq('user_id', userId); // user.id로 게시글 필터링

    if (error) {
      console.error('게시글 불러오기 오류:', error);
      return NextResponse.json(
        { error: 'Error fetching posts data' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    );
  }
}
