import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// 게시글 목록 가져오기 API (GET 요청)
export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const sortType = searchParams.get('sortType') || 'latest';

    let query = supabase.from('post').select(`
        id, 
        description, 
        image_url, 
        thumbs,
        created_at,
        user: userinfo!inner(id, nickname, profile_path)
      `);

    if (sortType === 'latest') {
      query = query.order('created_at', { ascending: false }); // 최신순 정렬
    } else if (sortType === 'popular') {
      query = query.order('thumbs', { ascending: false, nullsFirst: false }); // 인기순 정렬
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: '게시글 불러오기에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, posts: data });
  } catch (error) {
    console.error('API 오류 발생:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
