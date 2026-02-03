import { render } from '@testing-library/react';
import { MapDisplay } from './MapDisplay';
import { describe, it, expect, vi } from 'vitest';
import { routeService } from '@/services/routeService';

// Mock routeService
vi.mock('@/services/routeService', () => ({
    routeService: {
        getRoutes: vi.fn()
    }
}));

// Mock Google Maps Components
vi.mock('@react-google-maps/api', () => ({
    GoogleMap: ({ children }: any) => <div data-testid="google-map">{children}</div>,
    Polyline: () => <div data-testid="polyline" />
}));

describe('MapDisplay', () => {
    it('renders map container', () => {
        render(<MapDisplay from="A" to="B" />);
        expect(document.querySelector('[data-testid="google-map"]')).toBeInTheDocument();
    });

    it('fetches routes on mount', async () => {
        render(<MapDisplay from="A" to="B" />);

        // Wait for the effect to fire
        await vi.waitFor(() => {
            expect(routeService.getRoutes).toHaveBeenCalledWith('A', 'B');
        });
    });

    it('renders polylines when routes exist', async () => {
        // We really need to verify async state updates here which is tricky with simple rendering
        // In a real scenario we would wait for the promise to resolve
        // mocking getRoutes to return Promise
        vi.mocked(routeService.getRoutes).mockResolvedValue([
            [{ lat: 10, lng: 10 }] as any
        ]);

        const { findByTestId } = render(<MapDisplay from="A" to="B" />);

        const polyline = await findByTestId('polyline');
        expect(polyline).toBeInTheDocument();
    });
});
