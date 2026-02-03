import { getPolylineOptions, MAP_CONSTANTS } from './mapConstants';
import { describe, it, expect } from 'vitest';

describe('mapConstants', () => {
    describe('getPolylineOptions', () => {
        it('returns selected options', () => {
            const options = getPolylineOptions(true);
            expect(options.strokeColor).toBe(MAP_CONSTANTS.ROUTE_COLORS.SELECTED);
            expect(options.zIndex).toBe(10);
        });

        it('returns unselected options', () => {
            const options = getPolylineOptions(false);
            expect(options.strokeColor).toBe(MAP_CONSTANTS.ROUTE_COLORS.UNSELECTED);
            expect(options.zIndex).toBe(1);
        });
    });
});
