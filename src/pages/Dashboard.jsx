import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import BattleCard from "../components/BattleCard";
import { mockBattles, mockTransactions } from "../utils/mockData";

const Dashboard = () => {
   const { user } = useAuth();

   // Get recent battles (last 3)
   const recentBattles = mockBattles.slice(0, 3);

   // Get recent transactions (last 5)
   const recentTransactions = mockTransactions.slice(0, 5);

   return (
      <div className='min-h-screen bg-gray-50 pb-12'>
         {/* Welcome Banner */}
         <div className='bg-gradient-to-r from-primary to-secondary text-white py-12'>
            <div className='container mx-auto px-4'>
               <h1 className='text-3xl font-bold mb-2'>Welcome, {user?.username}!</h1>
               <p className='text-lg opacity-90'>Ready to make some predictions today?</p>
            </div>
         </div>

         {/* Main Content */}
         <div className='container mx-auto px-4 -mt-8'>
            {/* Balance Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
               <Card className='bg-white shadow-lg border-t-4 border-primary'>
                  <div className='flex items-center justify-between'>
                     <div>
                        <h3 className='text-lg font-medium text-gray-500'>Virtual Coins</h3>
                        <p className='text-3xl font-bold text-gray-800 mt-1'>{user?.virtualCoins.toLocaleString()}</p>
                     </div>
                     <div className='bg-primary-500/10 p-3 rounded-full'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-8 w-8 text-primary-500'
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
                     </div>
                  </div>
               </Card>

               <Card className='bg-white shadow-lg border-t-4 border-secondary'>
                  <div className='flex items-center justify-between'>
                     <div>
                        <h3 className='text-lg font-medium text-gray-500'>Real Money</h3>
                        <p className='text-3xl font-bold text-gray-800 mt-1'>${user?.realMoney.toFixed(2)}</p>
                     </div>
                     <div className='bg-secondary/10 p-3 rounded-full'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-8 w-8 text-secondary'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'>
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                           />
                        </svg>
                     </div>
                  </div>
               </Card>
            </div>

            {/* Action Buttons */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
               <Link to='/battles/create'>
                  <Button variant='primary' fullWidth className='h-full py-4'>
                     <div className='flex flex-col items-center'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-6 w-6 mb-1'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'>
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                        </svg>
                        <span>Start Battle</span>
                     </div>
                  </Button>
               </Link>

               <Link to='/battles'>
                  <Button variant='secondary' fullWidth className='h-full py-4'>
                     <div className='flex flex-col items-center'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-6 w-6 mb-1'
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
                        <span>Join Battle</span>
                     </div>
                  </Button>
               </Link>

               <Link to='/wallet'>
                  <Button variant='outline' fullWidth className='h-full py-4'>
                     <div className='flex flex-col items-center'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-6 w-6 mb-1'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'>
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                           />
                        </svg>
                        <span>Transactions</span>
                     </div>
                  </Button>
               </Link>

               <Link to='/leaderboard'>
                  <Button variant='outline' fullWidth className='h-full py-4'>
                     <div className='flex flex-col items-center'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-6 w-6 mb-1'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'>
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                           />
                        </svg>
                        <span>Leaderboard</span>
                     </div>
                  </Button>
               </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
               {/* Recent Battles */}
               <div className='lg:col-span-2'>
                  <div className='flex justify-between items-center mb-4'>
                     <h2 className='text-xl font-bold text-gray-800'>Recent Battles</h2>
                     <Link to='/battles' className='text-primary-500 hover:text-primary-500/80 text-sm font-medium'>
                        View All
                     </Link>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                     {recentBattles.map((battle) => (
                        <BattleCard key={battle.id} battle={battle} />
                     ))}
                  </div>
               </div>

               {/* Recent Transactions */}
               <div>
                  <div className='flex justify-between items-center mb-4'>
                     <h2 className='text-xl font-bold text-gray-800'>Recent Transactions</h2>
                     <Link to='/wallet' className='text-primary-500 hover:text-primary-500/80 text-sm font-medium'>
                        View All
                     </Link>
                  </div>

                  <Card>
                     <div className='divide-y'>
                        {recentTransactions.map((transaction) => (
                           <div key={transaction.id} className='py-3 first:pt-0 last:pb-0'>
                              <div className='flex justify-between items-center'>
                                 <div>
                                    <p className='font-medium text-gray-800'>{transaction.description}</p>
                                    <p className='text-sm text-gray-500'>{transaction.date}</p>
                                 </div>
                                 <div className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                                    {transaction.amount > 0 ? "+" : ""}
                                    {transaction.amount} coins
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
