import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

export async function POST(req: NextRequest) {
  try {
    // 1. 클라이언트에서 보낸 JSON 데이터를 파싱
    const { content, parent_comment_id } = await req.json();

    // 2. Supabase 인스턴스 생성
    const supabase = createClient();

    // 3. DB에 insert
    const { data, error } = await supabase
      .from('comment')
      .insert([
        {
          content,
          parent_comment_id: parent_comment_id ?? null,
          // 필요하다면 post_id 등 다른 컬럼도 넣어주세요
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. 성공적으로 저장된 레코드를 응답
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('댓글 POST 에러:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
