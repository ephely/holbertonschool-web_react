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

  test('renders 2 input elements (email and password)', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with the text OK', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /ok/i });

    expect(buttonElement).toBeInTheDocument();
  });
});
