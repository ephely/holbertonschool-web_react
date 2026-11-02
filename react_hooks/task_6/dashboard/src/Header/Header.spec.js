import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('does not render logoutSection when user is not logged in', () => {
    render(<Header user={{ isLoggedIn: false }} />);
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const user = {
      email: 'test@holberton.school',
      isLoggedIn: true,
    };

    render(<Header user={user} />);
    expect(
      screen.getByText(/Welcome test@holberton.school/i),
    ).toBeInTheDocument();
  });

  test('calls logOut spy when clicking on logout link', () => {
    const logOutSpy = jest.fn();
    const user = {
      email: 'test@holberton.school',
      isLoggedIn: true,
    };

    render(<Header user={user} logOut={logOutSpy} />);

    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalled();
  });
});
