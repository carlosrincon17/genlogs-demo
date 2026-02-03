import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Google Maps
global.google = {
    maps: {
        Map: vi.fn(),
        Marker: vi.fn(),
        Polyline: vi.fn(),
        places: {
            Autocomplete: vi.fn(),
        },
        geometry: {
            encoding: {
                decodePath: vi.fn().mockReturnValue([]),
            },
        },
        LatLng: vi.fn(),
    },
} as any;
