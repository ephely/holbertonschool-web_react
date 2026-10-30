import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('does not render logoutSection when user is not logged in (default context)', () => {
    render(<Header />);
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@holberton.school',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: () => {},
    };

    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>,
    );

    expect(
      screen.getByText(/Welcome test@holberton.school/i),
    ).toBeInTheDocument();
  });

  test('calls logOut spy when clicking on logout link', () => {
    const logOutSpy = jest.fn();
    const contextValue = {
      user: {
        email: 'test@holberton.school',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: logOutSpy,
    };

    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>,
    );

    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalled();
  });
});
