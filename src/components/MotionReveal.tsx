import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

interface CinematicSectionHeaderProps {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const CinematicSectionHeader: React.FC<CinematicSectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.85,
        ease: CINEMATIC_EASE,
      },
    },
  };

  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`max-w-3xl ${alignClass} ${className}`}
    >
      {kicker && (
        <motion.span
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2"
        >
          {kicker}
        </motion.span>
      )}

      <motion.h2
        variants={itemVariants}
        className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FDFBF7] tracking-tight leading-[1.12] mb-4"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-[#F7F4EE]/75 font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export const FadeInStagger: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.12, delayChildren = 0.05, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.8,
        ease: CINEMATIC_EASE,
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};
