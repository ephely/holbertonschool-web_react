import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

describe('Footer component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('does not display Contact us link when user is logged out (default context)', () => {
    render(<Footer />);
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays Contact us link when user is logged in', () => {
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
        <Footer />
      </newContext.Provider>,
    );

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
