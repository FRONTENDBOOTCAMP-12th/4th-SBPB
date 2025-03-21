import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const { content, parent_comment_id, post_id, user_id } = await req.json();
    console.log(parent_comment_id);
    const body = await req.json();
    console.log('body:', body);

    if (!post_id) {
      return NextResponse.json(
        { error: 'post_id가 없습니다.' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from('comment')
      .insert([
        {
          content,
          parent_comment_id: parent_comment_id ?? null,
          post_id,
          user_id,
        },
      ])
      // .insert([
      //   {
      //     content,
      //     parent_comment_id: parent_comment_id ?? null,
      //   },
      //])
      .select();
    console.log(data);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('댓글 POST 에러:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
