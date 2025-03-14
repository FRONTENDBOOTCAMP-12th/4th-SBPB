'use client';

import { AnimatePresence } from 'framer-motion';

interface AnimateProps {
  children: React.ReactNode;
}

function Animate({ children }: AnimateProps) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

export default Animate;
