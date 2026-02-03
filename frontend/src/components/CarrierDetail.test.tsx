import { render, screen, fireEvent } from '@testing-library/react';
import { CarrierDetail } from './CarrierDetail';
import { describe, it, expect, vi } from 'vitest';
import { Carrier } from '@/interfaces/Carrier';

const mockCarrier: Carrier = {
    name: 'Test Carrier',
    truck_count: 10,
    logo_url: 'http://example.com/logo.png',
    contact_name: 'John Doe',
    contact_phone: '123-456',
    contact_email: 'john@example.com',
    related_trucks: [
        { plate: 'AZ-123', dot_number: '123456', status: 'Active' },
    ],
};

describe('CarrierDetail', () => {
    it('renders carrier information', () => {
        const onBack = vi.fn();
        render(<CarrierDetail carrier={mockCarrier} onBack={onBack} />);

        expect(screen.getByText('Test Carrier')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('123-456')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('AZ-123')).toBeInTheDocument();
    });

    it('calls onBack when back button is clicked', () => {
        const onBack = vi.fn();
        render(<CarrierDetail carrier={mockCarrier} onBack={onBack} />);

        const backButton = screen.getByRole('button', { name: /back/i });
        fireEvent.click(backButton);
        expect(onBack).toHaveBeenCalledTimes(1);
    });
});
