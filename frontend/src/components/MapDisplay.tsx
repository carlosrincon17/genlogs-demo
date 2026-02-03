import { useState, useEffect } from 'react';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import { routeService } from '@/services/routeService';
import { MAP_CONSTANTS } from '@/constants/mapConstants';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface MapDisplayProps {
  from: string;
  to: string;
}

export function MapDisplay({ from, to }: MapDisplayProps) {
  const [routes, setRoutes] = useState<google.maps.LatLng[][]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  useEffect(() => {
    if (!from || !to) {
      setRoutes([]);
      return;
    }

    const fetchRoutes = async () => {
      const fetchedRoutes = await routeService.getRoutes(from, to);
      setRoutes(fetchedRoutes);
      setSelectedRouteIndex(0);
    };

    fetchRoutes();
  }, [from, to]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={MAP_CONSTANTS.DEFAULT_CENTER}
      zoom={4}
      options={{
        mapId: MAP_CONSTANTS.MAP_ID,
      }}
    >
      {routes.map((path, index) => (
        <Polyline
          key={`${index}-${index === selectedRouteIndex}`}
          path={path}
          options={{
            strokeColor:
              index === selectedRouteIndex
                ? MAP_CONSTANTS.ROUTE_COLORS.SELECTED
                : MAP_CONSTANTS.ROUTE_COLORS.UNSELECTED,
            strokeOpacity: 0.8,
            strokeWeight: 5,
            zIndex: index === selectedRouteIndex ? 10 : 1,
            clickable: true,
          }}
          onClick={() => setSelectedRouteIndex(index)}
        />
      ))}
    </GoogleMap>
  );
}
