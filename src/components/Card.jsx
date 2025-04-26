import React from "react";
import { motion } from "framer-motion";
import HoverCard from "./animations/HoverCard";

const Card = ({
   children,
   title,
   subtitle,
   className = "",
   padding = "p-6",
   hover = false,
   onClick,
   variant = "default",
   animate = true,
   gradient = false,
   glass = false,
   border = true,
   neon = false,
   neonColor = "blue",
   shadow = true,
   scale = 1.03,
}) => {
   const clickHandler = hover && onClick ? onClick : undefined;

   // Card variants
   const variantClasses = {
      default: "bg-white dark:bg-dark-800",
      primary: gradient
         ? "bg-gradient-to-br from-primary-500/10 to-primary-700/10 border-primary-500/20"
         : "bg-primary-50 dark:bg-primary-900/20 border-primary-500/20",
      secondary: gradient
         ? "bg-gradient-to-br from-secondary-500/10 to-secondary-700/10 border-secondary-500/20"
         : "bg-secondary-50 dark:bg-secondary-900/20 border-secondary-500/20",
      accent: gradient
         ? "bg-gradient-to-br from-accent-500/10 to-accent-700/10 border-accent-500/20"
         : "bg-accent-50 dark:bg-accent-900/20 border-accent-500/20",
      dark: "bg-gray-900 text-white border-gray-800",
      glass: "bg-white/10 backdrop-blur-md border-white/20",
   };

   // Neon variants
   const neonClasses = {
      blue: "border-neon-blue shadow-neon-blue",
      pink: "border-neon-pink shadow-neon-pink",
      green: "border-neon-green shadow-neon-green",
      purple: "border-neon-purple shadow-neon-purple",
   };

   // Determine the base classes
   let baseClasses = `rounded-xl ${padding} ${border ? "border" : ""} ${shadow ? "shadow-md" : ""}`;

   // Add variant-specific classes
   if (glass) {
      baseClasses += ` ${variantClasses.glass}`;
   } else if (neon) {
      baseClasses += ` bg-dark ${neonClasses[neonColor]}`;
   } else {
      baseClasses += ` ${variantClasses[variant]}`;
   }

   const cardContent = (
      <>
         {title && <h3 className={`text-lg font-bold ${neon ? `text-${neonColor}` : "text-gray-800 dark:text-white"}`}>{title}</h3>}
         {subtitle && <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>{subtitle}</p>}
         {(title || subtitle) && <div className='mt-4'>{children}</div>}
         {!title && !subtitle && children}
      </>
   );

   // If not animated or not hoverable, return a simple div
   if (!animate || (!hover && !onClick)) {
      return (
         <div className={`${baseClasses} ${className}`} onClick={clickHandler}>
            {cardContent}
         </div>
      );
   }

   // If hoverable but not clickable, use HoverCard
   if (hover && !onClick) {
      return (
         <HoverCard className={`${baseClasses} ${className}`} scale={scale} shadow={shadow}>
            {cardContent}
         </HoverCard>
      );
   }

   // If clickable, use motion.div with tap animation
   return (
      <motion.div
         className={`${baseClasses} ${className} cursor-pointer`}
         onClick={onClick}
         whileHover={{
            scale: scale,
            y: -5,
            boxShadow: neon ? "0 0 10px currentColor, 0 0 20px currentColor/50" : "0 20px 25px rgba(0, 0, 0, 0.1)",
         }}
         whileTap={{ scale: 0.98 }}
         transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
         }}>
         {cardContent}
      </motion.div>
   );
};

export default Card;
