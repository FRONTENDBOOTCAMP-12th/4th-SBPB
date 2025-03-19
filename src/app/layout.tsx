import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '@/components/toast';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: '사방팔방 여행후기 공유 서비스 프로젝트', // 기본 페이지 제목
    template: '%s | 사방팔방 여행후기 공유 서비스 프로젝트', // 동적 타이틀 적용
  },
  description:
    '사방팔방은 방문했던 지역 명소나 맛집 등 다양한 장르의 국내 여행지를 다녀왔던 후기와 사진을 위치와 함께 공유하며 소통하는 여행 후기 공유 서비스 프로젝트입니다.', // 페이지 설명 (검색엔진 & SNS에서 표시)
  openGraph: {
    title: '사방팔방 여행후기 공유 서비스 프로젝트',
    description:
      '사방팔방은 방문했던 지역 명소나 맛집 등 다양한 장르의 국내 여행지를 다녀왔던 후기와 사진을 위치와 함께 공유하며 소통하는 여행 후기 공유 서비스 프로젝트입니다.',
    url: 'https://sbpb4.netlify.app/', // 페이지 URL
    siteName: '사방팔방',
    images: [
      {
        url: '/open-graph.svg', // OG 이미지 URL
        width: 1200,
        height: 630,
        alt: '사방팔방 여행 후기 공유 서비스 프로젝트 미리보기',
      },
    ],
  },
};

const xNcpApiGwApiKeyId: string | undefined =
  process.env.X_NCP_APIGW_API_KEY_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Toast />
        {children}
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ba7abec9b662a12ad566a98c84d18315&libraries=services&autoload=false"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
