import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders li with color blue and data-notification-type default', () => {
    render(<NotificationItem type="default" value="test default" />);
    const listItem = screen.getByRole('listitem');

    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
    expect(listItem).toHaveStyle({ color: 'blue' });
  });

  test('renders li with color red and data-notification-type urgent', () => {
    render(<NotificationItem type="urgent" value="test urgent" />);
    const listItem = screen.getByRole('listitem');

    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
    expect(listItem).toHaveStyle({ color: 'red' });
  });
});
