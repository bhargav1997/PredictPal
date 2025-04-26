import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTabs = ({ 
  tabs, 
  activeTab, 
  onChange,
  variant = 'underline',
  color = 'primary',
  className = '',
  tabClassName = '',
  indicatorClassName = ''
}) => {
  // Color classes
  const colorClasses = {
    primary: {
      active: 'text-primary-500',
      inactive: 'text-gray-500 hover:text-gray-700',
      indicator: 'bg-primary-500'
    },
    secondary: {
      active: 'text-secondary-500',
      inactive: 'text-gray-500 hover:text-gray-700',
      indicator: 'bg-secondary-500'
    },
    accent: {
      active: 'text-accent-500',
      inactive: 'text-gray-500 hover:text-gray-700',
      indicator: 'bg-accent-500'
    },
    neon: {
      active: 'text-neon-blue',
      inactive: 'text-gray-400 hover:text-gray-300',
      indicator: 'bg-neon-blue'
    }
  };
  
  // Variant classes
  const variantClasses = {
    underline: 'border-b border-gray-200',
    pills: 'space-x-2',
    buttons: 'p-1 bg-gray-100 rounded-lg space-x-1',
    minimal: 'space-x-6'
  };
  
  // Tab item classes based on variant
  const getTabItemClasses = (isActive) => {
    const activeColor = colorClasses[color].active;
    const inactiveColor = colorClasses[color].inactive;
    
    const baseClasses = `
      relative cursor-pointer font-medium transition-all
      ${isActive ? activeColor : inactiveColor}
      ${tabClassName}
    `;
    
    switch (variant) {
      case 'pills':
        return `${baseClasses} px-4 py-2 rounded-full ${isActive ? 'bg-gray-100' : ''}`;
      case 'buttons':
        return `${baseClasses} px-4 py-2 rounded-md ${isActive ? 'bg-white shadow-sm' : ''}`;
      case 'minimal':
        return `${baseClasses} py-2`;
      case 'underline':
      default:
        return `${baseClasses} py-3 px-4`;
    }
  };
  
  // Indicator styles based on variant
  const getIndicatorStyles = (isUnderline) => {
    if (isUnderline) {
      return {
        position: 'absolute',
        bottom: '-1px',
        left: 0,
        right: 0,
        height: '2px',
        background: colorClasses[color].indicator
      };
    }
    
    return {};
  };
  
  return (
    <div className={`flex ${variantClasses[variant]} ${className}`}>
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          className={getTabItemClasses(activeTab === tab.id)}
          onClick={() => onChange(tab.id)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {tab.label}
          
          {activeTab === tab.id && variant === 'underline' && (
            <motion.div
              className={`${colorClasses[color].indicator} ${indicatorClassName}`}
              layoutId="tab-indicator"
              style={getIndicatorStyles(variant === 'underline')}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedTabs;
