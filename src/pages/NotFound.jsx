import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
   return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12'>
         <div className='text-center'>
            <h1 className='text-9xl font-bold text-primary-500'>404</h1>
            <h2 className='text-3xl font-bold text-gray-800 mt-4'>Page Not Found</h2>
            <p className='text-gray-600 mt-2 max-w-md mx-auto'>
               The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className='mt-8'>
               <Link to='/'>
                  <Button variant='primary' size='lg'>
                     Go Back Home
                  </Button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default NotFound;
