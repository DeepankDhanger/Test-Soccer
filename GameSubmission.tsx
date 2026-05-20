
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameSubmissionProps {
  onClose: () => void;
}

const soccerFields = [
  "Roosevelt Park",
  "Watson Park", 
  "Kelley Park",
  "Almaden Lake Park",
  "Discovery Meadow",
  "Guadalupe River Park",
  "Other (specify in description)"
];

export const GameSubmission = ({ onClose }: GameSubmissionProps) => {
  const [formData, setFormData] = useState({
    title: '',
    field: '',
    date: '',
    time: '',
    duration: '90',
    skillLevel: '',
    gameType: '',
    maxPlayers: '14',
    organizer: '',
    email: '',
    description: '',
    rsvpRequired: false
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.field || !formData.date || !formData.time || !formData.organizer || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Game Submitted!",
      description: "Your pickup game has been added and will appear in the listings.",
    });

    console.log('Game submission:', formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">Host a Pickup Game</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Game Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Game Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Evening Pickup, Weekend Warriors"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            {/* Location & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field">Field Location *</Label>
                <Select onValueChange={(value) => handleInputChange('field', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {soccerFields.map((field) => (
                      <SelectItem key={field} value={field}>{field}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Start Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="150">2.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Game Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select onValueChange={(value) => handleInputChange('skillLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="mixed">Mixed Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gameType">Game Type</Label>
                <Select onValueChange={(value) => handleInputChange('gameType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Open Pickup</SelectItem>
                    <SelectItem value="7v7">7v7</SelectItem>
                    <SelectItem value="11v11">11v11</SelectItem>
                    <SelectItem value="futsal">Futsal</SelectItem>
                    <SelectItem value="small-sided">Small Sided</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Max Players</Label>
                <Input
                  id="maxPlayers"
                  type="number"
                  min="6"
                  max="22"
                  value={formData.maxPlayers}
                  onChange={(e) => handleInputChange('maxPlayers', e.target.value)}
                />
              </div>
            </div>

            {/* Organizer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizer">Your Name *</Label>
                <Input
                  id="organizer"
                  placeholder="e.g., Carlos M."
                  value={formData.organizer}
                  onChange={(e) => handleInputChange('organizer', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Game Description</Label>
              <Textarea
                id="description"
                placeholder="Additional details about the game, equipment needed, etc."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            {/* RSVP Option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rsvp"
                checked={formData.rsvpRequired}
                onChange={(e) => handleInputChange('rsvpRequired', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <Label htmlFor="rsvp" className="text-sm">
                Require RSVP (players must contact you before joining)
              </Label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Submit Game
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
