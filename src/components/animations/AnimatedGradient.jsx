import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedGradient = ({ 
  children, 
  colors = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444'], 
  duration = 10,
  className = '',
  angle = 45,
  size = '100%',
  opacity = 0.8,
  blur = 0
}) => {
  const [gradientPosition, setGradientPosition] = useState(0);
  
  // Create a gradient string with the specified colors
  const createGradient = (position) => {
    const gradientColors = colors.map((color, index) => {
      const offset = (index / colors.length) * 100;
      const adjustedPosition = (offset + position) % 100;
      return `${color} ${adjustedPosition}%`;
    }).join(', ');
    
    return `linear-gradient(${angle}deg, ${gradientColors})`;
  };
  
  // Update gradient position for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 100);
    }, duration * 10); // Smooth animation
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: createGradient(gradientPosition),
          opacity,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          backgroundSize: size,
        }}
        animate={{
          backgroundPosition: [`0% 0%`, `100% 100%`],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradient;
