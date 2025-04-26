import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBadge = ({ 
  children, 
  color = 'primary',
  size = 'md',
  variant = 'filled',
  className = '',
  animate = true,
  pulse = false,
  dot = false,
  count = null,
  max = 99,
  icon = null
}) => {
  // Size classes
  const sizeClasses = {
    xs: dot ? 'h-1.5 w-1.5' : 'h-4 min-w-4 text-xs px-1',
    sm: dot ? 'h-2 w-2' : 'h-5 min-w-5 text-xs px-1.5',
    md: dot ? 'h-2.5 w-2.5' : 'h-6 min-w-6 text-sm px-2',
    lg: dot ? 'h-3 w-3' : 'h-7 min-w-7 text-base px-2.5',
  };
  
  // Color classes
  const colorVariants = {
    primary: {
      filled: 'bg-primary-500 text-white',
      outline: 'bg-transparent text-primary-500 border border-primary-500',
      light: 'bg-primary-100 text-primary-800',
    },
    secondary: {
      filled: 'bg-secondary-500 text-white',
      outline: 'bg-transparent text-secondary-500 border border-secondary-500',
      light: 'bg-secondary-100 text-secondary-800',
    },
    accent: {
      filled: 'bg-accent-500 text-white',
      outline: 'bg-transparent text-accent-500 border border-accent-500',
      light: 'bg-accent-100 text-accent-800',
    },
    success: {
      filled: 'bg-green-500 text-white',
      outline: 'bg-transparent text-green-500 border border-green-500',
      light: 'bg-green-100 text-green-800',
    },
    danger: {
      filled: 'bg-red-500 text-white',
      outline: 'bg-transparent text-red-500 border border-red-500',
      light: 'bg-red-100 text-red-800',
    },
    warning: {
      filled: 'bg-yellow-500 text-white',
      outline: 'bg-transparent text-yellow-500 border border-yellow-500',
      light: 'bg-yellow-100 text-yellow-800',
    },
    info: {
      filled: 'bg-blue-500 text-white',
      outline: 'bg-transparent text-blue-500 border border-blue-500',
      light: 'bg-blue-100 text-blue-800',
    },
    gray: {
      filled: 'bg-gray-500 text-white',
      outline: 'bg-transparent text-gray-500 border border-gray-500',
      light: 'bg-gray-100 text-gray-800',
    },
  };
  
  // Get color classes
  const colorClass = colorVariants[color]?.[variant] || colorVariants.primary.filled;
  
  // Format count if needed
  const formattedCount = count !== null ? (count > max ? `${max}+` : count) : null;
  
  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full font-medium
    ${dot ? 'rounded-full' : ''}
    ${sizeClasses[size]}
    ${colorClass}
    ${className}
  `;
  
  // Animation variants
  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Pulse animation
  const pulseAnimation = pulse ? {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  } : {};
  
  return (
    <motion.span
      className={baseClasses}
      initial={animate ? 'initial' : undefined}
      animate={animate ? { ...badgeVariants.animate, ...pulseAnimation.animate } : undefined}
      exit={animate ? 'exit' : undefined}
      variants={animate ? badgeVariants : undefined}
    >
      {dot ? null : icon ? icon : formattedCount !== null ? formattedCount : children}
    </motion.span>
  );
};

export default AnimatedBadge;
