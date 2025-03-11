import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eqmrupmznpxmnhcgrchx.supabase.co', // Supabase 호스트명 추가
        pathname: '/storage/v1/object/public/**', // 스토리지의 모든 public 이미지 허용
      },
    ],
  },
};

export default nextConfig;
