import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders "News from the School" title and paragraph by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/holberton school news goes here/i),
    ).toBeInTheDocument();
  });

  describe('when isLoggedIn is false', () => {
    test('renders Login form wrapped in BodySectionWithMarginBottom and not CourseList', () => {
      render(<App isLoggedIn={false} />);
      expect(
        screen.getByRole('heading', { name: /log in to continue/i }),
      ).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('when isLoggedIn is true', () => {
    test('renders CourseList table wrapped in BodySectionWithMarginBottom and not Login form', () => {
      render(<App isLoggedIn={true} />);
      expect(
        screen.getByRole('heading', { name: /course list/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
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

      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(logOutMock).toHaveBeenCalledTimes(1);
    });

    test('displays alert "Logging you out" when ctrl + h are pressed', () => {
      render(<App logOut={() => {}} />);

      fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    });
  });
});
