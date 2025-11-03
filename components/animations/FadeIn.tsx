import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay: number; duration: number }) => ({
    opacity: 1,
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      ease: 'easeOut',
    },
  }),
};

export function FadeIn({ children, duration = 0.8, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}
