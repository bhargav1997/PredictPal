import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Button from '../components/Button';
import Card from '../components/Card';

const BattleResult = () => {
  const { result } = useParams();
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const isWin = result === 'win';

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {isWin && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      
      <Card className="max-w-md w-full text-center py-12 px-6">
        <div className="mb-6">
          {isWin ? (
            <div className="bg-green-100 rounded-full p-6 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ) : (
            <div className="bg-red-100 rounded-full p-6 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-2">
          {isWin ? 'Congratulations!' : 'Better Luck Next Time!'}
        </h1>
        
        <p className="text-xl mb-6">
          {isWin 
            ? 'Your prediction was correct!' 
            : 'Your prediction was incorrect.'}
        </p>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          <p className="text-lg">
            {isWin 
              ? 'You won ' 
              : 'You lost '}
            <span className="font-bold text-xl">
              {isWin ? '+200' : '-200'}
            </span> coins
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/battles')}
          >
            Play Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BattleResult;
