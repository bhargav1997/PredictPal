import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { mockBattles } from "../utils/mockData";

const BattleDetail = () => {
   const { id } = useParams();
   const { user } = useAuth();
   const navigate = useNavigate();
   const [battle, setBattle] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedPrediction, setSelectedPrediction] = useState(null);
   const [isJoining, setIsJoining] = useState(false);
   const [timeLeft, setTimeLeft] = useState("");

   useEffect(() => {
      // Simulate API call to fetch battle details
      const fetchBattle = async () => {
         setIsLoading(true);
         try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            const foundBattle = mockBattles.find((b) => b.id === parseInt(id));

            if (foundBattle) {
               setBattle(foundBattle);
               updateTimeLeft(foundBattle.endTime);
            } else {
               navigate("/battles");
            }
         } catch (error) {
            console.error("Error fetching battle:", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchBattle();
   }, [id, navigate]);

   useEffect(() => {
      if (!battle) return;

      const timer = setInterval(() => {
         updateTimeLeft(battle.endTime);
      }, 1000);

      return () => clearInterval(timer);
   }, [battle]);

   const updateTimeLeft = (endTime) => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;

      if (diff <= 0) {
         setTimeLeft("Ended");
         return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
   };

   const handleJoinBattle = async () => {
      if (!selectedPrediction) return;

      setIsJoining(true);

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // In a real app, you would send the data to the backend
         // For now, we'll just navigate to the result page
         navigate("/battles/result/win");
      } catch (error) {
         console.error("Error joining battle:", error);
      } finally {
         setIsJoining(false);
      }
   };

   if (isLoading) {
      return (
         <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <Loading size='lg' />
         </div>
      );
   }

   const isCreator = battle?.creator?.id === user?.id;
   const isOpponent = battle?.opponent?.id === user?.id;
   const canJoin = battle?.status === "open" && !isCreator && !isOpponent;

   return (
      <div className='min-h-screen bg-gray-50 pb-12'>
         <div className='bg-gradient-to-r from-primary to-secondary text-white py-12'>
            <div className='container mx-auto px-4'>
               <h1 className='text-3xl font-bold mb-2'>Battle Details</h1>
               <p className='text-lg opacity-90'>{battle?.title}</p>
            </div>
         </div>

         <div className='container mx-auto px-4 -mt-8'>
            <div className='max-w-4xl mx-auto'>
               {/* Battle Info Card */}
               <Card className='mb-8'>
                  <div className='flex justify-between items-start mb-4'>
                     <span className='px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800'>{battle?.category}</span>
                     <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                           battle?.status === "open"
                              ? "bg-green-100 text-green-800"
                              : battle?.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                        {battle?.status === "open" ? "Open" : battle?.status === "in-progress" ? "In Progress" : "Completed"}
                     </span>
                  </div>

                  <h2 className='text-2xl font-bold text-gray-800 mb-2'>{battle?.title}</h2>

                  <p className='text-gray-600 mb-6'>{battle?.description || "Predict the outcome of this event and win coins!"}</p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                     <div>
                        <h3 className='text-sm font-medium text-gray-500 mb-1'>Entry Fee</h3>
                        <p className='text-xl font-semibold'>{battle?.entryFee} coins</p>
                     </div>

                     <div>
                        <h3 className='text-sm font-medium text-gray-500 mb-1'>Time Remaining</h3>
                        <p className='text-xl font-semibold'>{timeLeft}</p>
                     </div>
                  </div>

                  <div className='border-t border-gray-200 pt-6'>
                     <h3 className='text-lg font-semibold mb-4'>Participants</h3>

                     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Creator */}
                        <div className='bg-gray-50 rounded-lg p-4'>
                           <div className='flex items-center justify-between mb-2'>
                              <div className='flex items-center'>
                                 <div className='bg-primary-500/10 p-2 rounded-full mr-3'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       className='h-6 w-6 text-primary-500'
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
                                 </div>
                                 <div>
                                    <p className='font-medium'>{battle?.creator?.username}</p>
                                    <p className='text-xs text-gray-500'>Creator</p>
                                 </div>
                              </div>
                              <div
                                 className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    battle?.creator?.prediction === "YES" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                 }`}>
                                 {battle?.creator?.prediction}
                              </div>
                           </div>
                        </div>

                        {/* Opponent */}
                        {battle?.opponent ? (
                           <div className='bg-gray-50 rounded-lg p-4'>
                              <div className='flex items-center justify-between mb-2'>
                                 <div className='flex items-center'>
                                    <div className='bg-secondary/10 p-2 rounded-full mr-3'>
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='h-6 w-6 text-secondary'
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
                                    </div>
                                    <div>
                                       <p className='font-medium'>{battle?.opponent?.username}</p>
                                       <p className='text-xs text-gray-500'>Opponent</p>
                                    </div>
                                 </div>
                                 <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                       battle?.opponent?.prediction === "YES" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}>
                                    {battle?.opponent?.prediction}
                                 </div>
                              </div>
                           </div>
                        ) : (
                           <div className='bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 flex items-center justify-center'>
                              <p className='text-gray-500 text-center'>Waiting for opponent...</p>
                           </div>
                        )}
                     </div>
                  </div>
               </Card>

               {/* Join Battle Section */}
               {canJoin && (
                  <Card>
                     <h3 className='text-xl font-semibold mb-4'>Join this Battle</h3>

                     <p className='text-gray-600 mb-6'>Select your prediction and join this battle for {battle?.entryFee} coins.</p>

                     <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Your Prediction</label>
                        <div className='grid grid-cols-2 gap-4'>
                           <div
                              onClick={() => setSelectedPrediction("YES")}
                              className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                                 selectedPrediction === "YES" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                              }`}>
                              <div className='flex flex-col items-center text-center'>
                                 <span className='text-3xl mb-2'>👍</span>
                                 <span className='font-medium text-green-700'>YES</span>
                              </div>
                           </div>
                           <div
                              onClick={() => setSelectedPrediction("NO")}
                              className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                                 selectedPrediction === "NO" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                              }`}>
                              <div className='flex flex-col items-center text-center'>
                                 <span className='text-3xl mb-2'>👎</span>
                                 <span className='font-medium text-red-700'>NO</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className='flex justify-between items-center'>
                        <p className='text-gray-600'>
                           Entry Fee: <span className='font-semibold'>{battle?.entryFee} coins</span>
                        </p>
                        <Button variant='primary' disabled={!selectedPrediction || isJoining} onClick={handleJoinBattle}>
                           {isJoining ? "Joining..." : "Join Battle"}
                        </Button>
                     </div>
                  </Card>
               )}

               {/* Already Joined Message */}
               {(isCreator || isOpponent) && (
                  <Card>
                     <div className='text-center py-6'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           className='h-12 w-12 mx-auto text-primary-500'
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
                        <h3 className='mt-2 text-lg font-medium text-gray-900'>
                           {isCreator ? "You created this battle" : "You joined this battle"}
                        </h3>
                        <p className='mt-1 text-gray-500'>
                           Your prediction:{" "}
                           <span className='font-medium'>{isCreator ? battle?.creator?.prediction : battle?.opponent?.prediction}</span>
                        </p>
                        <p className='text-gray-500'>Wait for the result to be announced.</p>
                     </div>
                  </Card>
               )}

               {/* Battle Closed Message */}
               {battle?.status === "completed" && (
                  <Card>
                     <div className='text-center py-6'>
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
                              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                           />
                        </svg>
                        <h3 className='mt-2 text-lg font-medium text-gray-900'>This battle has ended</h3>
                        <p className='mt-1 text-gray-500'>
                           Result: <span className='font-medium'>{battle?.result}</span>
                        </p>
                        <p className='text-gray-500'>
                           Winner: <span className='font-medium'>{battle?.winner?.username}</span>
                        </p>
                        <div className='mt-4'>
                           <Button variant='primary' onClick={() => navigate("/battles")}>
                              Browse More Battles
                           </Button>
                        </div>
                     </div>
                  </Card>
               )}
            </div>
         </div>
      </div>
   );
};

export default BattleDetail;
