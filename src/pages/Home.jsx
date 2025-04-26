import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../utils/mockData";
import { useAuth } from "../context/AuthContext";
import NeonText from "../components/NeonText";
import AnimatedGradient from "../components/animations/AnimatedGradient";
import FadeIn from "../components/animations/FadeIn";
import AnimatedCounter from "../components/animations/AnimatedCounter";

const Home = () => {
   const { login } = useAuth();
   const navigate = useNavigate();
   const [stats, setStats] = useState({ users: 0, predictions: 0, winnings: 0 });

   // Simulate stats loading
   useEffect(() => {
      const timer = setTimeout(() => {
         setStats({
            users: 15000,
            predictions: 250000,
            winnings: 500000,
         });
      }, 500);

      return () => clearTimeout(timer);
   }, []);

   const handleDemoLogin = async () => {
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));
         const success = await login("demo@example.com", "password123");
         if (success) {
            navigate("/dashboard");
         }
      } catch (error) {
         console.error("Demo login failed:", error);
      }
   };

   return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
         {/* Hero Section */}
         <section className='relative min-h-[90vh] flex items-center overflow-hidden'>
            {/* Animated background */}
            <AnimatedGradient
               colors={["#6366f1", "#14b8a6", "#f59e0b", "#ef4444"]}
               className='absolute inset-0 z-0'
               opacity={0.1}
               blur={100}
            />

            {/* Hero content */}
            <div className='container mx-auto px-4 z-10 py-20'>
               <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                  <div className='text-center lg:text-left'>
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500'>
                           PredictPal
                        </h1>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='relative'>
                        <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary-500'>Predict. Battle. Win.</h2>
                        <motion.span
                           className='absolute inset-0 text-2xl md:text-3xl font-bold mb-6 text-primary-500'
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
                           Predict. Battle. Win.
                        </motion.span>
                     </motion.div>

                     <motion.p
                        className='text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}>
                        Start with free coins. Master your prediction skills. Then win real money in exciting battles against other players!
                     </motion.p>

                     <motion.div
                        className='flex flex-col sm:flex-row justify-center lg:justify-start gap-4'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}>
                        <Link to='/signup'>
                           <Button
                              variant='primary'
                              size='lg'
                              gradient={true}
                              icon={
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
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
                              }>
                              Sign Up Free
                           </Button>
                        </Link>
                        <Link to='/login'>
                           <Button
                              variant='outline'
                              size='lg'
                              glass={true}
                              className='text-gray-800 dark:text-white border-gray-300 dark:border-gray-700'
                              icon={
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth={2}
                                       d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                                    />
                                 </svg>
                              }>
                              Login
                           </Button>
                        </Link>
                        <Button
                           variant='neon-blue'
                           size='lg'
                           neon={true}
                           onClick={handleDemoLogin}
                           icon={
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='h-5 w-5'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'>
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                                 />
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                 />
                              </svg>
                           }>
                           Try Demo
                        </Button>
                     </motion.div>

                     {/* Stats */}
                     <motion.div
                        className='mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}>
                        <div className='text-center'>
                           <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Users</p>
                           <p className='text-2xl font-bold text-primary-500'>
                              <AnimatedCounter value={stats.users} prefix='+' />
                           </p>
                        </div>
                        <div className='text-center'>
                           <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Predictions</p>
                           <p className='text-2xl font-bold text-secondary-500'>
                              <AnimatedCounter value={stats.predictions} prefix='+' />
                           </p>
                        </div>
                        <div className='text-center'>
                           <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>Winnings</p>
                           <p className='text-2xl font-bold text-accent-500'>
                              <AnimatedCounter value={stats.winnings} prefix='$' />
                           </p>
                        </div>
                     </motion.div>
                  </div>

                  {/* Hero image/illustration */}
                  <motion.div
                     className='hidden lg:block'
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.7 }}>
                     <div className='relative'>
                        <div className='absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur-lg opacity-75 animate-pulse'></div>
                        <div className='relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl'>
                           <img
                              src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                              alt='Prediction Concept'
                              className='w-full h-auto rounded-lg'
                           />
                           <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8'>
                              <div>
                                 <h3 className='text-white text-xl font-bold mb-2'>Make Smart Predictions</h3>
                                 <p className='text-white/80'>Join thousands of predictors winning daily</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>

            {/* Decorative elements */}
            <div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-10'></div>
            <motion.div
               className='absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl'
               animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
               }}
               transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "easeInOut",
               }}></motion.div>
            <motion.div
               className='absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl'
               animate={{
                  x: [0, -50, 0],
                  y: [0, 30, 0],
               }}
               transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "easeInOut",
               }}></motion.div>
         </section>

         {/* How It Works */}
         <section className='py-24 container mx-auto px-4'>
            <FadeIn>
               <h2 className='text-4xl font-bold text-center mb-4'>How It Works</h2>
               <div className='w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-16 rounded-full'></div>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto'>
               <FadeIn delay={0.1}>
                  <div className='relative group'>
                     <div className='absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500'></div>
                     <div className='relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl'>
                        <div className='bg-primary-500/10 dark:bg-primary-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                           <span className='text-2xl font-bold text-primary-500'>1</span>
                        </div>
                        <h3 className='text-xl font-bold mb-3 text-gray-900 dark:text-white'>Make Predictions</h3>
                        <p className='text-gray-700 dark:text-gray-300'>
                           Choose from various categories and predict outcomes of events with confidence.
                        </p>

                        <div className='mt-6 flex items-center text-primary-500'>
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
                                 d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                           </svg>
                           <span className='text-sm'>Easy to start</span>
                        </div>
                     </div>
                  </div>
               </FadeIn>

               <FadeIn delay={0.3}>
                  <div className='relative group mt-8 md:mt-12 lg:mt-0'>
                     <div className='absolute -inset-0.5 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500'></div>
                     <div className='relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl'>
                        <div className='bg-secondary-500/10 dark:bg-secondary-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                           <span className='text-2xl font-bold text-secondary-500'>2</span>
                        </div>
                        <h3 className='text-xl font-bold mb-3 text-gray-900 dark:text-white'>Battle Others</h3>
                        <p className='text-gray-700 dark:text-gray-300'>
                           Create or join battles against other players with your predictions and strategy.
                        </p>

                        <div className='mt-6 flex items-center text-secondary-500'>
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
                                 d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                              />
                           </svg>
                           <span className='text-sm'>Compete & win</span>
                        </div>
                     </div>
                  </div>
               </FadeIn>

               <FadeIn delay={0.5}>
                  <div className='relative group mt-8 md:mt-24 lg:mt-0'>
                     <div className='absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500'></div>
                     <div className='relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl'>
                        <div className='bg-accent-500/10 dark:bg-accent-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                           <span className='text-2xl font-bold text-accent-500'>3</span>
                        </div>
                        <h3 className='text-xl font-bold mb-3 text-gray-900 dark:text-white'>Win Rewards</h3>
                        <p className='text-gray-700 dark:text-gray-300'>
                           Win virtual coins and convert them to real money as you succeed in your predictions.
                        </p>

                        <div className='mt-6 flex items-center text-accent-500'>
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
                                 d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                           </svg>
                           <span className='text-sm'>Cash out anytime</span>
                        </div>
                     </div>
                  </div>
               </FadeIn>
            </div>

            <div className='mt-16 text-center'>
               <FadeIn delay={0.7}>
                  <Link to='/signup' className='inline-block'>
                     <button className='py-3 px-6 text-lg font-bold rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200'>
                        Get Started Now
                     </button>
                  </Link>
               </FadeIn>
            </div>
         </section>

         {/* Categories */}
         <section className='py-24 relative overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'></div>
            <div className='absolute inset-0 opacity-30'>
               <div
                  className='absolute top-0 left-0 w-full h-full opacity-10'
                  style={{
                     backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
                     backgroundSize: "20px 20px",
                  }}></div>
            </div>

            <div className='container mx-auto px-4 relative z-10'>
               <FadeIn>
                  <h2 className='text-4xl font-bold text-center mb-4'>Prediction Categories</h2>
                  <div className='w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-16 rounded-full'></div>
                  <p className='text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12'>
                     Choose from a variety of exciting categories to make your predictions and compete with others.
                  </p>
               </FadeIn>

               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
                  {categories.map((category, index) => (
                     <CategoryCard key={category.id} category={category} index={index} />
                  ))}
               </div>

               <div className='mt-16 text-center'>
                  <FadeIn delay={0.5}>
                     <Link to='/battles' className='inline-block'>
                        <button className='py-3 px-6 text-lg font-bold rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:shadow-lg hover:shadow-secondary-500/20 transition-all duration-200'>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                           </svg>
                           View All Categories
                        </button>
                     </Link>
                  </FadeIn>
               </div>
            </div>
         </section>

         {/* Testimonials */}
         <section className='py-24 container mx-auto px-4'>
            <FadeIn>
               <h2 className='text-4xl font-bold text-center mb-4'>What Our Users Say</h2>
               <div className='w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-16 rounded-full'></div>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
               <FadeIn delay={0.1}>
                  <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl relative'>
                     {/* Quote mark */}
                     <div className='absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl font-bold'>
                        "
                     </div>

                     <div className='mb-6'>
                        {/* Star rating */}
                        <div className='flex mb-4'>
                           {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                 key={star}
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='h-5 w-5 text-yellow-500'
                                 viewBox='0 0 20 20'
                                 fill='currentColor'>
                                 <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                           ))}
                        </div>

                        <p className='text-gray-700 dark:text-gray-300 mb-6 text-lg'>
                           "I've won over 10,000 coins in just two weeks! The platform is super easy to use and fun. The predictions are
                           exciting!"
                        </p>
                     </div>

                     <div className='flex items-center'>
                        <img
                           src='https://randomuser.me/api/portraits/men/32.jpg'
                           alt='Alex Johnson'
                           className='w-12 h-12 rounded-full object-cover border-2 border-primary-500/30 mr-4'
                        />
                        <div>
                           <p className='font-bold text-gray-900 dark:text-white'>Alex Johnson</p>
                           <p className='text-sm text-gray-500 dark:text-gray-400'>Pro Predictor</p>
                        </div>
                     </div>
                  </div>
               </FadeIn>

               <FadeIn delay={0.3}>
                  <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl relative mt-10 md:mt-0'>
                     {/* Quote mark */}
                     <div className='absolute -top-5 -left-5 w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white text-xl font-bold'>
                        "
                     </div>

                     <div className='mb-6'>
                        {/* Star rating */}
                        <div className='flex mb-4'>
                           {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                 key={star}
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='h-5 w-5 text-yellow-500'
                                 viewBox='0 0 20 20'
                                 fill='currentColor'>
                                 <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                           ))}
                        </div>

                        <p className='text-gray-700 dark:text-gray-300 mb-6 text-lg'>
                           "PredictPal has the best prediction battles. I love competing against other users! The community is amazing and
                           supportive."
                        </p>
                     </div>

                     <div className='flex items-center'>
                        <img
                           src='https://randomuser.me/api/portraits/women/44.jpg'
                           alt='Sarah Williams'
                           className='w-12 h-12 rounded-full object-cover border-2 border-secondary-500/30 mr-4'
                        />
                        <div>
                           <p className='font-bold text-gray-900 dark:text-white'>Sarah Williams</p>
                           <p className='text-sm text-gray-500 dark:text-gray-400'>Battle Champion</p>
                        </div>
                     </div>
                  </div>
               </FadeIn>

               <FadeIn delay={0.5}>
                  <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl relative mt-10 lg:mt-0'>
                     {/* Quote mark */}
                     <div className='absolute -top-5 -left-5 w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white text-xl font-bold'>
                        "
                     </div>

                     <div className='mb-6'>
                        {/* Star rating */}
                        <div className='flex mb-4'>
                           {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                 key={star}
                                 xmlns='http://www.w3.org/2000/svg'
                                 className='h-5 w-5 text-yellow-500'
                                 viewBox='0 0 20 20'
                                 fill='currentColor'>
                                 <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                           ))}
                        </div>

                        <p className='text-gray-700 dark:text-gray-300 mb-6 text-lg'>
                           "Started with free coins and now I'm making real money. This is addictive! The payouts are fast and the platform
                           is reliable."
                        </p>
                     </div>

                     <div className='flex items-center'>
                        <img
                           src='https://randomuser.me/api/portraits/men/62.jpg'
                           alt='Michael Brown'
                           className='w-12 h-12 rounded-full object-cover border-2 border-accent-500/30 mr-4'
                        />
                        <div>
                           <p className='font-bold text-gray-900 dark:text-white'>Michael Brown</p>
                           <p className='text-sm text-gray-500 dark:text-gray-400'>Top Earner</p>
                        </div>
                     </div>
                  </div>
               </FadeIn>
            </div>
         </section>

         {/* CTA */}
         <section className='py-24 bg-gradient-to-r from-primary-600 to-secondary-600'>
            <div className='container mx-auto px-4'>
               <div className='max-w-4xl mx-auto text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white'>Ready to Start Predicting?</h2>
                  <p className='text-xl mb-10 text-white opacity-90 max-w-2xl mx-auto'>
                     Join thousands of users making predictions and winning rewards daily. Start your journey today!
                  </p>

                  <div className='flex flex-col sm:flex-row justify-center gap-6'>
                     <Link to='/signup' className='w-full sm:w-auto'>
                        <button className='w-full sm:w-auto py-3 px-6 text-lg font-bold rounded-lg flex items-center justify-center gap-2 bg-accent-500 text-white hover:bg-accent-600 transition-all duration-200 shadow-lg'>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                           </svg>
                           Get Started Now
                        </button>
                     </Link>
                     <button
                        onClick={handleDemoLogin}
                        className='w-full sm:w-auto py-3 px-6 text-lg font-bold rounded-lg flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-gray-100 transition-all duration-200 shadow-lg'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                           />
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        Try Demo
                     </button>
                  </div>

                  <p className='text-white opacity-80 text-sm mt-8'>No credit card required. Start with free coins.</p>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className='bg-gray-900 text-white pt-16 pb-8'>
            <div className='container mx-auto px-4'>
               <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
                  <div>
                     <div className='mb-6'>
                        <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500'>
                           PredictPal
                        </h3>
                        <p className='text-gray-400 mt-2'>Predict. Battle. Win.</p>
                     </div>
                     <p className='text-gray-400 mb-4'>
                        The ultimate prediction platform where you can compete with others and win real rewards.
                     </p>
                     <div className='flex space-x-4'>
                        <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                           <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                           </svg>
                        </a>
                        <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                           <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                           </svg>
                        </a>
                        <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                           <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                           </svg>
                        </a>
                     </div>
                  </div>

                  <div>
                     <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
                     <ul className='space-y-2'>
                        <li>
                           <Link to='/' className='text-gray-400 hover:text-white transition-colors'>
                              Home
                           </Link>
                        </li>
                        <li>
                           <Link to='/battles' className='text-gray-400 hover:text-white transition-colors'>
                              Battles
                           </Link>
                        </li>
                        <li>
                           <Link to='/leaderboard' className='text-gray-400 hover:text-white transition-colors'>
                              Leaderboard
                           </Link>
                        </li>
                        <li>
                           <Link to='/wallet' className='text-gray-400 hover:text-white transition-colors'>
                              Wallet
                           </Link>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h4 className='text-lg font-semibold mb-4'>Support</h4>
                     <ul className='space-y-2'>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Help Center
                           </a>
                        </li>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Community
                           </a>
                        </li>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Contact Us
                           </a>
                        </li>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              FAQ
                           </a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h4 className='text-lg font-semibold mb-4'>Legal</h4>
                     <ul className='space-y-2'>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Terms of Service
                           </a>
                        </li>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Privacy Policy
                           </a>
                        </li>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Cookie Policy
                           </a>
                        </li>
                        <li>
                           <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                              Responsible Gaming
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className='border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center'>
                  <p className='text-gray-400 text-sm mb-4 md:mb-0'>© {new Date().getFullYear()} PredictPal. All rights reserved.</p>
                  <div className='flex space-x-6'>
                     <div className='h-6 w-10 bg-gray-700 rounded'></div>
                     <div className='h-6 w-10 bg-gray-700 rounded'></div>
                     <div className='h-6 w-10 bg-gray-700 rounded'></div>
                     <div className='h-6 w-10 bg-gray-700 rounded'></div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Home;
