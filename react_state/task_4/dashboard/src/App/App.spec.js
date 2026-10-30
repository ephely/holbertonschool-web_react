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

  test('markNotificationAsRead works as expected: logs to console and removes notification from state', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<App />);

    const menuItem = screen.getByText('Your notifications');
    fireEvent.click(menuItem);

    const notificationItem = screen.getByText('New course available');
    expect(notificationItem).toBeInTheDocument();

    fireEvent.click(notificationItem);

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );

    consoleSpy.mockRestore();
  });
});
