import { render, screen } from '@testing-library/react';
import { TruckList } from './TruckList';
import { describe, it, expect } from 'vitest';
import { Truck } from '@/interfaces/Carrier';

const mockTrucks: Truck[] = [
    { plate: 'AZ-123', dot_number: '123456', status: 'Active' },
    { plate: 'AZ-456', dot_number: '123457', status: 'Maintenance' },
];

describe('TruckList', () => {
    it('renders empty message when no trucks provided', () => {
        render(<TruckList trucks={[]} />);
        expect(screen.getByText(/no trucks/i)).toBeInTheDocument();
    });

    it('renders list of trucks', () => {
        render(<TruckList trucks={mockTrucks} />);
        expect(screen.getByText('AZ-123')).toBeInTheDocument();
        expect(screen.getByText('AZ-456')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Maintenance')).toBeInTheDocument();
    });
});
