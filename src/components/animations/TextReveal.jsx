import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ 
  children, 
  staggerChildren = 0.03,
  delayChildren = 0,
  duration = 0.5,
  className = '',
  element = 'div'
}) => {
  const Component = motion[element];
  
  // Animation for the container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
  
  // Animation for each character
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration
      }
    }
  };
  
  // Split text into individual characters
  const renderText = () => {
    if (typeof children !== 'string') {
      return <div>{children}</div>;
    }
    
    return children.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={childVariants}
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {char}
      </motion.span>
    ));
  };
  
  return (
    <Component
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderText()}
    </Component>
  );
};

export default TextReveal;
