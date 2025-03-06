import { AnimatePresence } from 'framer-motion';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <AnimatePresence>
        <body>{children}</body>
      </AnimatePresence>
    </html>
  );
}
