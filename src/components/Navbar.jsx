import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NeonText from "./NeonText";
import Button from "./Button";

const Navbar = () => {
   const { user, logout } = useAuth();
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const [notifications, setNotifications] = useState(user?.notifications?.filter((n) => !n.read) || []);

   // Handle scroll effect
   useEffect(() => {
      const handleScroll = () => {
         const isScrolled = window.scrollY > 10;
         if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [scrolled]);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setIsMenuOpen(false);
   };

   const isActive = (path) => {
      return location.pathname === path;
   };

   // Icons for nav links
   const navIcons = {
      Home: (
         <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={2}
               d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
         </svg>
      ),
      Wallet: (
         <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={2}
               d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
            />
         </svg>
      ),
      Battles: (
         <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={2}
               d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            />
         </svg>
      ),
      Leaderboard: (
         <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={2}
               d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
         </svg>
      ),
      Profile: (
         <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth={2}
               d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
         </svg>
      ),
   };

   const navLinks = user
      ? [
           { name: "Home", path: "/dashboard", icon: navIcons["Home"] },
           { name: "Wallet", path: "/wallet", icon: navIcons["Wallet"] },
           { name: "Battles", path: "/battles", icon: navIcons["Battles"] },
           { name: "Leaderboard", path: "/leaderboard", icon: navIcons["Leaderboard"] },
           { name: "Profile", path: "/profile", icon: navIcons["Profile"] },
        ]
      : [{ name: "Home", path: "/", icon: navIcons["Home"] }];

   return (
      <motion.nav
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-lg" : "bg-white dark:bg-dark"
         }`}
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ duration: 0.3 }}>
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
               <div className='flex items-center'>
                  <Link to='/' className='flex-shrink-0 flex items-center'>
                     <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='relative'>
                        <span className='text-2xl font-bold text-primary-500'>PredictPal</span>
                        <motion.span
                           className='absolute inset-0 text-2xl font-bold text-primary-500'
                           animate={{
                              textShadow: [
                                 "0 0 5px #6366f1, 0 0 10px #6366f1",
                                 "0 0 10px #6366f1, 0 0 20px #6366f1",
                                 "0 0 5px #6366f1, 0 0 10px #6366f1",
                              ],
                           }}
                           transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                           }}>
                           PredictPal
                        </motion.span>
                     </motion.div>
                  </Link>
               </div>

               {/* Desktop menu */}
               <div className='hidden md:flex md:items-center md:space-x-1'>
                  {navLinks.map((link, index) => (
                     <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                           duration: 0.3,
                           delay: index * 0.1,
                           ease: [0.25, 0.1, 0.25, 1.0],
                        }}>
                        <Link
                           to={link.path}
                           className={`relative flex items-center px-3 py-2 rounded-lg text-sm font-semibold mx-1 transition-all group ${
                              isActive(link.path)
                                 ? "bg-primary-500/10 text-primary-500 dark:bg-primary-500/20"
                                 : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                           }`}>
                           <span className='mr-1.5'>{link.icon}</span>
                           <span>{link.name}</span>

                           {/* Underline effect on hover */}
                           <span
                              className={`absolute bottom-0.5 left-1/2 w-0 h-0.5 bg-current transform -translate-x-1/2 transition-all duration-300 group-hover:w-4/5 ${
                                 isActive(link.path) ? "bg-primary-500" : ""
                              }`}></span>
                        </Link>
                     </motion.div>
                  ))}

                  {user && (
                     <div className='flex items-center ml-4 space-x-3'>
                        {/* Notifications */}
                        {notifications.length > 0 && (
                           <motion.div className='relative' initial={{ scale: 0.8 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
                              <button className='p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 relative'>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5 text-gray-700 dark:text-gray-300'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth={2}
                                       d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                                    />
                                 </svg>
                                 <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                    {notifications.length}
                                 </span>
                              </button>
                           </motion.div>
                        )}

                        {/* User avatar */}
                        <motion.div className='relative' initial={{ scale: 0.8 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
                           {user.avatar ? (
                              <img
                                 src={user.avatar}
                                 alt={user.username}
                                 className='h-8 w-8 rounded-full object-cover border-2 border-primary-500'
                                 onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://randomuser.me/api/portraits/men/85.jpg";
                                 }}
                              />
                           ) : (
                              <img
                                 src='https://randomuser.me/api/portraits/men/85.jpg'
                                 alt={user.username}
                                 className='h-8 w-8 rounded-full object-cover border-2 border-primary-500'
                              />
                           )}
                        </motion.div>

                        {/* Logout button */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                           <Button
                              variant='outline'
                              size='sm'
                              onClick={logout}
                              icon={
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-4 w-4'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth={2}
                                       d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                                    />
                                 </svg>
                              }>
                              Logout
                           </Button>
                        </motion.div>
                     </div>
                  )}
               </div>

               {/* Mobile menu button */}
               <div className='flex items-center md:hidden'>
                  <motion.button
                     onClick={toggleMenu}
                     className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none'
                     whileTap={{ scale: 0.9 }}>
                     <span className='sr-only'>Open main menu</span>
                     {isMenuOpen ? (
                        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                     ) : (
                        <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                     )}
                  </motion.button>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         <AnimatePresence>
            {isMenuOpen && (
               <motion.div
                  className='md:hidden bg-white dark:bg-dark shadow-lg'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}>
                  <div className='px-2 pt-2 pb-3 space-y-1'>
                     {navLinks.map((link, index) => (
                        <motion.div
                           key={link.path}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{
                              duration: 0.3,
                              delay: index * 0.05,
                              ease: [0.25, 0.1, 0.25, 1.0],
                           }}>
                           <Link
                              to={link.path}
                              className={`relative flex items-center px-3 py-2 rounded-md text-base font-semibold group ${
                                 isActive(link.path)
                                    ? "bg-primary-500/10 text-primary-500 dark:bg-primary-500/20"
                                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                              onClick={closeMenu}>
                              <span className='mr-2'>{link.icon}</span>
                              <span>{link.name}</span>

                              {/* Underline effect on hover */}
                              <span
                                 className={`absolute bottom-0.5 left-1/2 w-0 h-0.5 bg-current transform -translate-x-1/2 transition-all duration-300 group-hover:w-4/5 ${
                                    isActive(link.path) ? "bg-primary-500" : ""
                                 }`}></span>
                           </Link>
                        </motion.div>
                     ))}

                     {user && (
                        <motion.div
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{
                              duration: 0.3,
                              delay: navLinks.length * 0.05,
                              ease: [0.25, 0.1, 0.25, 1.0],
                           }}>
                           <button
                              onClick={() => {
                                 logout();
                                 closeMenu();
                              }}
                              className='relative flex items-center w-full text-left px-3 py-2 rounded-md text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group'>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='h-5 w-5 mr-2'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'>
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                                 />
                              </svg>
                              <span>Logout</span>

                              {/* Underline effect on hover */}
                              <span className='absolute bottom-0.5 left-1/2 w-0 h-0.5 bg-current transform -translate-x-1/2 transition-all duration-300 group-hover:w-4/5'></span>
                           </button>
                        </motion.div>
                     )}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.nav>
   );
};

export default Navbar;
