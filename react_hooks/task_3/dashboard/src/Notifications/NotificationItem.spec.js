import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders without crashing', () => {
    render(<NotificationItem />);
  });

  test('renders correct with dummy type and value', () => {
    render(<NotificationItem type="default" value="test" />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveTextContent('test');
    expect(listItem).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders correct with html prop', () => {
    render(<NotificationItem html={{ __html: '<u>test html</u>' }} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toContainHTML('<u>test html</u>');
  });

  test('calls markAsRead with the correct id when clicked', () => {
    const markAsReadSpy = jest.fn();
    render(
      <NotificationItem
        id={1}
        value="test notification"
        markAsRead={markAsReadSpy}
      />,
    );

    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);

    expect(markAsReadSpy).toHaveBeenCalledWith(1);
  });
});
