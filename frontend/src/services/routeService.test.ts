import { routeService } from './routeService';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MAP_CONSTANTS } from '@/constants/mapConstants';

describe('routeService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const mockRoutesResponse = {
        routes: [
            {
                polyline: {
                    encodedPolyline: 'encoded_string',
                },
            },
        ],
    };

    const mockDecodedPath = [{ lat: 10, lng: 10 }];

    it('fetches routes successfully', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockRoutesResponse),
        });

        // Mock decodePath
        vi.mocked(google.maps.geometry.encoding.decodePath).mockReturnValue(mockDecodedPath as any);

        const result = await routeService.getRoutes('New York', 'Los Angeles');

        expect(fetch).toHaveBeenCalledWith(MAP_CONSTANTS.ROUTES_API_URL, expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
                'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            })
        }));
        expect(result).toEqual([mockDecodedPath]);
    });

    it('returns empty array on failed request', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            statusText: 'Error'
        });

        const result = await routeService.getRoutes('A', 'B');
        expect(result).toEqual([]);
    });
});
