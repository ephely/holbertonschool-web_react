import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  describe('when isLoggedIn is false', () => {
    test('renders Login form and does not render CourseList', () => {
      render(<App isLoggedIn={false} />);
      expect(
        screen.getByText(/login to access the full dashboard/i),
      ).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('when isLoggedIn is true', () => {
    test('renders CourseList table and does not render Login form', () => {
      render(<App isLoggedIn={true} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(
        screen.queryByText(/login to access the full dashboard/i),
      ).not.toBeInTheDocument();
    });
  });
});
