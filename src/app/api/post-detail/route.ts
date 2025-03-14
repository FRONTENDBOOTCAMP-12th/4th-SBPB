import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId가 없습니다.' }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('post')
      .select(
        `
        id, title, description, image_url, thumbs, created_at, image_url, other_images, location
        `
      )
      .eq('id', postId)
      .single(); // 하나의 데이터만 가져오기

    if (error) {
      console.error('게시글 불러오기 오류:', error);
      return NextResponse.json(
        { error: 'Error fetching post data' },
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
