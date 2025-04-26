import { motion } from 'framer-motion';

const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  direction = null, 
  distance = 50,
  className = '',
  once = true
}) => {
  let initial = { opacity: 0 };
  let animate = { opacity: 1 };
  
  if (direction === 'up') {
    initial.y = distance;
    animate.y = 0;
  } else if (direction === 'down') {
    initial.y = -distance;
    animate.y = 0;
  } else if (direction === 'left') {
    initial.x = distance;
    animate.x = 0;
  } else if (direction === 'right') {
    initial.x = -distance;
    animate.x = 0;
  }
  
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
