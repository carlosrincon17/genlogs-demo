import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { describe, it, expect } from 'vitest';

describe('SearchResults', () => {
    it('renders loading spinner when loading', () => {
        render(<SearchResults results={[]} isLoading={true} />);
        // The spinner is a div with specific classes
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
    });

    it('renders no results message when results are null', () => {
        render(<SearchResults results={null} isLoading={false} />);
        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });

    it('renders results list', () => {
        const mockResults = [
            { id: 1, name: 'Carrier A', trucks: '5 trucks', rating: 4.5, contact_name: 'Contact A', contact_phone: '123', contact_email: 'a@test.com' },
            { id: 2, name: 'Carrier B', trucks: '10 trucks', rating: 4.0, contact_name: 'Contact B', contact_phone: '456', contact_email: 'b@test.com' }
        ];

        // The interface in the component prop seems to match Carrier interface but let's check exact prop names from passed mock
        // Update: I checked SearchResults.tsx, it renders `carrier.name` and `carrier.trucks`.
        // The mock needs to satisfy the Carrier interface.

        render(<SearchResults results={mockResults as any} isLoading={false} />);
        expect(screen.getByText('Carrier A')).toBeInTheDocument();
        expect(screen.getByText('Carrier B')).toBeInTheDocument();
        expect(screen.getByText('5 trucks')).toBeInTheDocument();
    });
});
