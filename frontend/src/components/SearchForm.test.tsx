import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import { describe, it, expect, vi } from 'vitest';

// Mock react-google-autocomplete
vi.mock('react-google-autocomplete', () => {
    return {
        default: (props: any) => (
            <input
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                data-testid="google-autocomplete"
            />
        )
    }
});

describe('SearchForm', () => {
    const defaultProps = {
        fromCity: '',
        setFromCity: vi.fn(),
        toCity: '',
        setToCity: vi.fn(),
        onSearch: vi.fn(),
        isLoading: false
    };

    it('renders inputs and button', () => {
        render(<SearchForm {...defaultProps} />);
        expect(screen.getByPlaceholderText('Enter departure city')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter destination city')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('disables search button when fields are empty', () => {
        render(<SearchForm {...defaultProps} />);
        expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    });

    it('disables search button when loading', () => {
        render(<SearchForm {...defaultProps} fromCity="A" toCity="B" isLoading={true} />);
        expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled();
    });

    it('enables search button when valid', () => {
        render(<SearchForm {...defaultProps} fromCity="A" toCity="B" />);
        expect(screen.getByRole('button', { name: /search/i })).toBeEnabled();
    });

    it('calls onSearch when button clicked', () => {
        render(<SearchForm {...defaultProps} fromCity="A" toCity="B" />);
        fireEvent.click(screen.getByRole('button', { name: /search/i }));
        expect(defaultProps.onSearch).toHaveBeenCalled();
    });
});
