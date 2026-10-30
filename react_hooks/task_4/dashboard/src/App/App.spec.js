import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import axios from 'jest-mock-axios';
import App from './App';

afterEach(() => {
  axios.reset();
});

describe('App component with data fetching', () => {
  test('renders News from the School section by default', () => {
    act(() => {
      render(<App />);
    });
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument();
  });

  test('fetches and displays notifications on load', async () => {
    act(() => {
      render(<App />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5173/notifications.json',
    );

    act(() => {
      axios.mockResponse({
        data: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
        ],
      });
    });

    await waitFor(() => {
      expect(screen.getByText('New course available')).toBeInTheDocument();
    });
  });

  test('fetches and displays courses when user logs in', async () => {
    act(() => {
      render(<App />);
    });

    act(() => {
      axios.mockResponse({ data: [] });
    });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, {
      target: { value: 'test@holberton.school' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json',
    );

    act(() => {
      axios.mockResponse({
        data: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
        ],
      });
    });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /course list/i }),
      ).toBeInTheDocument();
      expect(screen.getByText('ES6')).toBeInTheDocument();
    });
  });
});
