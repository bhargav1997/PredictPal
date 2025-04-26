import { motion } from 'framer-motion';

const HoverCard = ({ 
  children, 
  className = '',
  scale = 1.03,
  rotate = 0,
  shadow = true,
  duration = 0.3
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale, 
        rotate: rotate, 
        boxShadow: shadow ? '0 10px 25px rgba(0, 0, 0, 0.1)' : undefined,
        y: -5
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
