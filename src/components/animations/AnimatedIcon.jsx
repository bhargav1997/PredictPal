import React from 'react';
import { motion } from 'framer-motion';

const AnimatedIcon = ({ 
  icon, 
  animation = 'pulse', 
  color = 'primary-500',
  size = 'md',
  className = '',
  onClick,
  whileHover = {},
  whileTap = {},
  initial = {},
  animate = {}
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12',
  };
  
  // Color classes
  const colorClass = color.includes('-') ? `text-${color}` : `text-${color}-500`;
  
  // Animation variants
  const animations = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    spin: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        repeatDelay: 2
      }
    },
    none: {}
  };
  
  // Combine animation with custom animate prop
  const animationProps = {
    ...animations[animation],
    ...animate
  };
  
  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClass} ${className}`}
      initial={initial}
      animate={animationProps}
      whileHover={{
        scale: 1.1,
        ...whileHover
      }}
      whileTap={{
        scale: 0.95,
        ...whileTap
      }}
      onClick={onClick}
    >
      {icon}
    </motion.div>
  );
};

export default AnimatedIcon;
