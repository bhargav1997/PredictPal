import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import BattleCard from '../components/BattleCard';
import { mockBattles, categories } from '../utils/mockData';

const Battles = () => {
  const [battles, setBattles] = useState(mockBattles);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  // Filter battles by category and status
  const filteredBattles = battles.filter(battle => {
    const categoryMatch = selectedCategory === 'all' || battle.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || battle.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  // Handle joining a battle
  const handleJoinBattle = (battleId) => {
    navigate(`/battles/${battleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Prediction Battles</h1>
          <p className="text-lg opacity-90">Join existing battles or create your own</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Action Card */}
        <Card className="mb-8 p-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Ready to test your prediction skills?</h2>
            <p className="text-gray-600">Create your own battle and challenge others.</p>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/battles/create')}
          >
            Create New Battle
          </Button>
        </Card>

        {/* Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === 'all' ? 'primary' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button 
                    key={category.id}
                    variant={selectedCategory === category.name ? 'primary' : 'outline'} 
                    size="sm" 
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon} {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedStatus === 'all' ? 'primary' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedStatus('all')}
                >
                  All
                </Button>
                <Button 
                  variant={selectedStatus === 'open' ? 'primary' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedStatus('open')}
                  className={selectedStatus !== 'open' ? 'border-green-300 text-green-700' : ''}
                >
                  Open
                </Button>
                <Button 
                  variant={selectedStatus === 'in-progress' ? 'primary' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedStatus('in-progress')}
                  className={selectedStatus !== 'in-progress' ? 'border-blue-300 text-blue-700' : ''}
                >
                  In Progress
                </Button>
                <Button 
                  variant={selectedStatus === 'completed' ? 'primary' : 'outline'} 
                  size="sm" 
                  onClick={() => setSelectedStatus('completed')}
                  className={selectedStatus !== 'completed' ? 'border-gray-300 text-gray-700' : ''}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Battles Grid */}
        {filteredBattles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBattles.map(battle => (
              <BattleCard 
                key={battle.id} 
                battle={battle} 
                showJoinButton={battle.status === 'open'} 
                onJoin={handleJoinBattle}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No battles found</h3>
            <p className="mt-1 text-gray-500">
              Try changing your filters or create a new battle.
            </p>
            <div className="mt-6">
              <Button 
                variant="primary" 
                onClick={() => navigate('/battles/create')}
              >
                Create New Battle
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Battles;
