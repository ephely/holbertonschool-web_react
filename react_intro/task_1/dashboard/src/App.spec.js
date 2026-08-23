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

    const footerParagraph = screen.getByText(/copyright/i);
    expect(footerParagraph).toBeInTheDocument();
  });

  test('renders logo image with correct alt text', () => {
    render(<App />);
    const logoImage = screen.getByAltText(/holberton logo/i);
    expect(logoImage).toBeInTheDocument();
  });

  test('renders Notifications component', () => {
    render(<App />);
    const notificationText = screen.getByText(
      /here is the list of notifications/i,
    );
    expect(notificationText).toBeInTheDocument();
  });
});
