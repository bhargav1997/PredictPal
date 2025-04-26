import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";

const Referral = () => {
   const { user } = useAuth();
   const [copied, setCopied] = useState(false);

   const referralLink = `https://predictpal.com/signup?ref=${user?.referralCode}`;

   const copyToClipboard = () => {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);

      setTimeout(() => {
         setCopied(false);
      }, 2000);
   };

   // Mock referral data
   const referrals = [
      { id: 1, username: "JaneSmith", date: "2023-04-15", status: "active", bonus: 50 },
      { id: 2, username: "MikeJohnson", date: "2023-04-10", status: "active", bonus: 50 },
      { id: 3, username: "SarahWilliams", date: "2023-04-05", status: "active", bonus: 50 },
      { id: 4, username: "DavidBrown", date: "2023-03-28", status: "active", bonus: 50 },
      { id: 5, username: "EmilyDavis", date: "2023-03-20", status: "active", bonus: 50 },
   ];

   return (
      <div className='min-h-screen bg-gray-50 pb-12'>
         <div className='bg-gradient-to-r from-primary to-secondary text-white py-12'>
            <div className='container mx-auto px-4'>
               <h1 className='text-3xl font-bold mb-2'>Refer & Earn</h1>
               <p className='text-lg opacity-90'>Invite friends and earn bonus coins</p>
            </div>
         </div>

         <div className='container mx-auto px-4 -mt-8'>
            <div className='max-w-4xl mx-auto'>
               {/* Referral Info Card */}
               <Card className='mb-8'>
                  <div className='text-center mb-6'>
                     <div className='bg-primary-500/10 p-4 rounded-full inline-block mb-4'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-12 w-12 text-primary-500'
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
                     </div>
                     <h2 className='text-2xl font-bold mb-2'>Invite Friends, Earn Rewards</h2>
                     <p className='text-gray-600 max-w-lg mx-auto'>
                        Share your referral link with friends. When they sign up and make their first prediction, you'll both receive 50
                        bonus coins!
                     </p>
                  </div>

                  <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                     <div className='flex flex-col sm:flex-row items-center'>
                        <div className='flex-1 w-full mb-3 sm:mb-0'>
                           <div className='relative'>
                              <input type='text' value={referralLink} readOnly className='input-field pr-24' />
                              <div className='absolute inset-y-0 right-0 flex items-center'>
                                 <Button
                                    variant={copied ? "secondary" : "primary"}
                                    size='sm'
                                    className='mr-2 rounded-l-none'
                                    onClick={copyToClipboard}>
                                    {copied ? "Copied!" : "Copy"}
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                     <div className='bg-gray-50 p-4 rounded-lg text-center'>
                        <h3 className='text-lg font-semibold mb-1'>Your Referral Code</h3>
                        <p className='text-xl font-bold text-primary-500'>{user?.referralCode}</p>
                     </div>

                     <div className='bg-gray-50 p-4 rounded-lg text-center'>
                        <h3 className='text-lg font-semibold mb-1'>Total Referrals</h3>
                        <p className='text-xl font-bold'>{referrals.length}</p>
                     </div>

                     <div className='bg-gray-50 p-4 rounded-lg text-center'>
                        <h3 className='text-lg font-semibold mb-1'>Total Earned</h3>
                        <p className='text-xl font-bold'>{user?.referralBonus} coins</p>
                     </div>
                  </div>

                  <div className='flex flex-wrap gap-3 justify-center'>
                     <Button
                        variant='outline'
                        className='flex items-center'
                        onClick={() =>
                           window.open(
                              `https://twitter.com/intent/tweet?text=Join me on PredictPal and get 50 bonus coins! Use my referral code: ${user?.referralCode}&url=https://predictpal.com`,
                              "_blank",
                           )
                        }>
                        <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                           <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                        </svg>
                        Share on Twitter
                     </Button>

                     <Button
                        variant='outline'
                        className='flex items-center'
                        onClick={() =>
                           window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=https://predictpal.com&quote=Join me on PredictPal and get 50 bonus coins! Use my referral code: ${user?.referralCode}`,
                              "_blank",
                           )
                        }>
                        <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                           <path
                              fillRule='evenodd'
                              d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                              clipRule='evenodd'
                           />
                        </svg>
                        Share on Facebook
                     </Button>

                     <Button
                        variant='outline'
                        className='flex items-center'
                        onClick={() =>
                           window.open(
                              `https://wa.me/?text=Join me on PredictPal and get 50 bonus coins! Use my referral code: ${user?.referralCode} https://predictpal.com`,
                              "_blank",
                           )
                        }>
                        <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                           <path
                              fillRule='evenodd'
                              d='M20.11 3.89C17.95 1.72 15.04 0.5 12 0.5C5.49 0.5 0.5 5.49 0.5 12C0.5 14.24 1.09 16.42 2.19 18.33L0.5 23.5L5.67 21.81C7.58 22.91 9.76 23.5 12 23.5C18.51 23.5 23.5 18.51 23.5 12C23.5 8.96 22.28 6.05 20.11 3.89ZM12 21.5C10.01 21.5 8.06 20.93 6.35 19.86L6 19.67L2.83 20.64L3.8 17.47L3.61 17.12C2.54 15.41 1.97 13.46 1.97 11.47C1.97 6.32 6.32 1.97 11.47 1.97C14.03 1.97 16.46 3 18.28 4.83C20.1 6.65 21.13 9.08 21.13 11.64C21.5 16.79 16.68 21.5 12 21.5ZM17.44 14.42C17.13 14.27 15.72 13.58 15.44 13.47C15.16 13.36 14.95 13.31 14.74 13.62C14.53 13.93 13.97 14.57 13.79 14.78C13.61 14.99 13.43 15.01 13.12 14.86C12.81 14.71 11.89 14.41 10.83 13.47C10 12.74 9.44 11.84 9.26 11.53C9.08 11.22 9.24 11.05 9.4 10.89C9.54 10.75 9.71 10.52 9.86 10.34C10.01 10.16 10.06 10.03 10.17 9.82C10.28 9.61 10.23 9.43 10.15 9.28C10.07 9.13 9.5 7.72 9.24 7.1C8.98 6.48 8.72 6.57 8.54 6.57C8.36 6.57 8.15 6.54 7.94 6.54C7.73 6.54 7.4 6.62 7.12 6.93C6.84 7.24 6.1 7.93 6.1 9.34C6.1 10.75 7.12 12.11 7.27 12.32C7.42 12.53 9.44 15.61 12.5 16.86C13.24 17.19 13.82 17.38 14.27 17.53C15.03 17.76 15.72 17.73 16.27 17.65C16.88 17.56 18.05 16.95 18.31 16.22C18.57 15.49 18.57 14.87 18.49 14.78C18.41 14.69 18.2 14.63 17.89 14.48L17.44 14.42Z'
                              clipRule='evenodd'
                           />
                        </svg>
                        Share on WhatsApp
                     </Button>
                  </div>
               </Card>

               {/* Referrals List */}
               <Card>
                  <h3 className='text-xl font-semibold mb-4'>Your Referrals</h3>

                  {referrals.length > 0 ? (
                     <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                           <thead className='bg-gray-50'>
                              <tr>
                                 <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    User
                                 </th>
                                 <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Date Joined
                                 </th>
                                 <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Status
                                 </th>
                                 <th
                                    scope='col'
                                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Bonus Earned
                                 </th>
                              </tr>
                           </thead>
                           <tbody className='bg-white divide-y divide-gray-200'>
                              {referrals.map((referral) => (
                                 <tr key={referral.id}>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                       <div className='text-sm font-medium text-gray-900'>{referral.username}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                       <div className='text-sm text-gray-500'>{referral.date}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                       <span className='px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                          {referral.status}
                                       </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right'>
                                       <span className='font-semibold text-green-600'>+{referral.bonus}</span> coins
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <div className='text-center py-8'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-12 w-12 mx-auto text-gray-400'
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
                        <h3 className='mt-2 text-sm font-medium text-gray-900'>No referrals yet</h3>
                        <p className='mt-1 text-sm text-gray-500'>Share your referral link to start earning bonus coins!</p>
                     </div>
                  )}
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Referral;
