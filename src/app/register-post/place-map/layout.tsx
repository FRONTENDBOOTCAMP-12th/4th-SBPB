import Script from 'next/script';

const KAKAO_API_KEY_ID: string | undefined = process.env.KAKAO_API_KEY_ID;

export default function PlaceMapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY_ID}&libraries=services&autoload=false`}
        strategy="beforeInteractive"
      />
    </>
  );
}
