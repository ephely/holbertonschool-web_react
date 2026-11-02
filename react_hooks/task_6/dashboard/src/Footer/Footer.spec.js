import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('does not display Contact us link when user is logged out', () => {
    render(<Footer user={{ isLoggedIn: false }} />);
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays Contact us link when user is logged in', () => {
    render(<Footer user={{ isLoggedIn: true }} />);
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
