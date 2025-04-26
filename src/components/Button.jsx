import React from "react";
import { motion } from "framer-motion";

const Button = ({
   children,
   variant = "primary",
   size = "md",
   fullWidth = false,
   disabled = false,
   onClick,
   type = "button",
   className = "",
   icon = null,
   iconPosition = "left",
   ripple = true,
   gradient = false,
   neon = false,
   glass = false,
   animate = true,
}) => {
   const baseClasses = "font-semibold rounded-lg transition-all focus:outline-none relative overflow-hidden text-base";

   const variantClasses = {
      primary: glass
         ? "bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-500 hover:bg-primary-500/30"
         : gradient
         ? "bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:shadow-lg hover:shadow-primary-500/20"
         : neon
         ? "bg-dark border border-primary-500 text-primary-500 shadow-neon-blue"
         : "bg-primary-500 text-white hover:bg-primary-600",

      secondary: glass
         ? "bg-secondary-500/20 backdrop-blur-sm border border-secondary-500/30 text-secondary-500 hover:bg-secondary-500/30"
         : gradient
         ? "bg-gradient-to-r from-secondary-500 to-secondary-700 text-white hover:shadow-lg hover:shadow-secondary-500/20"
         : neon
         ? "bg-dark border border-secondary-500 text-secondary-500 shadow-neon-green"
         : "bg-secondary-500 text-white hover:bg-secondary-600",

      accent: glass
         ? "bg-accent-500/20 backdrop-blur-sm border border-accent-500/30 text-accent-500 hover:bg-accent-500/30"
         : gradient
         ? "bg-gradient-to-r from-accent-500 to-accent-700 text-white hover:shadow-lg hover:shadow-accent-500/20"
         : neon
         ? "bg-dark border border-accent-500 text-accent-500 shadow-neon-yellow"
         : "bg-accent-500 text-white hover:bg-accent-600",

      danger: glass
         ? "bg-danger/20 backdrop-blur-sm border border-danger/30 text-danger hover:bg-danger/30"
         : gradient
         ? "bg-gradient-to-r from-danger to-red-700 text-white hover:shadow-lg hover:shadow-danger/20"
         : neon
         ? "bg-dark border border-danger text-danger"
         : "bg-danger text-white hover:bg-danger/90",

      neon: {
         blue: "bg-dark border border-neon-blue text-neon-blue shadow-neon-blue",
         pink: "bg-dark border border-neon-pink text-neon-pink shadow-neon-pink",
         green: "bg-dark border border-neon-green text-neon-green shadow-neon-green",
         purple: "bg-dark border border-neon-purple text-neon-purple shadow-neon-purple",
      },

      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
   };

   const sizeClasses = {
      xs: "py-1 px-2 text-xs",
      sm: "py-1.5 px-3 text-sm",
      md: "py-2.5 px-5 text-base",
      lg: "py-3 px-6 text-lg",
      xl: "py-4 px-8 text-xl",
   };

   const widthClass = fullWidth ? "w-full" : "";
   const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

   // Handle special neon variant
   let variantClass = "";
   if (variant.startsWith("neon-")) {
      const neonColor = variant.split("-")[1];
      variantClass = variantClasses.neon[neonColor] || variantClasses.neon.blue;
   } else {
      variantClass = variantClasses[variant] || variantClasses.primary;
   }

   const classes = `${baseClasses} ${variantClass} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

   const buttonContent = (
      <>
         <div className='inline-flex items-center justify-center'>
            {icon && iconPosition === "left" && <span className='mr-2 flex-shrink-0'>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span className='ml-2 flex-shrink-0'>{icon}</span>}
         </div>
         {ripple && !disabled && (
            <span className='absolute inset-0 pointer-events-none'>
               <span className='animate-ping absolute inset-0 rounded-lg bg-white opacity-10'></span>
            </span>
         )}
      </>
   );

   if (!animate || disabled) {
      return (
         <button type={type} className={classes} onClick={onClick} disabled={disabled}>
            {buttonContent}
         </button>
      );
   }

   return (
      <motion.button
         type={type}
         className={classes}
         onClick={onClick}
         disabled={disabled}
         whileHover={{
            scale: 1.02,
            y: -2,
            boxShadow: neon ? "0 0 10px currentColor, 0 0 20px currentColor/50" : "0 10px 15px rgba(0, 0, 0, 0.1)",
         }}
         whileTap={{ scale: 0.98 }}
         transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
         }}>
         {buttonContent}
      </motion.button>
   );
};

export default Button;
