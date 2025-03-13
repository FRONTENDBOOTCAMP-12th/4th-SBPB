'use client';

import { motion } from 'framer-motion';
import SignUpKind from './signup-kind';

function SignUp() {
  return (
    <div className="text-white">
      <motion.div
        key={'signup page'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ duration: 1 }}
      >
        <SignUpKind />
      </motion.div>
    </div>
  );
}

export default SignUp;
