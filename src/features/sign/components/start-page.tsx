import Logo from '@/components/logo';
import { motion } from 'framer-motion';

function StartPage() {
  return (
    <motion.div
      key="loadingPage"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <h1 className="sr-only">로그인 페이지</h1>
      <Logo className="absolute inset-x-0 mt-60" w={245} h={140} />
    </motion.div>
  );
}

export default StartPage;
