import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders News from the School section by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ipsum lorem ipsum dolor sit amet/i),
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

      fireEvent.keyDown(window, { key: 'h', ctrlKey: true });

      expect(logOutMock).toHaveBeenCalledTimes(1);
    });

    test('displays alert "Logging you out" when ctrl + h are pressed', () => {
      render(<App logOut={() => {}} />);

      fireEvent.keyDown(window, { key: 'h', ctrlKey: true });

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    });
  });

  describe('Notifications drawer state and handlers', () => {
    test('default state for displayDrawer is false', () => {
      const app = new App({});
      expect(app.state.displayDrawer).toBe(false);

      render(<App />);
      expect(
        screen.queryByRole('button', { name: /close/i }),
      ).not.toBeInTheDocument();
    });

    test('handleDisplayDrawer updates displayDrawer to true', () => {
      const app = new App({});
      app.setState = jest.fn((newState) => {
        app.state = { ...app.state, ...newState };
      });
      app.handleDisplayDrawer();
      expect(app.state.displayDrawer).toBe(true);

      render(<App />);
      const menuItem = screen.getByText(/your notifications/i);
      fireEvent.click(menuItem);
      expect(
        screen.getByRole('button', { name: /close/i }),
      ).toBeInTheDocument();
    });

    test('handleHideDrawer updates displayDrawer to false', () => {
      const app = new App({});
      app.state.displayDrawer = true;
      app.setState = jest.fn((newState) => {
        app.state = { ...app.state, ...newState };
      });
      app.handleHideDrawer();
      expect(app.state.displayDrawer).toBe(false);

      render(<App />);
      const menuItem = screen.getByText(/your notifications/i);
      fireEvent.click(menuItem);
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(
        screen.queryByRole('button', { name: /close/i }),
      ).not.toBeInTheDocument();
    });
  });
});
