import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { describe, it, expect } from 'vitest';

describe('SearchResults', () => {
    it('renders loading spinner when loading', () => {
        render(<SearchResults results={[]} isLoading={true} />);
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
    });

    it('renders no results message when results are null', () => {
        render(<SearchResults results={null} isLoading={false} />);
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });

    it('renders results list', () => {
        const mockResults = [
            {
                name: 'Carrier A',
                truck_count: 5,
                logo_url: 'http://test.com/logo.png',
                contact_name: 'Contact A',
                contact_phone: '123',
                contact_email: 'a@test.com',
                related_trucks: []
            },
            {
                name: 'Carrier B',
                truck_count: 10,
                logo_url: 'http://test.com/logo.png',
                contact_name: 'Contact B',
                contact_phone: '456',
                contact_email: 'b@test.com',
                related_trucks: []
            }
        ];

        render(<SearchResults results={mockResults as any} isLoading={false} />);
        expect(screen.getByText('Carrier A')).toBeInTheDocument();
        expect(screen.getByText('Carrier B')).toBeInTheDocument();
    });
});
