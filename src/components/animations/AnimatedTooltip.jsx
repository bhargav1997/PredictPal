import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedTooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 0.2,
  duration = 0.2,
  distance = 10,
  className = '',
  tooltipClassName = '',
  arrow = true,
  maxWidth = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Position classes and initial positions
  const positionStyles = {
    top: {
      tooltip: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      arrow: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent',
      initial: { opacity: 0, y: -distance },
      animate: { opacity: 1, y: 0 }
    },
    bottom: {
      tooltip: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      arrow: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent',
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 }
    },
    left: {
      tooltip: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      arrow: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent',
      initial: { opacity: 0, x: -distance },
      animate: { opacity: 1, x: 0 }
    },
    right: {
      tooltip: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      arrow: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent',
      initial: { opacity: 0, x: distance },
      animate: { opacity: 1, x: 0 }
    }
  };
  
  // Arrow styles based on position
  const getArrowStyles = () => {
    const baseStyles = 'absolute w-0 h-0 border-solid';
    
    switch (position) {
      case 'top':
        return `${baseStyles} border-t-8 border-l-8 border-r-8 border-b-0`;
      case 'bottom':
        return `${baseStyles} border-b-8 border-l-8 border-r-8 border-t-0`;
      case 'left':
        return `${baseStyles} border-l-8 border-t-8 border-b-8 border-r-0`;
      case 'right':
        return `${baseStyles} border-r-8 border-t-8 border-b-8 border-l-0`;
      default:
        return `${baseStyles} border-t-8 border-l-8 border-r-8 border-b-0`;
    }
  };
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 ${positionStyles[position].tooltip}`}
            initial={positionStyles[position].initial}
            animate={positionStyles[position].animate}
            exit={positionStyles[position].initial}
            transition={{ 
              duration, 
              delay: isVisible ? delay : 0,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <div 
              className={`bg-gray-800 text-white text-sm rounded py-1 px-2 whitespace-normal ${tooltipClassName}`}
              style={{ maxWidth }}
            >
              {content}
            </div>
            
            {arrow && (
              <div 
                className={`${getArrowStyles()} ${positionStyles[position].arrow}`}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTooltip;
