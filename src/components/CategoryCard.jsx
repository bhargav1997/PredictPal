import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ category, index = 0 }) => {
   const { name, icon, gradient, image } = category;

   return (
      <Link to='/battles' className='block'>
         <motion.div
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} h-48 shadow-lg group`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
               duration: 0.5,
               delay: index * 0.1,
               ease: [0.25, 0.1, 0.25, 1.0],
            }}
            whileHover={{
               y: -5,
               scale: 1.03,
               boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}>
            {/* Background image with overlay */}
            {image && (
               <div className='absolute inset-0 bg-gradient-to-br from-black/50 to-black/20 z-10'>
                  <img
                     src={image}
                     alt={name}
                     className='w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300'
                  />
               </div>
            )}

            {/* Content */}
            <div className='relative z-20 flex flex-col items-center justify-center h-full p-6 text-white'>
               <motion.span
                  className='text-5xl mb-3'
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                     delay: index * 0.1 + 0.2,
                     duration: 0.5,
                     ease: [0.25, 0.1, 0.25, 1.0],
                  }}>
                  {icon}
               </motion.span>

               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     delay: index * 0.1 + 0.3,
                     duration: 0.5,
                     ease: [0.25, 0.1, 0.25, 1.0],
                  }}>
                  <h3 className='text-xl font-bold tracking-wide text-white'>{name}</h3>
                  <div className='mt-2 w-12 h-1 bg-white/50 rounded-full mx-auto group-hover:w-20 transition-all duration-300'></div>
               </motion.div>

               {/* Hover effect - glowing border */}
               <motion.div
                  className='absolute inset-0 border-2 border-white/0 rounded-xl'
                  whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
               />

               {/* Animated arrow on hover */}
               <motion.div
                  className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     className='h-6 w-6 text-white'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'>
                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
               </motion.div>
            </div>
         </motion.div>
      </Link>
   );
};

export default CategoryCard;
