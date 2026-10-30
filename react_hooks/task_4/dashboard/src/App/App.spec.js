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

  test('logOut resets user state correctly', () => {
    render(<App />);

    // First log in
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, {
      target: { value: 'test@holberton.school' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Verify logged in
    expect(
      screen.getByRole('heading', { name: /course list/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome test@holberton.school/i),
    ).toBeInTheDocument();

    // Now log out
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    // Verify logged out - isLoggedIn is false, email and password are cleared
    expect(
      screen.queryByRole('heading', { name: /course list/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Welcome test@holberton.school/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /log in to continue/i }),
    ).toBeInTheDocument();
  });

  test('handleDisplayDrawer and handleHideDrawer update displayDrawer state correctly', () => {
    render(<App />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();

    const menuItem = screen.getByText('Your notifications');
    fireEvent.click(menuItem);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
