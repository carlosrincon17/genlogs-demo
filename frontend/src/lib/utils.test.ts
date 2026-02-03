import { cn } from './utils';
import { describe, it, expect } from 'vitest';

describe('utils', () => {
    describe('cn', () => {
        it('merges class names correctly', () => {
            expect(cn('class1', 'class2')).toBe('class1 class2');
        });

        it('handles conditional classes', () => {
            expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
        });

        it('merges tailwind classes', () => {
            expect(cn('p-4', 'p-2')).toBe('p-2');
            expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
        });
    });
});
