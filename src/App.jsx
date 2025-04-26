import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import PageTransition from "./components/animations/PageTransition";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Battles from "./pages/Battles";
import CreateBattle from "./pages/CreateBattle";
import BattleDetail from "./pages/BattleDetail";
import BattleResult from "./pages/BattleResult";
import Leaderboard from "./pages/Leaderboard";
import Referral from "./pages/Referral";
import NotFound from "./pages/NotFound";

function AppRoutes() {
   const location = useLocation();

   return (
      <AnimatePresence mode='wait'>
         <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route
               path='/'
               element={
                  <PageTransition>
                     <Navbar />
                     <Home />
                  </PageTransition>
               }
            />
            <Route
               path='/login'
               element={
                  <PageTransition>
                     <Login />
                  </PageTransition>
               }
            />
            <Route
               path='/signup'
               element={
                  <PageTransition>
                     <Signup />
                  </PageTransition>
               }
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
               <Route
                  path='/dashboard'
                  element={
                     <PageTransition>
                        <Dashboard />
                     </PageTransition>
                  }
               />
               <Route
                  path='/wallet'
                  element={
                     <PageTransition>
                        <Wallet />
                     </PageTransition>
                  }
               />
               <Route
                  path='/battles'
                  element={
                     <PageTransition>
                        <Battles />
                     </PageTransition>
                  }
               />
               <Route
                  path='/battles/create'
                  element={
                     <PageTransition>
                        <CreateBattle />
                     </PageTransition>
                  }
               />
               <Route
                  path='/battles/:id'
                  element={
                     <PageTransition>
                        <BattleDetail />
                     </PageTransition>
                  }
               />
               <Route
                  path='/battles/result/:result'
                  element={
                     <PageTransition>
                        <BattleResult />
                     </PageTransition>
                  }
               />
               <Route
                  path='/leaderboard'
                  element={
                     <PageTransition>
                        <Leaderboard />
                     </PageTransition>
                  }
               />
               <Route
                  path='/profile'
                  element={
                     <PageTransition>
                        <Referral />
                     </PageTransition>
                  }
               />
            </Route>

            {/* 404 Route */}
            <Route
               path='*'
               element={
                  <PageTransition>
                     <NotFound />
                  </PageTransition>
               }
            />
         </Routes>
      </AnimatePresence>
   );
}

function App() {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Simulate initial loading
      const timer = setTimeout(() => {
         setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
   }, []);

   if (loading) {
      return (
         <div className='min-h-screen bg-gradient-to-br from-dark to-gray-900 flex items-center justify-center'>
            <Loading size='lg' color='neon-blue' fullScreen={true} text='Loading PredictPal...' type='dots' />
         </div>
      );
   }

   return (
      <AuthProvider>
         <div className='min-h-screen bg-gray-50 dark:bg-dark'>
            <AppRoutes />
         </div>
      </AuthProvider>
   );
}

export default App;
