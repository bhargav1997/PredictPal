import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '',
  blur = 'backdrop-blur-md',
  border = true,
  hover = false,
  onClick
}) => {
  return (
    <motion.div
      className={`bg-white/10 ${blur} ${border ? 'border border-white/20' : ''} rounded-xl shadow-glass ${className}`}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: '0 10px 30px rgba(31, 38, 135, 0.4)'
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
