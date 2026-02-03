import { carrierService } from './carrierService';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Routes } from '@/constants/apiRoutes';

describe('carrierService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const mockCarriers = [
        {
            name: 'Test Carrier',
            trucks: '10 Trucks',
            logo_url: 'http://test.com/logo',
            contact_name: 'John Doe',
            contact_email: 'john@test.com',
            contact_phone: '1234567890',
            related_trucks: []
        },
    ];

    it('searches carriers successfully', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockCarriers),
        });

        const result = await carrierService.searchCarriers('New York', 'Los Angeles');

        // Check if the URL contains the expected parameters
        const expectedUrl = `${import.meta.env.VITE_API_URL}${Routes.Carriers}/search?from_city=New+York&to_city=Los+Angeles`;
        expect(fetch).toHaveBeenCalledWith(expectedUrl);
        expect(result).toEqual(mockCarriers);
    });

    it('handles empty results', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([]),
        });

        const result = await carrierService.searchCarriers('Unknown', 'Unknown');
        expect(result).toEqual([]);
    });

    it('returns empty array on failed request', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            statusText: 'Not Found'
        });

        const result = await carrierService.searchCarriers('City A', 'City B');
        expect(result).toEqual([]);
    });

    it('returns empty array on network failure', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

        const result = await carrierService.searchCarriers('City A', 'City B');
        expect(result).toEqual([]);
    });
});
