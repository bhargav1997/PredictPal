import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
   children,
   onClick,
   className = "",
   type = "button",
   disabled = false,
   animation = "scale",
   color = "primary",
   size = "md",
   fullWidth = false,
   icon = null,
   iconPosition = "left",
   ripple = true,
   variant = "filled",
   gradient = false,
   glass = false,
   neon = false,
   scale = 0.95,
}) => {
   // Size classes
   const sizeClasses = {
      xs: "py-1 px-2 text-xs",
      sm: "py-1.5 px-3 text-sm",
      md: "py-2.5 px-5 text-base",
      lg: "py-3 px-6 text-lg",
      xl: "py-4 px-8 text-xl",
   };

   // Color classes
   const colorClasses = {
      primary: {
         filled: "bg-primary-500 text-white hover:bg-primary-600",
         outline: "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20",
         ghost: "bg-transparent text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20",
         gradient: "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
         glass: "bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-500",
         neon: "bg-dark border border-primary-500 text-primary-500 shadow-neon-blue",
      },
      secondary: {
         filled: "bg-secondary-500 text-white hover:bg-secondary-600",
         outline: "bg-transparent border border-secondary-500 text-secondary-500 hover:bg-secondary-50 dark:hover:bg-secondary-900/20",
         ghost: "bg-transparent text-secondary-500 hover:bg-secondary-50 dark:hover:bg-secondary-900/20",
         gradient: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white",
         glass: "bg-secondary-500/20 backdrop-blur-md border border-secondary-500/30 text-secondary-500",
         neon: "bg-dark border border-secondary-500 text-secondary-500 shadow-neon-green",
      },
      accent: {
         filled: "bg-accent-500 text-white hover:bg-accent-600",
         outline: "bg-transparent border border-accent-500 text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/20",
         ghost: "bg-transparent text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/20",
         gradient: "bg-gradient-to-r from-accent-500 to-accent-600 text-white",
         glass: "bg-accent-500/20 backdrop-blur-md border border-accent-500/30 text-accent-500",
         neon: "bg-dark border border-accent-500 text-accent-500 shadow-neon-yellow",
      },
      white: {
         filled: "bg-white text-gray-800 hover:bg-gray-100",
         outline: "bg-transparent border border-white text-white hover:bg-white/10",
         ghost: "bg-transparent text-white hover:bg-white/10",
         gradient: "bg-gradient-to-r from-gray-100 to-white text-gray-800",
         glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white",
         neon: "bg-dark border border-white text-white",
      },
   };

   // Determine the variant class
   let variantClass = "";
   if (gradient) {
      variantClass = colorClasses[color]?.gradient || colorClasses.primary.gradient;
   } else if (glass) {
      variantClass = colorClasses[color]?.glass || colorClasses.primary.glass;
   } else if (neon) {
      variantClass = colorClasses[color]?.neon || colorClasses.primary.neon;
   } else {
      variantClass = colorClasses[color]?.[variant] || colorClasses.primary.filled;
   }

   // Base classes
   const baseClasses = `
    relative overflow-hidden
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none
    ${sizeClasses[size]}
    ${variantClass}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

   // Animation variants
   const animations = {
      scale: {
         whileHover: { scale: 1.05 },
         whileTap: { scale },
      },
      lift: {
         whileHover: { y: -5, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" },
         whileTap: { y: 0, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" },
      },
      glow: {
         whileHover: {
            boxShadow: neon ? "0 0 10px currentColor, 0 0 20px currentColor/50" : "0 10px 25px rgba(0, 0, 0, 0.2)",
         },
         whileTap: { scale },
      },
      none: {
         whileHover: {},
         whileTap: {},
      },
   };

   // Get animation properties
   const animationProps = animations[animation] || animations.scale;

   return (
      <motion.button
         type={type}
         onClick={onClick}
         disabled={disabled}
         whileHover={animationProps.whileHover}
         whileTap={animationProps.whileTap}
         transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
         }}
         className={baseClasses}>
         <div className='flex items-center justify-center'>
            {icon && iconPosition === "left" && <span className='mr-2 flex-shrink-0'>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span className='ml-2 flex-shrink-0'>{icon}</span>}
         </div>

         {ripple && !disabled && (
            <span className='absolute inset-0 pointer-events-none'>
               <span className='animate-ping absolute inset-0 rounded-lg bg-white opacity-10'></span>
            </span>
         )}
      </motion.button>
   );
};

export default AnimatedButton;
