import { motion } from 'framer-motion';

const StaggerContainer = ({ 
  children, 
  delay = 0, 
  staggerChildren = 0.1,
  className = '',
  once = true
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  direction = null, 
  distance = 50,
  className = ''
}) => {
  let hidden = { opacity: 0 };
  let visible = { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  };
  
  if (direction === 'up') {
    hidden.y = distance;
    visible.y = 0;
  } else if (direction === 'down') {
    hidden.y = -distance;
    visible.y = 0;
  } else if (direction === 'left') {
    hidden.x = distance;
    visible.x = 0;
  } else if (direction === 'right') {
    hidden.x = -distance;
    visible.x = 0;
  }
  
  return (
    <motion.div
      variants={{
        hidden,
        visible
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
