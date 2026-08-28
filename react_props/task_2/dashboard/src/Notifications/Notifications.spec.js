import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

describe('Notifications component', () => {
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  test('renders the text "Here is the list of notifications"', () => {
    render(<Notifications notifications={listNotifications} />);
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test('renders 3 list items with appropriate text and style', () => {
    render(<Notifications notifications={listNotifications} />);
    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);

    // Vérification du premier item (default -> blue)
    expect(listItems[0]).toHaveAttribute('data-notification-type', 'default');
    expect(listItems[0]).toHaveStyle({ color: 'blue' });

    // Vérification du second item (urgent -> red)
    expect(listItems[1]).toHaveAttribute('data-notification-type', 'urgent');
    expect(listItems[1]).toHaveStyle({ color: 'red' });

    // Vérification du troisième item (urgent -> red et html)
    expect(listItems[2]).toHaveAttribute('data-notification-type', 'urgent');
    expect(listItems[2]).toHaveStyle({ color: 'red' });
  });
});
