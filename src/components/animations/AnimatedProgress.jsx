import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedProgress = ({ 
  value = 0, 
  max = 100, 
  color = 'primary',
  height = 'md',
  rounded = true,
  showLabel = false,
  labelPosition = 'right',
  className = '',
  barClassName = '',
  animate = true,
  striped = false,
  gradient = false,
  gradientColors = ['primary-500', 'secondary-500']
}) => {
  const [percentage, setPercentage] = useState(0);
  const controls = useAnimation();
  
  // Calculate percentage
  useEffect(() => {
    const calculatedPercentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    if (animate) {
      controls.start({
        width: `${calculatedPercentage}%`,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
      });
    }
    
    setPercentage(calculatedPercentage);
  }, [value, max, animate, controls]);
  
  // Height classes
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    neon: 'bg-neon-blue'
  };
  
  // Gradient classes
  const getGradientClass = () => {
    if (!gradient) return '';
    
    if (Array.isArray(gradientColors) && gradientColors.length >= 2) {
      return `bg-gradient-to-r from-${gradientColors[0]} to-${gradientColors[1]}`;
    }
    
    return 'bg-gradient-to-r from-primary-500 to-secondary-500';
  };
  
  // Striped animation
  const stripedAnimation = striped ? {
    backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
    backgroundSize: '1rem 1rem',
    animate: {
      backgroundPosition: ['0 0', '1rem 0'],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear'
      }
    }
  } : {};
  
  // Label position classes
  const labelPositionClasses = {
    right: 'justify-end pr-2',
    left: 'justify-start pl-2',
    center: 'justify-center',
    outside: ''
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center mb-1">
        {showLabel && labelPosition === 'outside' && (
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {percentage.toFixed(0)}%
          </div>
        )}
        
        <div className={`w-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${heightClasses[height]} ${rounded ? 'rounded-full' : 'rounded'}`}>
          <motion.div
            className={`
              ${colorClasses[color]} 
              ${getGradientClass()} 
              ${rounded ? 'rounded-full' : 'rounded-l'} 
              ${barClassName}
              ${showLabel && labelPosition !== 'outside' ? `flex items-center ${labelPositionClasses[labelPosition]}` : ''}
            `}
            style={{ 
              width: animate ? '0%' : `${percentage}%`,
              ...stripedAnimation
            }}
            animate={controls}
            {...(striped ? { animate: stripedAnimation.animate } : {})}
          >
            {showLabel && labelPosition !== 'outside' && (
              <span className="text-xs font-medium text-white">
                {percentage.toFixed(0)}%
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedProgress;
