
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Info } from 'lucide-react';

// Mock data for soccer fields in San Jose
const soccerFields = [
  {
    id: 1,
    name: "Roosevelt Park",
    address: "901 E Santa Clara St, San Jose, CA 95116",
    coordinates: { lat: 37.3541, lng: -121.8463 },
    surface: "Grass",
    lighting: true,
    free: true,
    description: "Large grass field with good lighting, popular for evening games"
  },
  {
    id: 2,
    name: "Watson Park",
    address: "520 Jackson St, San Jose, CA 95112",
    coordinates: { lat: 37.3394, lng: -121.8877 },
    surface: "Turf",
    lighting: true,
    free: false,
    description: "Premium turf field, requires permit for organized games"
  },
  {
    id: 3,
    name: "Kelley Park",
    address: "1300 Senter Rd, San Jose, CA 95112",
    coordinates: { lat: 37.3175, lng: -121.8613 },
    surface: "Grass",
    lighting: false,
    free: true,
    description: "Multiple grass fields, best for weekend morning games"
  },
  {
    id: 4,
    name: "Almaden Lake Park",
    address: "6445 Coleman Rd, San Jose, CA 95120",
    coordinates: { lat: 37.2594, lng: -121.8344 },
    surface: "Grass",
    lighting: false,
    free: true,
    description: "Scenic location with mountain views, great for casual pickup games"
  }
];

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedField, setSelectedField] = useState<typeof soccerFields[0] | null>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstance = useRef<any>(null);

  const loadGoogleMaps = () => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      setIsLoaded(true);
    };
    
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (googleMapsApiKey && !isLoaded) {
      loadGoogleMaps();
    }
  }, [googleMapsApiKey, isLoaded]);

  useEffect(() => {
    if (isLoaded && mapRef.current && window.google) {
      // Initialize Google Map
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.3382, lng: -121.8863 }, // San Jose center
        zoom: 11,
        mapTypeId: 'roadmap',
      });

      // Add markers for each field
      soccerFields.forEach(field => {
        const marker = new window.google.maps.Marker({
          position: field.coordinates,
          map: mapInstance.current,
          title: field.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" font-size="16" fill="white">⚽</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
          }
        });

        marker.addListener('click', () => {
          setSelectedField(field);
        });
      });
    }
  }, [isLoaded]);

  return (
    <div className="relative h-[600px] flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        {!googleMapsApiKey || !isLoaded ? (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
              <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Google Maps API Key Required
              </h3>
              <p className="text-gray-600 mb-4">
                Please enter your Google Maps API key to view the interactive map
              </p>
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Enter Google Maps API key..."
                  value={googleMapsApiKey}
                  onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Get your API key at{' '}
                  <a 
                    href="https://console.cloud.google.com/apis/credentials" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Google Cloud Console
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="h-full w-full" />
        )}
      </div>

      {/* Field Details Sidebar */}
      <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Soccer Fields</h3>
          <p className="text-sm text-gray-600">Click on a field marker to see details</p>
        </div>

        {selectedField ? (
          <div className="p-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-2">{selectedField.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedField.address}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedField.surface === 'Turf' ? 'default' : 'secondary'}>
                      {selectedField.surface}
                    </Badge>
                    <Badge variant={selectedField.lighting ? 'default' : 'secondary'}>
                      {selectedField.lighting ? 'Lighted' : 'No Lights'}
                    </Badge>
                    <Badge variant={selectedField.free ? 'default' : 'destructive'}>
                      {selectedField.free ? 'Free' : 'Permit Required'}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{selectedField.description}</p>

                {/* Recent Games */}
                <div className="border-t pt-3">
                  <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                    <Clock size={14} />
                    Recent Games
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Today 6:00 PM</span>
                      <span className="text-green-600">8 players</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yesterday 7:00 PM</span>
                      <span className="text-gray-500">12 players</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-4">
            <div className="text-center text-gray-500">
              <MapPin className="mx-auto mb-2" size={32} />
              <p className="text-sm">Select a field to view details</p>
            </div>
            
            {/* Fields List */}
            <div className="mt-6 space-y-3">
              {soccerFields.map((field) => (
                <Card 
                  key={field.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedField(field)}
                >
                  <CardContent className="p-3">
                    <h5 className="font-medium text-sm">{field.name}</h5>
                    <p className="text-xs text-gray-600 mt-1">{field.surface} • {field.lighting ? 'Lighted' : 'No Lights'}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
