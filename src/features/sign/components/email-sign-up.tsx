'use client';

import Logo from '@/components/logo';
import { motion } from 'framer-motion';
import SignUpForm from './signup-form';

function EmailSignUp() {
  return (
    <motion.div
      key={'emailPage'}
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

export default EmailSignUp;
