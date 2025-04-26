import React from "react";
import { motion } from "framer-motion";

const Input = ({
   type = "text",
   label,
   name,
   value,
   onChange,
   placeholder,
   error,
   required = false,
   className = "",
   variant = "default",
   glass = false,
   neon = false,
   neonColor = "blue",
   icon = null,
   iconPosition = "left",
   animate = true,
   ...props
}) => {
   // Variants for the input
   const variantClasses = {
      default:
         "bg-white border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white",
      primary:
         "bg-white border-primary-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-primary-700 dark:text-white",
      secondary:
         "bg-white border-secondary-300 focus:border-secondary-500 focus:ring-secondary-500 dark:bg-gray-800 dark:border-secondary-700 dark:text-white",
      accent:
         "bg-white border-accent-300 focus:border-accent-500 focus:ring-accent-500 dark:bg-gray-800 dark:border-accent-700 dark:text-white",
      glass: "bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/70 focus:border-white/50 focus:ring-white/30",
   };

   // Neon variants
   const neonClasses = {
      blue: "bg-dark border-neon-blue text-white focus:border-neon-blue focus:ring-neon-blue/50",
      pink: "bg-dark border-neon-pink text-white focus:border-neon-pink focus:ring-neon-pink/50",
      green: "bg-dark border-neon-green text-white focus:border-neon-green focus:ring-neon-green/50",
      purple: "bg-dark border-neon-purple text-white focus:border-neon-purple focus:ring-neon-purple/50",
   };

   // Base classes for the input
   const baseClasses = "block w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 text-base";

   // Determine the variant class
   let variantClass = "";
   if (glass) {
      variantClass = variantClasses.glass;
   } else if (neon) {
      variantClass = neonClasses[neonColor];
   } else {
      variantClass = variantClasses[variant];
   }

   // Error classes
   const errorClass = error ? "border-danger focus:border-danger focus:ring-danger/50" : "";

   // Icon padding
   const iconPaddingClass = icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "";

   return (
      <div className='mb-4 relative'>
         {label && (
            <label
               htmlFor={name}
               className={`block text-sm font-semibold mb-1.5 ${
                  neon ? `text-${neonColor}` : glass ? "text-white" : "text-gray-800 dark:text-gray-200"
               }`}>
               {label} {required && <span className='text-danger'>*</span>}
            </label>
         )}

         <div className='relative'>
            {icon && iconPosition === "left" && (
               <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <span className={`${neon ? `text-${neonColor}` : glass ? "text-white/70" : "text-gray-500"}`}>{icon}</span>
               </div>
            )}

            {animate ? (
               <motion.input
                  type={type}
                  id={name}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={`${baseClasses} ${variantClass} ${errorClass} ${iconPaddingClass} ${className}`}
                  required={required}
                  whileFocus={{
                     scale: 1.01,
                     boxShadow: neon ? `0 0 5px ${neonColor}, 0 0 10px ${neonColor}/50` : "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{
                     duration: 0.2,
                     ease: [0.25, 0.1, 0.25, 1.0],
                  }}
                  {...props}
               />
            ) : (
               <input
                  type={type}
                  id={name}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={`${baseClasses} ${variantClass} ${errorClass} ${iconPaddingClass} ${className}`}
                  required={required}
                  {...props}
               />
            )}

            {icon && iconPosition === "right" && (
               <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <span className={`${neon ? `text-${neonColor}` : glass ? "text-white/70" : "text-gray-500"}`}>{icon}</span>
               </div>
            )}
         </div>

         {error && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='mt-1.5 text-sm text-danger'>
               {error}
            </motion.p>
         )}
      </div>
   );
};

export default Input;
