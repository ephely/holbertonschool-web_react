import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('isLoggedIn is false by default, checking Login is rendered', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /log in to continue/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /course list/i }),
    ).not.toBeInTheDocument();
  });

  test('when user is logged in, CourseList is rendered and Login is not', () => {
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
    expect(
      screen.queryByRole('heading', { name: /log in to continue/i }),
    ).not.toBeInTheDocument();
  });
});
