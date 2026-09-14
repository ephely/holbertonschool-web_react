import { render, screen, fireEvent } from '@testing-library/react';
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

  describe('Keyboard shortcuts', () => {
    let alertSpy;

    beforeEach(() => {
      alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      alertSpy.mockRestore();
    });

    test('calls logOut prop when ctrl + h are pressed', () => {
      const logOutMock = jest.fn();
      render(<App logOut={logOutMock} />);

      fireEvent.keyDown(window, { key: 'h', ctrlKey: true });

      expect(logOutMock).toHaveBeenCalledTimes(1);
    });

    test('displays alert "Logging you out" when ctrl + h are pressed', () => {
      render(<App logOut={() => {}} />);

      fireEvent.keyDown(window, { key: 'h', ctrlKey: true });

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    });
  });
});
