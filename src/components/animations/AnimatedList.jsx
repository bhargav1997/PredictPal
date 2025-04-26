import React from 'react';
import { motion } from 'framer-motion';

const AnimatedList = ({ 
  children, 
  direction = 'up', 
  staggerDelay = 0.1,
  duration = 0.5,
  className = '',
  delayStart = 0,
  distance = 20
}) => {
  // Container variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayStart
      }
    }
  };
  
  // Item variants based on direction
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: direction === 'scale' ? 0.8 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        duration
      }
    }
  };
  
  // Wrap each child in a motion.div with the item variants
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => (
      <motion.div
        key={index}
        variants={itemVariants}
        className="w-full"
      >
        {child}
      </motion.div>
    ));
  };
  
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderChildren()}
    </motion.div>
  );
};

export default AnimatedList;
