'use client';

import Logo from '@/components/logo';
import SignUpForm from '@/features/sign/components/signup-form';
import { motion } from 'framer-motion';

function SignUpEmail() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: -20 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-x-0 inset-y-16">
        <Logo w={178} h={101} className="mb-20" />
        <SignUpForm />
      </div>
    </motion.div>
  );
}

export default SignUpEmail;
