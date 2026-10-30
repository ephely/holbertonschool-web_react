import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders News from the School section by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument();
  });

  test('markNotificationAsRead removes a notification from state', () => {
    render(<App />);

    const menuItem = screen.getByText('Your notifications');
    fireEvent.click(menuItem);

    expect(screen.getByText('New course available')).toBeInTheDocument();

    const notifItem = screen.getByText('New course available');
    fireEvent.click(notifItem);

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
  });
});
