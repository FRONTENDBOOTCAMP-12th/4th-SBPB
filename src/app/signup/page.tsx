'use client';

import SignUpKind from '@/features/sign/components/signup-kind';
import { motion } from 'framer-motion';

function SignUpPage() {
  return (
    <div className="text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ duration: 1 }}
      >
        <SignUpKind />
      </motion.div>
    </div>
  );
}

export default SignUpPage;
