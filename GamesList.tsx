
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Filter } from 'lucide-react';

// Mock data for upcoming games
const upcomingGames = [
  {
    id: 1,
    title: "Evening Pickup",
    field: "Roosevelt Park",
    address: "901 E Santa Clara St",
    date: "Today",
    time: "6:00 PM",
    duration: "90 min",
    skillLevel: "intermediate",
    gameType: "7v7",
    organizer: "Carlos M.",
    playersCount: 8,
    maxPlayers: 14,
    rsvpRequired: false,
    description: "Regular evening pickup game. All skill levels welcome!"
  },
  {
    id: 2,
    title: "Weekend Warriors",
    field: "Watson Park",
    address: "520 Jackson St",
    date: "Tomorrow",
    time: "9:00 AM",
    duration: "2 hours",
    skillLevel: "advanced",
    gameType: "11v11",
    organizer: "San Jose FC",
    playersCount: 16,
    maxPlayers: 22,
    rsvpRequired: true,
    description: "Competitive game for experienced players. Contact organizer to join."
  },
  {
    id: 3,
    title: "Casual Kickabout",
    field: "Kelley Park",
    address: "1300 Senter Rd",
    date: "Sat Dec 28",
    time: "10:30 AM",
    duration: "2 hours",
    skillLevel: "beginner",
    gameType: "pickup",
    organizer: "Maria L.",
    playersCount: 6,
    maxPlayers: 16,
    rsvpRequired: false,
    description: "Family-friendly game. Kids and beginners welcome!"
  },
  {
    id: 4,
    title: "Futsal Session",
    field: "Almaden Community Center",
    address: "6445 Coleman Rd",
    date: "Sun Dec 29",
    time: "2:00 PM",
    duration: "90 min",
    skillLevel: "intermediate",
    gameType: "futsal",
    organizer: "Diego R.",
    playersCount: 12,
    maxPlayers: 16,
    rsvpRequired: true,
    description: "Indoor futsal with fast-paced action. Great for improving skills."
  }
];

const skillLevelColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800"
};

export const GamesList = () => {
  const [filter, setFilter] = useState<'all' | 'today' | 'tomorrow' | 'weekend'>('all');

  const filteredGames = upcomingGames.filter(game => {
    if (filter === 'all') return true;
    if (filter === 'today') return game.date === 'Today';
    if (filter === 'tomorrow') return game.date === 'Tomorrow';
    if (filter === 'weekend') return game.date.includes('Sat') || game.date.includes('Sun');
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Games</h2>
          <p className="text-gray-600">Find and join pickup soccer games</p>
        </div>
        
        {/* Filter Options */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['all', 'today', 'tomorrow', 'weekend'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all capitalize ${
                  filter === filterOption 
                    ? 'bg-white shadow-sm text-green-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {filteredGames.map((game) => (
          <Card key={game.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {game.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {game.time}
                    </div>
                  </div>
                </div>
                <Badge className={skillLevelColors[game.skillLevel as keyof typeof skillLevelColors]}>
                  {game.skillLevel}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-gray-500" />
                  <div>
                    <div className="font-medium">{game.field}</div>
                    <div className="text-gray-600">{game.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-gray-500" />
                    <span>{game.playersCount}/{game.maxPlayers} players</span>
                  </div>
                  <Badge variant="outline">{game.gameType}</Badge>
                  <span className="text-gray-600">{game.duration}</span>
                </div>

                <p className="text-sm text-gray-700">{game.description}</p>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-gray-600">Organized by</span>{' '}
                    <span className="font-medium">{game.organizer}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {game.rsvpRequired ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        RSVP Required
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        Join Game
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No games found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filter or check back later for new games.
          </p>
        </div>
      )}
    </div>
  );
};
