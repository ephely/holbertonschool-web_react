import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    test('renders without crashing', () => {
        render(<Header />);
    });

    test('renders Holberton logo image', () => {
        render(<Header />);
        const logoImage = screen.getByAltText(/holberton logo/i);
        expect(logoImage).toBeInTheDocument();
    });

    test('renders h1 element with correct text', () => {
        render(<Header />);
        const headingElement = screen.getByRole('heading', {
            name: /school dashboard/i,
            level: 1,
        });
        expect(headingElement).toBeInTheDocument();
    });
});