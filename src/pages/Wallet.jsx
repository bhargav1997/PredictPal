import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { mockTransactions } from "../utils/mockData";

const Wallet = () => {
   const { user } = useAuth();
   const [activeTab, setActiveTab] = useState("transactions");
   const [transactions, setTransactions] = useState(mockTransactions);

   // Filter transactions by type
   const filterTransactions = (type) => {
      if (type === "all") {
         setTransactions(mockTransactions);
      } else {
         setTransactions(mockTransactions.filter((t) => t.type === type));
      }
   };

   return (
      <div className='min-h-screen bg-gray-50 pb-12'>
         <div className='bg-gradient-to-r from-primary to-secondary text-white py-12'>
            <div className='container mx-auto px-4'>
               <h1 className='text-3xl font-bold mb-2'>Wallet Dashboard</h1>
               <p className='text-lg opacity-90'>Manage your coins and transactions</p>
            </div>
         </div>

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
                  <div className='mt-4 flex space-x-2'>
                     <Button variant='primary' size='sm'>
                        Add Coins
                     </Button>
                     <Button variant='outline' size='sm'>
                        Convert to Cash
                     </Button>
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
                  <div className='mt-4 flex space-x-2'>
                     <Button variant='secondary' size='sm'>
                        Withdraw
                     </Button>
                     <Button variant='outline' size='sm'>
                        Deposit
                     </Button>
                  </div>
               </Card>
            </div>

            {/* Tabs */}
            <div className='mb-6'>
               <div className='border-b border-gray-200'>
                  <nav className='-mb-px flex space-x-8'>
                     <button
                        onClick={() => setActiveTab("transactions")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                           activeTab === "transactions"
                              ? "border-primary-500 text-primary-500"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}>
                        Transactions
                     </button>
                     <button
                        onClick={() => setActiveTab("battles")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                           activeTab === "battles"
                              ? "border-primary-500 text-primary-500"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}>
                        Battle History
                     </button>
                  </nav>
               </div>
            </div>

            {/* Transaction Filters */}
            {activeTab === "transactions" && (
               <div className='mb-6 flex flex-wrap gap-2'>
                  <Button variant='outline' size='sm' onClick={() => filterTransactions("all")} className='border-gray-300'>
                     All
                  </Button>
                  <Button variant='outline' size='sm' onClick={() => filterTransactions("WIN")} className='border-green-300 text-green-700'>
                     Wins
                  </Button>
                  <Button variant='outline' size='sm' onClick={() => filterTransactions("LOSS")} className='border-red-300 text-red-700'>
                     Losses
                  </Button>
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => filterTransactions("DEPOSIT")}
                     className='border-blue-300 text-blue-700'>
                     Deposits
                  </Button>
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => filterTransactions("REFERRAL")}
                     className='border-purple-300 text-purple-700'>
                     Referrals
                  </Button>
               </div>
            )}

            {/* Transactions List */}
            {activeTab === "transactions" && (
               <Card>
                  <div className='overflow-x-auto'>
                     <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                           <tr>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 Date
                              </th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 Description
                              </th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 Type
                              </th>
                              <th scope='col' className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 Amount
                              </th>
                           </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                           {transactions.map((transaction) => (
                              <tr key={transaction.id}>
                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{transaction.date}</td>
                                 <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                    {transaction.description}
                                 </td>
                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    <span
                                       className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          transaction.type === "WIN"
                                             ? "bg-green-100 text-green-800"
                                             : transaction.type === "LOSS"
                                             ? "bg-red-100 text-red-800"
                                             : transaction.type === "DEPOSIT"
                                             ? "bg-blue-100 text-blue-800"
                                             : "bg-purple-100 text-purple-800"
                                       }`}>
                                       {transaction.type}
                                    </span>
                                 </td>
                                 <td
                                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                                       transaction.amount > 0 ? "text-green-600" : "text-red-600"
                                    }`}>
                                    {transaction.amount > 0 ? "+" : ""}
                                    {transaction.amount} coins
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </Card>
            )}

            {/* Battle History */}
            {activeTab === "battles" && (
               <Card>
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
                           d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                        />
                     </svg>
                     <h3 className='mt-2 text-sm font-medium text-gray-900'>Battle history coming soon</h3>
                     <p className='mt-1 text-sm text-gray-500'>We're working on this feature. Check back soon!</p>
                  </div>
               </Card>
            )}
         </div>
      </div>
   );
};

export default Wallet;
