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

  test('markNotificationAsRead removes a notification from state and logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);

    const notificationItem = screen.getByText('New course available');
    expect(notificationItem).toBeInTheDocument();

    fireEvent.click(notificationItem);

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );

    consoleSpy.mockRestore();
  });

  test('logIn updates user state correctly and displays CourseList', () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, {
      target: { value: 'test@holberton.school' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(
      screen.getByRole('heading', { name: /course list/i }),
    ).toBeInTheDocument();
  });
});
