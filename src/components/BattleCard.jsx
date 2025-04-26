import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "./Card";
import Button from "./Button";

const BattleCard = ({ battle, showJoinButton = false, onJoin, index = 0 }) => {
   const { id, category, title, description, entryFee, status, creator, opponent, endTime, categoryColor, categoryGradient } = battle;

   const formatTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;

      if (diff <= 0) return "Ended";

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
         return `${hours}h ${minutes}m left`;
      } else if (minutes > 0) {
         return `${minutes}m ${seconds}s left`;
      } else {
         return `${seconds}s left`;
      }
   };

   const getStatusBadge = () => {
      const statusColors = {
         open: "bg-green-500/20 text-green-500 border border-green-500/30",
         "in-progress": "bg-primary-500/20 text-primary-500 border border-primary-500/30",
         completed: "bg-gray-500/20 text-gray-500 border border-gray-500/30",
      };

      const statusIcons = {
         open: (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
               />
            </svg>
         ),
         "in-progress": (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
         ),
         completed: (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
         ),
      };

      return (
         <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusColors[status]}`}>
            {statusIcons[status]}
            {status === "open" ? "Open" : status === "in-progress" ? "In Progress" : "Completed"}
         </span>
      );
   };

   const getCategoryBadge = () => {
      return (
         <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${categoryColor} bg-opacity-20 border border-opacity-30`}>
            {category}
         </span>
      );
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: [0.25, 0.1, 0.25, 1.0],
         }}>
         <Card
            className='h-full flex flex-col overflow-hidden'
            hover={true}
            variant={category.toLowerCase()}
            gradient={true}
            animate={true}>
            {/* Top badges */}
            <div className='flex justify-between items-start mb-3'>
               {getCategoryBadge()}
               {getStatusBadge()}
            </div>

            {/* Title */}
            <h3 className='text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white'>{title}</h3>

            {/* Description */}
            {description && <p className='text-sm text-gray-700 dark:text-gray-200 mb-4 line-clamp-2'>{description}</p>}

            {/* Battle info */}
            <div className='mb-4 space-y-2'>
               <div className='flex items-center text-sm text-gray-700 dark:text-gray-200'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     className='h-4 w-4 mr-2 text-primary-500'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'>
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                     />
                  </svg>
                  <span className='font-semibold'>{entryFee} coins</span>
               </div>

               <div className='flex items-center text-sm text-gray-700 dark:text-gray-200'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     className='h-4 w-4 mr-2 text-secondary-500'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'>
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                     />
                  </svg>
                  <span>
                     Created by: <span className='font-semibold'>{creator.username}</span>
                  </span>
               </div>

               {opponent && (
                  <div className='flex items-center text-sm text-gray-700 dark:text-gray-200'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-2 text-accent-500'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth={2}
                           d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                        />
                     </svg>
                     <span>
                        Opponent: <span className='font-semibold'>{opponent.username}</span>
                     </span>
                  </div>
               )}

               <div className='flex items-center text-sm text-gray-700 dark:text-gray-200'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     className='h-4 w-4 mr-2 text-neon-purple'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'>
                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <span className='font-semibold'>{formatTimeLeft()}</span>
               </div>
            </div>

            {/* Action button */}
            <div className='mt-auto pt-2'>
               {showJoinButton && status === "open" ? (
                  <Button
                     variant='primary'
                     gradient={true}
                     fullWidth
                     onClick={() => onJoin(id)}
                     icon={
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                           />
                        </svg>
                     }>
                     Join Battle
                  </Button>
               ) : (
                  <Link to={`/battles/${id}`} className='w-full'>
                     <Button
                        variant={status === "completed" ? "outline" : "secondary"}
                        gradient={status !== "completed"}
                        fullWidth
                        icon={
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth={2}
                                 d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              />
                           </svg>
                        }>
                        View Details
                     </Button>
                  </Link>
               )}
            </div>
         </Card>
      </motion.div>
   );
};

export default BattleCard;
