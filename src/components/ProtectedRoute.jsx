import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Loading from "./Loading";

const ProtectedRoute = () => {
   const { user } = useAuth();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // Simulate checking authentication
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
   }, []);

   if (isLoading) {
      return (
         <div className='min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center'>
            <Loading size='md' color='primary' type='spinner' text='Authenticating...' />
         </div>
      );
   }

   if (!user) {
      return <Navigate to='/login' replace />;
   }

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
         className='min-h-screen bg-gray-50 dark:bg-dark'>
         <Navbar />
         <div className='pt-16'>
            <Outlet />
         </div>
      </motion.div>
   );
};

export default ProtectedRoute;
