import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface NavigationProps {
  activeView?: 'map' | 'games';
  onViewChange?: (view: 'map' | 'games') => void;
}

export const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const [showAbout, setShowAbout] = React.useState(false);

  return (
    <>
      <nav className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold">⚽ SJ Soccer</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => onViewChange?.('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'map'
                      ? 'bg-green-800 text-white'
                      : 'hover:bg-green-600'
                  }`}
                >
                  Fields
                </button>
                <button
                  onClick={() => onViewChange?.('games')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'games'
                      ? 'bg-green-800 text-white'
                      : 'hover:bg-green-600'
                  }`}
                >
                  Games
                </button>
                <button
                  onClick={() => setShowAbout(true)}
                  className="hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About SJ Soccer</DialogTitle>
            <DialogDescription>
              Helping local players find pickup soccer games in the San Jose area.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              SJ Soccer connects players with pickup games happening at parks and fields across San Jose. Whether you are looking for a casual kick-around or a competitive match, we make it easy to find games near you.
            </p>
            <p>
              Features include an interactive map of fields, a schedule of upcoming games, and the ability to host your own pickup game.
            </p>
            <p className="text-xs text-gray-500">
              Built for the San Jose soccer community.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
