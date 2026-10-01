import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders without crashing', () => {
    render(<Notifications />);
  });

  test('renders menu item when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} />);
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
    expect(
      screen.queryByText('Here is the list of notifications'),
    ).not.toBeInTheDocument();
  });

  test('renders notifications list when displayDrawer is true', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
    ];
    render(
      <Notifications displayDrawer={true} notifications={notifications} />,
    );
    expect(
      screen.getByText('Here is the list of notifications'),
    ).toBeInTheDocument();
  });

  describe('markAsRead functionality', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('logs correct string to console when notification item is clicked', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ];

      render(
        <Notifications displayDrawer={true} notifications={notifications} />,
      );

      const items = screen.getAllByRole('listitem');
      fireEvent.click(items[0]);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Notification 1 has been marked as read',
      );
    });
  });
});
