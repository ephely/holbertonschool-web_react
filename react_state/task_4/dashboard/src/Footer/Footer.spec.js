import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
    test('renders without crashing', () => {
        render(<Footer />);
    });

    test('renders Copyright text with current year and Holberton School', () => {
        render(<Footer />);
        const footerParagraph = screen.getByText(/copyright/i);

        expect(footerParagraph).toBeInTheDocument();
        expect(footerParagraph.textContent).toContain('Holberton School');
        expect(footerParagraph.textContent).not.toContain('Holberton School main dashboard');
    });
});