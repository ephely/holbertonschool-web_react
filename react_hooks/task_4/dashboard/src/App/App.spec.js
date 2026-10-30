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

const logInUser = () => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@holberton.school' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));
};

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

    logInUser();

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

  test('does not fetch courses when user is logged out', () => {
    act(() => {
      render(<App />);
    });

    expect(axios.get).not.toHaveBeenCalledWith(
      'http://localhost:5173/courses.json',
    );
  });

  test('Notifications state remains unchanged through login / logout', async () => {
    act(() => {
      render(<App />);
    });

    act(() => {
      axios.mockResponse({
        data: [{ id: 1, type: 'default', value: 'New course available' }],
      });
    });

    await waitFor(() =>
      expect(screen.getByText('New course available')).toBeInTheDocument(),
    );

    logInUser();

    act(() => {
      axios.mockResponse({ data: [] });
    });

    expect(screen.getByText('New course available')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/logout/i));

    expect(screen.getByText('New course available')).toBeInTheDocument();

    const notificationCalls = axios.get.mock.calls.filter(
      ([url]) => url === 'http://localhost:5173/notifications.json',
    );
    expect(notificationCalls).toHaveLength(1);
  });
});
