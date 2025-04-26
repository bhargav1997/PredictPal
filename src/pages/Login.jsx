import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Card from "../components/Card";
import Loading from "../components/Loading";

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({});
   const { login, isLoading, error, setIsLoading } = useAuth();
   const navigate = useNavigate();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      // Clear error when user types
      if (errors[name]) {
         setErrors({
            ...errors,
            [name]: "",
         });
      }
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
         newErrors.password = "Password must be at least 6 characters";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const success = await login(formData.email, formData.password);
      if (success) {
         navigate("/dashboard");
      }
   };

   return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
         <div className='max-w-md w-full'>
            <div className='text-center mb-8'>
               <h1 className='text-3xl font-bold text-gray-900'>Welcome back</h1>
               <p className='mt-2 text-gray-600'>Sign in to your PredictPal account</p>
            </div>

            <Card>
               {isLoading && <Loading fullScreen />}

               <form onSubmit={handleSubmit} className='space-y-6'>
                  {error && <div className='bg-danger/10 text-danger p-3 rounded-md text-sm'>{error}</div>}

                  <Input
                     label='Email Address'
                     type='email'
                     name='email'
                     value={formData.email}
                     onChange={handleChange}
                     placeholder='Enter your email'
                     error={errors.email}
                     required
                  />

                  <Input
                     label='Password'
                     type='password'
                     name='password'
                     value={formData.password}
                     onChange={handleChange}
                     placeholder='Enter your password'
                     error={errors.password}
                     required
                  />

                  <div className='flex items-center justify-between'>
                     <div className='flex items-center'>
                        <input
                           id='remember-me'
                           name='remember-me'
                           type='checkbox'
                           className='h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded'
                        />
                        <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                           Remember me
                        </label>
                     </div>

                     <div className='text-sm'>
                        <a href='#' className='text-primary-500 hover:text-primary-500/80'>
                           Forgot password?
                        </a>
                     </div>
                  </div>

                  <button
                     type='submit'
                     className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'>
                     <div className='inline-flex items-center justify-center'>
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
                              d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                           />
                        </svg>
                        <span>Sign In</span>
                     </div>
                  </button>

                  <div className='mt-4 text-center'>
                     <p className='text-sm text-gray-600'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-primary-500 hover:text-primary-500/80 font-medium'>
                           Sign up
                        </Link>
                     </p>
                  </div>
               </form>

               <div className='mt-6'>
                  <div className='relative'>
                     <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                     </div>
                     <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                     </div>
                  </div>

                  <div className='mt-6 space-y-3'>
                     <button
                        className='w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                        onClick={() => {}}>
                        <div className='inline-flex items-center justify-center'>
                           <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                              <path
                                 fill='currentColor'
                                 d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z'
                              />
                           </svg>
                           <span>Sign in with Google</span>
                        </div>
                     </button>

                     <button
                        className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500'
                        onClick={async () => {
                           setIsLoading(true);
                           // Simulate API call
                           await new Promise((resolve) => setTimeout(resolve, 1000));
                           const success = await login("demo@example.com", "password123");
                           if (success) {
                              navigate("/dashboard");
                           }
                           setIsLoading(false);
                        }}>
                        <div className='inline-flex items-center justify-center'>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5 mr-2'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                           </svg>
                           <span>Quick Demo Login (No Form Required)</span>
                        </div>
                     </button>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   );
};

export default Login;
