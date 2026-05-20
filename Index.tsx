
import React, { useState } from 'react';
import { MapView } from '@/components/MapView';
import { GamesList } from '@/components/GamesList';
import { GameSubmission } from '@/components/GameSubmission';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Plus, Map, Calendar } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'map' | 'games'>('map');
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                San Jose Pickup Soccer
              </h1>
              <p className="text-gray-600 mt-1">
                Find and join pickup games in your area
              </p>
            </div>
            
            <Button 
              onClick={() => setShowSubmitForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Plus size={20} />
              Host a Game
            </Button>
          </div>
          
          {/* View Toggle */}
          <div className="flex mt-4 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveView('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeView === 'map' 
                  ? 'bg-white shadow-sm text-green-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map size={18} />
              Map View
            </button>
            <button
              onClick={() => setActiveView('games')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeView === 'games' 
                  ? 'bg-white shadow-sm text-green-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar size={18} />
              Games List
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {activeView === 'map' ? (
            <MapView />
          ) : (
            <GamesList />
          )}
        </div>
      </main>

      {/* Submit Game Modal */}
      {showSubmitForm && (
        <GameSubmission onClose={() => setShowSubmitForm(false)} />
      )}
    </div>
  );
};

export default Index;
