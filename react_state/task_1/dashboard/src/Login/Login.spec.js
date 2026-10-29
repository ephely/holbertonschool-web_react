import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('submit button is disabled by default', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button becomes enabled after entering valid email and password (at least 8 chars)', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, {
      target: { value: 'test@holberton.school' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton).toBeEnabled();
  });
});
