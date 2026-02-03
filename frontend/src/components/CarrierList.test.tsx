import { render, screen, fireEvent } from '@testing-library/react';
import { CarrierList } from './CarrierList';
import { describe, it, expect, vi } from 'vitest';
import { Carrier } from '@/interfaces/Carrier';

const mockResults: Carrier[] = [
    {
        name: 'Carrier A',
        truck_count: 10,
        logo_url: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        related_trucks: []
    },
    {
        name: 'Carrier B',
        truck_count: 5,
        logo_url: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        related_trucks: []
    },
];

describe('CarrierList', () => {
    it('renders loading state', () => {
        render(<CarrierList results={[]} isLoading={true} onSelectCarrier={vi.fn()} />);
        expect(screen.queryByText(/No carriers found/i)).not.toBeInTheDocument();
    });

    it('renders list of carriers', () => {
        render(<CarrierList results={mockResults} isLoading={false} onSelectCarrier={vi.fn()} />);
        expect(screen.getByText('Carrier A')).toBeInTheDocument();
        expect(screen.getByText('Carrier B')).toBeInTheDocument();
    });

    it('renders no results message', () => {
        render(<CarrierList results={[]} isLoading={false} onSelectCarrier={vi.fn()} />);
        expect(screen.getByText(/No carriers found/i)).toBeInTheDocument();
    });

    it('calls onSelectCarrier when a carrier is clicked', () => {
        const onSelect = vi.fn();
        render(<CarrierList results={mockResults} isLoading={false} onSelectCarrier={onSelect} />);

        fireEvent.click(screen.getByText('Carrier A'));
        expect(onSelect).toHaveBeenCalledWith(mockResults[0]);
    });
});
