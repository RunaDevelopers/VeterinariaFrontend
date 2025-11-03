import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: { delay: number; duration: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      ease: 'easeOut',
    },
  }),
};

export function ScaleIn({ children, duration = 0.7, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      variants={scaleInVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}
