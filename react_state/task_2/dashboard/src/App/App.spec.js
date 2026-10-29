import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders News from the School section by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ipsum lorem ipsum dolor sit amet/i),
    ).toBeInTheDocument();
  });
});
