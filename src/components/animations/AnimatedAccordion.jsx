import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedAccordion = ({ 
  items, 
  allowMultiple = false,
  variant = 'default',
  color = 'primary',
  className = '',
  headerClassName = '',
  contentClassName = '',
  iconPosition = 'right',
  rounded = true,
  bordered = true,
  divider = true,
  defaultOpen = []
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen || []);
  
  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };
  
  // Variant classes
  const variantClasses = {
    default: {
      container: `${bordered ? 'border border-gray-200 dark:border-gray-700' : ''} ${rounded ? 'rounded-lg' : ''}`,
      header: 'bg-white dark:bg-gray-800 px-4 py-3',
      content: 'px-4 py-3'
    },
    filled: {
      container: `${bordered ? 'border border-gray-200 dark:border-gray-700' : ''} ${rounded ? 'rounded-lg' : ''}`,
      header: 'bg-gray-100 dark:bg-gray-700 px-4 py-3',
      content: 'bg-white dark:bg-gray-800 px-4 py-3'
    },
    minimal: {
      container: '',
      header: 'px-1 py-2',
      content: 'px-1 py-2'
    }
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    accent: 'text-accent-500',
    gray: 'text-gray-500'
  };
  
  // Get variant styles
  const styles = variantClasses[variant] || variantClasses.default;
  
  return (
    <div className={`${styles.container} ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.id} className={`${!isLast && divider ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
            <motion.button
              className={`w-full flex items-center justify-between ${styles.header} ${headerClassName} focus:outline-none`}
              onClick={() => toggleItem(item.id)}
              whileHover={{ backgroundColor: variant === 'minimal' ? 'transparent' : 'rgba(0, 0, 0, 0.02)' }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center">
                {item.icon && iconPosition === 'left' && (
                  <span className={`mr-2 ${colorClasses[color]}`}>{item.icon}</span>
                )}
                <span className="font-medium text-left">{item.title}</span>
              </div>
              
              <motion.div
                className={`${colorClasses[color]}`}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.icon && iconPosition === 'right' ? item.icon : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="overflow-hidden"
                >
                  <div className={`${styles.content} ${contentClassName}`}>
                    {typeof item.content === 'function' ? item.content(isOpen) : item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedAccordion;
