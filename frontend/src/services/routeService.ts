import { MAP_CONSTANTS } from '@/constants/mapConstants';

export class RouteService {
  private apiKey: string;
  private baseUrl: string = MAP_CONSTANTS.ROUTES_API_URL;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  }

  async getRoutes(from: string, to: string): Promise<google.maps.LatLng[][]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask': MAP_CONSTANTS.FIELD_MASK,
        },
        body: JSON.stringify({
          origin: { address: from },
          destination: { address: to },
          travelMode: MAP_CONSTANTS.TRAVEL_MODE,
          computeAlternativeRoutes: true,
        }),
      });

      if (!response.ok) {
        console.error('Routes API request failed:', response.statusText);
        return [];
      }

      const data = await response.json();

      if (data.routes) {
        const routes = data.routes as { polyline?: { encodedPolyline?: string } }[];

        return routes.map((route) => {
          if (route.polyline && route.polyline.encodedPolyline) {
            return google.maps.geometry.encoding.decodePath(
              route.polyline.encodedPolyline
            );
          }
          return [];
        });
      }
      return [];
    } catch (error) {
      console.error('Error fetching routes:', error);
      return [];
    }
  }
}

export const routeService = new RouteService();
