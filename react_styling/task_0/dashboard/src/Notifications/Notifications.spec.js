import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  test('renders without crashing', () => {
    render(<Notifications />);
  });

  test('renders correct number of NotificationItem components', () => {
    render(
      <Notifications displayDrawer={true} notifications={listNotifications} />,
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  describe('Performance optimization (shouldComponentUpdate)', () => {
    let renderSpy;

    beforeEach(() => {
      renderSpy = jest.spyOn(Notifications.prototype, 'render');
    });

    afterEach(() => {
      renderSpy.mockRestore();
    });

    test('does not re-render if the length of notifications prop remains the same', () => {
      const initialNotifications = [
        { id: 1, type: 'default', value: 'New course available' },
      ];
      const sameLengthNotifications = [
        { id: 1, type: 'default', value: 'New course available' },
      ];

      const { rerender } = render(
        <Notifications
          displayDrawer={true}
          notifications={initialNotifications}
        />,
      );

      expect(renderSpy).toHaveBeenCalledTimes(1);

      rerender(
        <Notifications
          displayDrawer={true}
          notifications={sameLengthNotifications}
        />,
      );

      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    test('re-renders whenever the length of notifications prop changes', () => {
      const initialNotifications = [
        { id: 1, type: 'default', value: 'New course available' },
      ];
      const updatedNotifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ];

      const { rerender } = render(
        <Notifications
          displayDrawer={true}
          notifications={initialNotifications}
        />,
      );

      expect(renderSpy).toHaveBeenCalledTimes(1);

      rerender(
        <Notifications
          displayDrawer={true}
          notifications={updatedNotifications}
        />,
      );

      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
