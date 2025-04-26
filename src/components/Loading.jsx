import React from "react";
import { motion } from "framer-motion";

const Loading = ({ size = "md", color = "primary", fullScreen = false, text = null, type = "spinner", glassmorphism = false }) => {
   const sizeClasses = {
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      md: "w-10 h-10",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
   };

   const colorClasses = {
      primary: "text-primary-500",
      secondary: "text-secondary-500",
      accent: "text-accent-500",
      white: "text-white",
      neon: {
         blue: "text-neon-blue",
         pink: "text-neon-pink",
         green: "text-neon-green",
         purple: "text-neon-purple",
      },
   };

   // Determine color class
   let colorClass = "";
   if (typeof color === "string" && color.startsWith("neon-")) {
      const neonColor = color.split("-")[1];
      colorClass = colorClasses.neon[neonColor] || colorClasses.neon.blue;
   } else {
      colorClass = colorClasses[color] || colorClasses.primary;
   }

   const containerClasses = fullScreen
      ? `fixed inset-0 flex flex-col items-center justify-center z-50 ${glassmorphism ? "bg-white/10 backdrop-blur-md" : "bg-gray-900/50"}`
      : "";

   // Spinner animation
   const spinnerVariants = {
      animate: {
         rotate: 360,
         transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
         },
      },
   };

   // Dots animation
   const dotsVariants = {
      animate: {
         transition: {
            staggerChildren: 0.2,
         },
      },
   };

   const dotVariants = {
      initial: { y: 0, opacity: 0.5 },
      animate: {
         y: [0, -10, 0],
         opacity: [0.5, 1, 0.5],
         transition: {
            repeat: Infinity,
            duration: 1,
         },
      },
   };

   // Pulse animation
   const pulseVariants = {
      animate: {
         scale: [1, 1.2, 1],
         opacity: [0.5, 1, 0.5],
         transition: {
            repeat: Infinity,
            duration: 1.5,
         },
      },
   };

   // Render different loading types
   const renderLoadingIndicator = () => {
      switch (type) {
         case "dots":
            return (
               <motion.div className='flex space-x-2' variants={dotsVariants} animate='animate'>
                  {[0, 1, 2].map((i) => (
                     <motion.div
                        key={i}
                        className={`rounded-full ${sizeClasses.sm} ${colorClass}`}
                        variants={dotVariants}
                        initial='initial'
                        animate='animate'
                        style={{
                           backgroundColor: "currentColor",
                           transition: {
                              delay: i * 0.2,
                           },
                        }}
                     />
                  ))}
               </motion.div>
            );

         case "pulse":
            return (
               <motion.div
                  className={`rounded-full ${sizeClasses[size]} ${colorClass}`}
                  style={{ backgroundColor: "currentColor" }}
                  variants={pulseVariants}
                  animate='animate'
               />
            );

         case "spinner":
         default:
            return (
               <motion.svg
                  className={`${sizeClasses[size]} ${colorClass}`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  variants={spinnerVariants}
                  animate='animate'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                     className='opacity-75'
                     fill='currentColor'
                     d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
               </motion.svg>
            );
      }
   };

   return (
      <div className={containerClasses}>
         <div className='flex flex-col items-center justify-center'>
            {renderLoadingIndicator()}

            {text && (
               <motion.p
                  className={`mt-4 font-medium ${colorClass}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}>
                  {text}
               </motion.p>
            )}
         </div>
      </div>
   );
};

export default Loading;
