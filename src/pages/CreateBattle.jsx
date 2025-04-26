import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { categories } from "../utils/mockData";

const CreateBattle = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      category: "",
      title: "",
      description: "",
      entryFee: 100,
      prediction: "YES",
   });
   const [errors, setErrors] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);

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

      if (!formData.category) {
         newErrors.category = "Please select a category";
      }

      if (!formData.title) {
         newErrors.title = "Title is required";
      } else if (formData.title.length < 10) {
         newErrors.title = "Title must be at least 10 characters";
      }

      if (!formData.description) {
         newErrors.description = "Description is required";
      }

      if (!formData.entryFee) {
         newErrors.entryFee = "Entry fee is required";
      } else if (formData.entryFee < 50) {
         newErrors.entryFee = "Minimum entry fee is 50 coins";
      } else if (formData.entryFee > user?.virtualCoins) {
         newErrors.entryFee = "You don't have enough coins";
      }

      if (!formData.prediction) {
         newErrors.prediction = "Please select your prediction";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // In a real app, you would send the data to the backend
         // For now, we'll just navigate to the battles page
         navigate("/battles");
      } catch (error) {
         console.error("Error creating battle:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className='min-h-screen bg-gray-50 pb-12'>
         <div className='bg-gradient-to-r from-primary to-secondary text-white py-12'>
            <div className='container mx-auto px-4'>
               <h1 className='text-3xl font-bold mb-2'>Create a New Battle</h1>
               <p className='text-lg opacity-90'>Set up your prediction and challenge others</p>
            </div>
         </div>

         <div className='container mx-auto px-4 -mt-8'>
            <Card className='max-w-2xl mx-auto'>
               <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Category Selection */}
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Select Category <span className='text-danger'>*</span>
                     </label>
                     <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                        {categories.map((category) => (
                           <div
                              key={category.id}
                              onClick={() => handleChange({ target: { name: "category", value: category.name } })}
                              className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                                 formData.category === category.name
                                    ? `border-primary-500 bg-primary-500/5`
                                    : "border-gray-200 hover:border-gray-300"
                              }`}>
                              <div className='flex flex-col items-center text-center'>
                                 <span className='text-3xl mb-2'>{category.icon}</span>
                                 <span className='font-medium'>{category.name}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                     {errors.category && <p className='mt-1 text-sm text-danger'>{errors.category}</p>}
                  </div>

                  {/* Title */}
                  <Input
                     label='Battle Title'
                     name='title'
                     value={formData.title}
                     onChange={handleChange}
                     placeholder='e.g., Will Bitcoin reach $50,000 this week?'
                     error={errors.title}
                     required
                  />

                  {/* Description */}
                  <div>
                     <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                        Description <span className='text-danger'>*</span>
                     </label>
                     <textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder='Provide details about this prediction...'
                        className={`input-field ${errors.description ? "border-danger focus:ring-danger" : ""}`}
                        required
                     />
                     {errors.description && <p className='mt-1 text-sm text-danger'>{errors.description}</p>}
                  </div>

                  {/* Entry Fee */}
                  <div>
                     <label htmlFor='entryFee' className='block text-sm font-medium text-gray-700 mb-1'>
                        Entry Fee (Coins) <span className='text-danger'>*</span>
                     </label>
                     <div className='mt-1 relative rounded-md shadow-sm'>
                        <input
                           type='number'
                           name='entryFee'
                           id='entryFee'
                           value={formData.entryFee}
                           onChange={handleChange}
                           min='50'
                           step='50'
                           className={`input-field pl-12 ${errors.entryFee ? "border-danger focus:ring-danger" : ""}`}
                           required
                        />
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                           <span className='text-gray-500 sm:text-sm'>Coins</span>
                        </div>
                     </div>
                     <p className='mt-1 text-sm text-gray-500'>Your balance: {user?.virtualCoins.toLocaleString()} coins</p>
                     {errors.entryFee && <p className='mt-1 text-sm text-danger'>{errors.entryFee}</p>}
                  </div>

                  {/* Prediction */}
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Your Prediction <span className='text-danger'>*</span>
                     </label>
                     <div className='mt-1 grid grid-cols-2 gap-3'>
                        <div
                           onClick={() => handleChange({ target: { name: "prediction", value: "YES" } })}
                           className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                              formData.prediction === "YES" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                           }`}>
                           <div className='flex flex-col items-center text-center'>
                              <span className='text-3xl mb-2'>👍</span>
                              <span className='font-medium text-green-700'>YES</span>
                           </div>
                        </div>
                        <div
                           onClick={() => handleChange({ target: { name: "prediction", value: "NO" } })}
                           className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                              formData.prediction === "NO" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                           }`}>
                           <div className='flex flex-col items-center text-center'>
                              <span className='text-3xl mb-2'>👎</span>
                              <span className='font-medium text-red-700'>NO</span>
                           </div>
                        </div>
                     </div>
                     {errors.prediction && <p className='mt-1 text-sm text-danger'>{errors.prediction}</p>}
                  </div>

                  <div className='flex justify-end space-x-3 pt-4'>
                     <Button type='button' variant='outline' onClick={() => navigate("/battles")}>
                        Cancel
                     </Button>
                     <Button type='submit' variant='primary' disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Battle"}
                     </Button>
                  </div>
               </form>
            </Card>
         </div>
      </div>
   );
};

export default CreateBattle;
