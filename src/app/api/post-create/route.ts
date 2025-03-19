import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get('title') as string;
  const tags = formData.get('tags') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const files = formData.getAll('files') as File[];

  const supabase = createClient();

  try {
    const fileNames: string[] = [];

    for (const file of files) {
      const fileName = `images/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error } = await supabase.storage
        .from('images')
        .upload(fileName, buffer, { contentType: file.type });

      if (error) {
        console.error('Storage 이미지 업로드 중 에러:', error);
        return NextResponse.json(
          { error: 'Error uploading image' },
          { status: 500 }
        );
      }
      fileNames.push(fileName);
    }

    const imageUrls = fileNames.map((fileName) => {
      return supabase.storage.from('images').getPublicUrl(fileName).data
        .publicUrl;
    });

    const { data, error: insertError } = await supabase
      .from('post')
      .insert([
        {
          title,
          tags,
          description,
          location,
          image_url: imageUrls[0],
          other_images: imageUrls.slice(1),
        },
      ])
      .select('id');

    if (insertError) {
      console.error('Insert 중 에러 발생:', insertError);
      return NextResponse.json(
        { error: 'Error inserting post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ postId: data[0].id }, { status: 200 });
  } catch (error) {
    console.error('파일 업로드 중 에러:', error);
    return NextResponse.json(
      { error: 'Error handling request' },
      { status: 500 }
    );
  }
}
