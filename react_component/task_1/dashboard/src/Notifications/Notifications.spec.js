import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

describe('Notifications component', () => {
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  test('always displays "Your notifications" title', () => {
    render(<Notifications displayDrawer={false} />);
    expect(screen.getByText('Your notifications')).toBeInTheDocument();

    render(<Notifications displayDrawer={true} />);
    expect(screen.getAllByText('Your notifications').length).toBeGreaterThan(0);
  });

  describe('when displayDrawer is false', () => {
    test('does not display close button, "Here is the list...", or notification items', () => {
      render(
        <Notifications
          displayDrawer={false}
          notifications={listNotifications}
        />,
      );

      expect(
        screen.queryByRole('button', { name: /close/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/here is the list of notifications/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });

  describe('when displayDrawer is true', () => {
    test('displays close button, "Here is the list...", and notification items', () => {
      render(
        <Notifications
          displayDrawer={true}
          notifications={listNotifications}
        />,
      );

      expect(
        screen.getByRole('button', { name: /close/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/here is the list of notifications/i),
      ).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    test('displays "No new notification for now" when notifications array is empty', () => {
      render(<Notifications displayDrawer={true} notifications={[]} />);

      expect(
        screen.getByRole('button', { name: /close/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('No new notification for now'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/here is the list of notifications/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });

  test('logs "Close button has been clicked" to the console when clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(
      <Notifications displayDrawer={true} notifications={listNotifications} />,
    );

    const buttonElement = screen.getByRole('button', { name: /close/i });
    fireEvent.click(buttonElement);

    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });
});
