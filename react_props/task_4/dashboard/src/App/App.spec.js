import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders Header component', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', {
      name: /school dashboard/i,
      level: 1,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders Login component', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(<App />);
    const footerText = screen.getByText(/copyright/i);
    expect(footerText).toBeInTheDocument();
  });

  test('renders Notifications component', () => {
    render(<App />);
    const notificationText = screen.getByText(/here is the list of notifications/i);
    expect(notificationText).toBeInTheDocument();
  });
});