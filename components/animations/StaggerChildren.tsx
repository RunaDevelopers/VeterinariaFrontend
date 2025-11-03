import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
}

const staggerVariants: Variants = {
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

export function StaggerChildren({
  children,
  stagger = 0.15,
  delay = 0,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={staggerVariants}
      initial={false}
      animate="visible"
      custom={{ stagger, delay }}
    >
      {children}
    </motion.div>
  );
}
