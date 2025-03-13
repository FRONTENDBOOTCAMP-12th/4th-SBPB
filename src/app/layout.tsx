import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Toast from '@/components/toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <title>사방팔방</title>
        <meta name="사방팔방" content="사방팔방 페이지입니다." />
      </Head>
      <body>
        <Toast />
        {children}
      </body>
    </html>
  );
}
