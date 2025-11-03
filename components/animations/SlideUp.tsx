import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  distance?: number;
}

const slideUpVariants: Variants = {
  hidden: (custom: { distance: number }) => ({
    opacity: 0,
    y: custom.distance,
  }),
  visible: (custom: { delay: number; duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      ease: 'easeOut',
    },
  }),
};

export function SlideUp({
  children,
  duration = 0.8,
  delay = 0,
  distance = 40,
}: SlideUpProps) {
  return (
    <motion.div
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, duration, distance }}
    >
      {children}
    </motion.div>
  );
}
