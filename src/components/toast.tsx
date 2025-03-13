'use client';

import { ToastContainer } from 'react-toastify';

function Toast() {
  return (
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
  );
}

export default Toast;
