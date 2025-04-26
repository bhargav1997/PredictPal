import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Card from "../components/Card";
import Loading from "../components/Loading";

const Signup = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [errors, setErrors] = useState({});
   const { signup, isLoading, error, setIsLoading } = useAuth();
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

      if (!formData.confirmPassword) {
         newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const success = await signup(formData.email, formData.password);
      if (success) {
         navigate("/dashboard");
      }
   };

   return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
         <div className='max-w-md w-full'>
            <div className='text-center mb-8'>
               <h1 className='text-3xl font-bold text-gray-900'>Create your account</h1>
               <p className='mt-2 text-gray-600'>Join PredictPal and start winning</p>
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
                     placeholder='Create a password'
                     error={errors.password}
                     required
                  />

                  <Input
                     label='Confirm Password'
                     type='password'
                     name='confirmPassword'
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder='Confirm your password'
                     error={errors.confirmPassword}
                     required
                  />

                  <div className='flex items-center'>
                     <input
                        id='terms'
                        name='terms'
                        type='checkbox'
                        className='h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded'
                        required
                     />
                     <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
                        I agree to the{" "}
                        <a href='#' className='text-primary-500 hover:text-primary-500/80'>
                           Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href='#' className='text-primary-500 hover:text-primary-500/80'>
                           Privacy Policy
                        </a>
                     </label>
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
                              d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                           />
                        </svg>
                        <span>Create Account</span>
                     </div>
                  </button>

                  <div className='mt-4 text-center'>
                     <p className='text-sm text-gray-600'>
                        Already have an account?{" "}
                        <Link to='/login' className='text-primary-500 hover:text-primary-500/80 font-medium'>
                           Sign in
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
                        <span className='px-2 bg-white text-gray-500'>Or sign up with</span>
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
                           <span>Sign up with Google</span>
                        </div>
                     </button>

                     <button
                        className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500'
                        onClick={async () => {
                           setIsLoading(true);
                           // Simulate API call
                           await new Promise((resolve) => setTimeout(resolve, 1000));
                           const success = await signup("demo@example.com", "password123");
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
                           <span>Quick Demo Signup (No Form Required)</span>
                        </div>
                     </button>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   );
};

export default Signup;
