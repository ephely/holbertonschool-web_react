import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders h1 element with text "School dashboard"', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', {
      name: /school dashboard/i,
      level: 1,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders paragraph elements in App-body and App-footer with correct text', () => {
    render(<App />);

    const bodyParagraph = screen.getByText(
      /login to access the full dashboard/i,
    );
    expect(bodyParagraph).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    const footerRegex = new RegExp(
      `copyright ${currentYear} - holberton school`,
      'i',
    );
    const footerParagraph = screen.getByText(footerRegex);
    expect(footerParagraph).toBeInTheDocument();
  });

  test('renders logo image with correct alt text', () => {
    render(<App />);
    const logoImage = screen.getByAltText(/holberton logo/i);
    expect(logoImage).toBeInTheDocument();
  });
});
