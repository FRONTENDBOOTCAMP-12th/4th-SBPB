'use client';

import Animate from '@/components/animate';
import Logo from '@/components/logo';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SignInForm from './signin-form';
import SearchAccount from './search-account';

function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const clearId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(clearId);
  }, []);
  return (
    <>
      <Animate>
        {isLoading ? (
          <motion.div
            key="loadingPage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            <h1 className="sr-only">로그인 페이지</h1>
            <Logo className="absolute inset-x-0 mt-60" w={245} h={140} />
          </motion.div>
        ) : (
          <motion.div
            key="loginPage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-x-0 inset-y-16">
              <h1 className="sr-only">로그인 페이지</h1>
              <Logo w={178} h={101} className="mb-20" />
              <SignInForm />
              <SearchAccount />
            </div>
          </motion.div>
        )}
      </Animate>
    </>
  );
}

export default SignIn;
