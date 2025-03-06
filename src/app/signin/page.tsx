'use client';

import Logo from '@/components/logo';
import SearchAccount from '@/features/sign/components/search-account';
import SignInForm from '@/features/sign/components/signin-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const clearId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(clearId);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loadingPage"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
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
            <Logo w={178} h={101} className="mb-20" />
            <SignInForm />
            <SearchAccount />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignInPage;
