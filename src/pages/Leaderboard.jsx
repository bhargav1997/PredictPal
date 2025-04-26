import React from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import { mockLeaderboard } from "../utils/mockData";

const Leaderboard = () => {
   const { user } = useAuth();

   // Find current user's rank
   const currentUserRank = mockLeaderboard.find((item) => item.id === user?.id);

   return (
      <div className='min-h-screen bg-gray-50 pb-12'>
         <div className='bg-gradient-to-r from-primary to-secondary text-white py-12'>
            <div className='container mx-auto px-4'>
               <h1 className='text-3xl font-bold mb-2'>Leaderboard</h1>
               <p className='text-lg opacity-90'>Top predictors with the most winnings</p>
            </div>
         </div>

         <div className='container mx-auto px-4 -mt-8'>
            {/* Top 3 Winners */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
               {mockLeaderboard.slice(0, 3).map((leader, index) => (
                  <Card
                     key={leader.id}
                     className={`text-center ${
                        index === 0
                           ? "border-t-4 border-yellow-400 shadow-lg"
                           : index === 1
                           ? "border-t-4 border-gray-400"
                           : "border-t-4 border-amber-600"
                     }`}>
                     <div className='mb-4'>
                        <div
                           className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold ${
                              index === 0
                                 ? "bg-yellow-100 text-yellow-600"
                                 : index === 1
                                 ? "bg-gray-100 text-gray-600"
                                 : "bg-amber-100 text-amber-600"
                           }`}>
                           {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </div>
                     </div>
                     <h3 className='text-xl font-bold'>{leader.username}</h3>
                     <p className='text-gray-500 mb-2'>Rank #{leader.rank}</p>
                     <p className='text-lg font-semibold'>{leader.totalWinnings.toLocaleString()} coins</p>
                  </Card>
               ))}
            </div>

            {/* Current User Rank */}
            {currentUserRank && (
               <div className='mb-8'>
                  <h2 className='text-xl font-bold mb-4'>Your Ranking</h2>
                  <Card className='bg-primary-500/5 border border-primary-500/20'>
                     <div className='flex items-center'>
                        <div className='w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-lg font-bold text-primary-500 mr-4'>
                           {currentUserRank.rank}
                        </div>
                        <div className='flex-1'>
                           <h3 className='text-lg font-bold'>{currentUserRank.username}</h3>
                           <p className='text-gray-500'>You</p>
                        </div>
                        <div className='text-right'>
                           <p className='text-lg font-semibold'>{currentUserRank.totalWinnings.toLocaleString()} coins</p>
                        </div>
                     </div>
                  </Card>
               </div>
            )}

            {/* Full Leaderboard */}
            <div>
               <h2 className='text-xl font-bold mb-4'>Full Leaderboard</h2>
               <Card>
                  <div className='overflow-x-auto'>
                     <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                           <tr>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 Rank
                              </th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 User
                              </th>
                              <th scope='col' className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                 Total Winnings
                              </th>
                           </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                           {mockLeaderboard.map((leader) => (
                              <tr key={leader.id} className={leader.id === user?.id ? "bg-primary-500/5" : ""}>
                                 <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                       <span
                                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                             leader.rank === 1
                                                ? "bg-yellow-100 text-yellow-600"
                                                : leader.rank === 2
                                                ? "bg-gray-100 text-gray-600"
                                                : leader.rank === 3
                                                ? "bg-amber-100 text-amber-600"
                                                : "bg-gray-50 text-gray-500"
                                          }`}>
                                          {leader.rank === 1 ? "🥇" : leader.rank === 2 ? "🥈" : leader.rank === 3 ? "🥉" : leader.rank}
                                       </span>
                                    </div>
                                 </td>
                                 <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                       <div className='text-sm font-medium text-gray-900'>
                                          {leader.username}
                                          {leader.id === user?.id && <span className='ml-2 text-xs text-primary-500'>(You)</span>}
                                       </div>
                                    </div>
                                 </td>
                                 <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right'>
                                    <span className='font-semibold'>{leader.totalWinnings.toLocaleString()}</span> coins
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Leaderboard;
