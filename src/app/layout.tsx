'use client';

import { AnimatePresence } from 'framer-motion';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <AnimatePresence>
        <body>
          <ToastContainer
            toastClassName={() =>
              'bg-gray-800 text-white w-full font-semibold shadow-lg rounded-lg p-4'
            }
            progressClassName="bg-blue-500"
            position="top-center"
            limit={1}
            autoClose={2500}
            closeButton={false}
          />
          {children}
        </body>
      </AnimatePresence>
    </html>
  );
}
